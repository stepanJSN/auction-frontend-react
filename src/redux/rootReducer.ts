import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/userSlice';
import userCardsReducer from '../features/userCards/userCardsSlice';

export const rootReducer = {
  auth: authReducer,
  user: userReducer,
  userCards: userCardsReducer,
};
