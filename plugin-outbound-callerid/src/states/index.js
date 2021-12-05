import { combineReducers } from 'redux';

import { reduce as NumberSelectReducer } from './NumberSelectState';

// Register your redux store under a unique namespace
export const namespace = 'outbound-callerid';

// Combine the reducers
export default combineReducers({
  NumberSelect: NumberSelectReducer
});
