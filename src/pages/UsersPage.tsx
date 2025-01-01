import {
  Button,
  Grid2,
  LinearProgress,
  SelectChangeEvent,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import UsersTable from '../features/users/UsersTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFilterParams,
  deleteUser,
  getUsers,
  selectUsers,
  updateUser,
} from '../features/users/usersSlice';
import { useEffect, useCallback } from 'react';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageError from '../components/PageError';
import PageLoader from '../components/PageLoader';
import { Role } from '../enums/role.enum';
import BasicSelect from '../components/Select';
import { UsersSortTypeEnum } from '../types/user.interfaces';
import { SortOrderEnum } from '../enums/sortOrder.enum';
import Switch from '../components/Switch';

const buttonContainerStyles: SxProps = {
  mt: 2,
};

const filterContainerStyles: SxProps = {
  mb: 2,
};

const sortByOptions = [
  { value: UsersSortTypeEnum.CREATION_DATE, label: 'Creation date' },
  { value: UsersSortTypeEnum.RATING, label: 'Rating' },
];

const sortOrderOptions = [
  { value: SortOrderEnum.ASC, label: 'Ascending' },
  { value: SortOrderEnum.DESC, label: 'Descending' },
];

export default function UsersPage() {
  const {
    status,
    users,
    hasMore,
    currentPage,
    sortType,
    sortOrder,
    showOnlyAdmins,
  } = useSelector(selectUsers);
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
      dispatch(updateUser({ id: userId, role }));
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

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      {status === QueryStatusEnum.ERROR && <PageError />}
      {status === QueryStatusEnum.LOADING && users.length === 0 && (
        <PageLoader />
      )}
      <Grid2 spacing={2} sx={filterContainerStyles} container>
        <Grid2 size={3}>
          <BasicSelect
            label="Sort by"
            value={sortType}
            options={sortByOptions}
            handleChange={handleSortTypeChange}
          />
        </Grid2>
        <Grid2 size={3}>
          <BasicSelect
            label="Sort order"
            value={sortOrder}
            options={sortOrderOptions}
            handleChange={handleSortOrderChange}
          />
        </Grid2>
        <Grid2>
          <Switch
            label="Show only admins"
            checked={showOnlyAdmins}
            handleChange={handleShowOnlyAdminsChange}
          />
        </Grid2>
      </Grid2>
      {users.length !== 0 && (
        <>
          {status === QueryStatusEnum.LOADING && <LinearProgress />}
          <UsersTable
            users={users}
            onDelete={handleDelete}
            onUpdateRole={handleUpdate}
          />
          <Stack
            direction="row"
            justifyContent="center"
            sx={buttonContainerStyles}>
            <Button
              onClick={handleLoadMore}
              disabled={!hasMore}
              variant="contained">
              Load more
            </Button>
          </Stack>
        </>
      )}
      {users.length === 0 && status === QueryStatusEnum.SUCCESS && (
        <Typography variant="h5" gutterBottom>
          There are no users
        </Typography>
      )}
    </>
  );
}
