import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from '../features/auth/authSaga';
import { watchUserSaga } from '../features/user/userSaga';
import { watchUserCardsSaga } from '../features/userCards/userCardsSaga';
import { watchCardsSaga } from '../features/cards/cardsSaga';
import { watchSetsSaga } from '../features/sets/setsSaga';
import { watchUsersSaga } from '../features/users/usersSaga';
import { watchLocationsSaga } from '../features/locations/locationsSaga';
import { watchEpisodesSaga } from '../features/episodes/episodesSaga';
import { watchAuctionsSaga } from '../features/auctions/AuctionsSaga';
import { watchAuctionSaga } from '../features/auctions/auction/AuctionSaga';

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(watchUserSaga),
    fork(watchUserCardsSaga),
    fork(watchCardsSaga),
    fork(watchSetsSaga),
    fork(watchUsersSaga),
    fork(watchLocationsSaga),
    fork(watchEpisodesSaga),
    fork(watchAuctionsSaga),
    fork(watchAuctionSaga),
  ]);
}
