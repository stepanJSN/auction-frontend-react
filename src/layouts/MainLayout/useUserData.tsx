import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../features/user/userSlice';

export default function useUserData() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
}
