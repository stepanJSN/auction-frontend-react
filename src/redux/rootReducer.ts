import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/userSlice';

export const rootReducer = {
  auth: authReducer,
  user: userReducer,
}
