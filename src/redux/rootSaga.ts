import { all, fork } from "redux-saga/effects";
import { watchAuthSaga } from "../features/auth/authSaga";

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga)
  ])
}