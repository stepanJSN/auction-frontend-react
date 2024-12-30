import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from './userSlice';
import { IUpdateUser } from '../../types/userService.interfaces';

export default function useUpdateUser(userId: string) {
  const dispatch = useDispatch();

  const handleUpdate = useCallback(
    (data: IUpdateUser) => {
      if (userId) {
        dispatch(updateUser({ id: userId, data }));
      }
    },
    [dispatch, userId],
  );

  return handleUpdate;
}
