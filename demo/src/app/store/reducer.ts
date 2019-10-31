import {
  REDUX_WEBSOCKET_BROKEN,
  REDUX_WEBSOCKET_CLOSED,
  REDUX_WEBSOCKET_CONNECT,
  REDUX_WEBSOCKET_MESSAGE,
  REDUX_WEBSOCKET_OPEN,
  REDUX_WEBSOCKET_SEND,
} from './actionTypes';

import defaultState, { State } from './defaultState';

export const getConnected = (state: State) => state.connected;

const reducer = (state = defaultState, action): State => {
  switch (action.type) {
    case 'INTERNAL/CLEAR_MESSAGE_LOG':
      return {
        ...state,
        messages: [],
      };

    case REDUX_WEBSOCKET_CONNECT:
      return {
        ...state,
        url: action.payload.url,
      };

    case REDUX_WEBSOCKET_OPEN:
      return {
        ...state,
        connected: true,
      };

    case REDUX_WEBSOCKET_BROKEN:
    case REDUX_WEBSOCKET_CLOSED:
      return {
        ...state,
        connected: false,
      };

    case REDUX_WEBSOCKET_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            data: JSON.parse(action.payload.message),
            origin: action.payload.origin,
            timestamp: action.meta.timestamp,
            type: 'INCOMING',
          },
        ],
      };

    case REDUX_WEBSOCKET_SEND:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            data: action.payload,
            origin: window.location.origin,
            timestamp: new Date(),
            type: 'OUTGOING',
          },
        ],
      };

    default:
      return state;
  }
};

export default reducer;
