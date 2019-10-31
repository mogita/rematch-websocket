import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import websocket from '@giantmachines/redux-websocket';

import { instrument } from './components/DevTools';
import { WEBSOCKET_PREFIX } from './constants';
import AppContainer from './containers/AppContainer';
import reducer from './store/reducer';

import './styles/style.scss';

const { NODE_ENV } = process.env;

const websocketMiddleware = websocket({
  prefix: WEBSOCKET_PREFIX,
  onOpen: (socket: WebSocket) => {
    // @ts-ignore
    window.__socket = socket; // eslint-disable-line no-underscore-dangle
  },
});

/**
 * Create a custom middleware to make the simulate disconnect feature function
 * as a more interesting demo. Force the middleware to attempt to reconnect
 * an arbitrary number of times.
 */
const disconnectSimulatorMiddleware = () => {
  const OldWebSocket = (window as any).WebSocket;

  return (next: any) => (action: any) => {
    const { type, payload } = action;

    // If the connection breaks, block reconnection by overwriting the WebSocket
    // class with a fake class.
    if (type === `${WEBSOCKET_PREFIX}/BROKEN`) {
      (window as any).WebSocket = class FakeWebSocket {
        close = () => { }

        addEventListener = () => { }
      };
    }

    // Monitor how many reconnnection attempts were made, and if we had
    // enough, allow a reconnect to happen by restoring the original WebSocket.
    if (type === `${WEBSOCKET_PREFIX}/RECONNECT_ATTEMPT`) {
      const { count } = payload;

      if (count > 2) {
        (window as any).WebSocket = OldWebSocket;
      }
    }

    next(action);
  };
};

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      disconnectSimulatorMiddleware,
      websocketMiddleware,
    ),
    instrument(),
  ),
);

// Check for a localStorage value to see if we've seen this user before.
const user = localStorage.getItem('user');

if (!user) {
  localStorage.setItem('user', '👋');

  // eslint-disable-next-line no-underscore-dangle
  if (NODE_ENV === 'production' && window._StatHat) {
    // eslint-disable-next-line no-underscore-dangle
    window._StatHat.push(['_trackCount', '8ITYG3NogZcXeGCJlriMyCBXN3dl', 1.0]);
  }
}

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'),
);
