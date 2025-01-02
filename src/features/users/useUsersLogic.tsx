import { SelectChangeEvent } from '@mui/material';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Role } from '../../enums/role.enum';
import { SortOrderEnum } from '../../enums/sortOrder.enum';
import { UsersSortTypeEnum } from '../../types/user.interfaces';
import {
  getUsers,
  deleteUser,
  updateUserRole,
  changeFilterParams,
  selectUsers,
} from './usersSlice';

export default function useUsersLogic() {
  const { currentPage, sortType, sortOrder, showOnlyAdmins } =
    useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    dispatch(getUsers(currentPage + 1));
  }, [currentPage, dispatch]);

  const handleDelete = useCallback(
    (userId: string) => {
      dispatch(deleteUser(userId));
    },
    [dispatch],
  );

  const handleUpdate = useCallback(
    (userId: string, role: Role) => {
      dispatch(updateUserRole({ id: userId, role }));
    },
    [dispatch],
  );

  const handleSortTypeChange = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(
        changeFilterParams({
          sortType: event.target.value as UsersSortTypeEnum,
          sortOrder,
          showOnlyAdmins,
        }),
      );
    },
    [dispatch, sortOrder, showOnlyAdmins],
  );

  const handleSortOrderChange = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(
        changeFilterParams({
          sortType,
          sortOrder: event.target.value as SortOrderEnum,
          showOnlyAdmins,
        }),
      );
    },
    [dispatch, sortType, showOnlyAdmins],
  );

  const handleShowOnlyAdminsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeFilterParams({
          sortType,
          sortOrder,
          showOnlyAdmins: event.target.checked,
        }),
      );
    },
    [dispatch, sortType, sortOrder],
  );

  return {
    handleLoadMore,
    handleDelete,
    handleUpdate,
    handleSortTypeChange,
    handleSortOrderChange,
    handleShowOnlyAdminsChange,
  };
}
