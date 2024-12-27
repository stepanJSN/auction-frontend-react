import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch } from '../redux/store';
import { logout as logoutAction } from '../features/auth/authSlice';

export default function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const logout = useCallback(() => {
    navigate('/signin');
    dispatch(logoutAction());
  }, [dispatch, navigate]);

  return logout;
}
