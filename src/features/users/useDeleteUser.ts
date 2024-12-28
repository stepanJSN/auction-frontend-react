import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import { deleteUser } from './userSlice';
import useLogout from '../../hooks/useLogout';

export default function useDeleteUser(
  userId: string,
  deleteStatus: MutationStatusEnum,
) {
  const dispatch = useDispatch();
  const logout = useLogout();

  const handleDelete = useCallback(() => {
    if (userId) {
      dispatch(deleteUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (deleteStatus === MutationStatusEnum.SUCCESS) {
      logout();
    }
  }, [deleteStatus, logout]);

  return handleDelete;
}
