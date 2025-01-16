import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import userCardsReducer from '../features/userCards/userCardsSlice';
import cardsReducer from '../features/cards/cardsSlice';
import setsReducer from '../features/sets/setsSlice';
import usersReducer from '../features/users/usersSlice';
import locationsReducer from '../features/locations/locationsSlice';
import episodesReducer from '../features/episodes/episodesSlice';
import auctionsReducer from '../features/auctions/AuctionsSlice';
import auctionReducer from '../features/auctions/auction/AuctionSlice';
import chatsReducer from '../features/chats/chatsSlice';
import chatReducer from '../features/chats/chat/chatSlice';
import { combineReducers } from '@reduxjs/toolkit';

const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  userCards: userCardsReducer,
  cards: cardsReducer,
  sets: setsReducer,
  users: usersReducer,
  locations: locationsReducer,
  episodes: episodesReducer,
  auctions: auctionsReducer,
  auction: auctionReducer,
  chats: chatsReducer,
  chat: chatReducer,
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_ACTION) {
    state = {};
  }
  return combinedReducer(state, action);
};

export const RESET_ACTION = 'RESET';
