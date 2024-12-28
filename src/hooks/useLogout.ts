import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch } from '../redux/store';
import { ROUTES } from '../config/routesConfig';
import { RESET_ACTION } from '../redux/rootReducer';

export default function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const logout = useCallback(() => {
    dispatch({ type: RESET_ACTION });
    navigate(ROUTES.SIGN_IN);
  }, [dispatch, navigate]);

  return logout;
}
