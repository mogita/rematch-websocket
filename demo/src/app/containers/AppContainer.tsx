import { connect } from 'react-redux';

import App from '../components/App';

/**
 * Map dispatch.
 */
const mapDispatch = {
  clear: () => ({ type: 'INTERNAL/CLEAR_MESSAGE_LOG' }),
};

export default connect(null, mapDispatch)(App);
