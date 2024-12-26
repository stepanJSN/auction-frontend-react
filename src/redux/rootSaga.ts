import { all, fork } from "redux-saga/effects";
import { watchAuthSaga } from "../features/auth/authSaga";
import { watchUserSaga } from "../features/users/userSaga";

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(watchUserSaga),
  ])
}
