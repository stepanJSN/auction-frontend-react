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
import { watchChatsSaga } from '../features/chats/chatsSaga';
import { watchChatSaga } from '../features/chats/chat/chatSaga';
import { watchStatisticsSaga } from '../features/statistics/statisticsSaga';
import { watchSystemFeeSaga } from '../features/systemFee/systemFeeSaga';
import { watchSystemSaga } from '../features/system/systemSaga';

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
    fork(watchChatsSaga),
    fork(watchChatSaga),
    fork(watchStatisticsSaga),
    fork(watchSystemFeeSaga),
    fork(watchSystemSaga),
  ]);
}
