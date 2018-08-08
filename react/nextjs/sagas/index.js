import { spawn, all } from 'redux-saga/effects';

import { CommonSaga } from './common.saga';
import { AuthSaga } from './auth.saga';
import { UserSaga } from './user.saga';

const sagas = [
  CommonSaga,
  AuthSaga,
  UserSaga,
];

const rootSaga = function* () {
  yield all(sagas.map(item => spawn(item)));
};

export default rootSaga;
