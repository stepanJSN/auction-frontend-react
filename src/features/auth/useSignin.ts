import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useCallback } from 'react';
import { ISingInRequest } from '../../types/auth.interfaces';
import { signin } from './authSlice';

export default function useSignin() {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignin = useCallback(
    (data: ISingInRequest) => {
      dispatch(signin(data));
    },
    [dispatch],
  );

  return handleSignin;
}
