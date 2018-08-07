import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { CommonReducer } from './common.reducer';
import { AuthReducer } from './auth.reducer';
import { UserReducer } from './user.reducer';

const rootReducer = combineReducers({
  form,
  common: CommonReducer,
  auth: AuthReducer,
  user: UserReducer,
});

export default rootReducer;
