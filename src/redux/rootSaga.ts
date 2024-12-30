import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from '../features/auth/authSaga';
import { watchUserSaga } from '../features/user/userSaga';
import { watchUserCardsSaga } from '../features/userCards/userCardsSaga';
import { watchCardsSaga } from '../features/cards/cardsSaga';
import { watchSetsSaga } from '../features/sets/setsSaga';

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(watchUserSaga),
    fork(watchUserCardsSaga),
    fork(watchCardsSaga),
    fork(watchSetsSaga),
  ]);
}
