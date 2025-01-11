import { LinearProgress, Typography } from '@mui/material';
import UsersTable from '../features/users/UsersTable';
import { useSelector } from 'react-redux';
import { selectUsers } from '../features/users/usersSlice';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageError from '../components/PageError';
import PageLoader from '../components/PageLoader';
import useUsersLogic from '../features/users/useUsersLogic';
import UsersFilters from '../features/users/UsersFilters';
import LoadMoreBtn from '../components/LoadMoreBtn';
import { LinearProgressPlaceholder } from '../components/LinearProgressPlaceholder';

export default function UsersPage() {
  const { status, users, hasMore, sortType, sortOrder, showOnlyAdmins } =
    useSelector(selectUsers);
  const {
    handleDelete,
    handleUpdate,
    handleLoadMore,
    handleSortTypeChange,
    handleSortOrderChange,
    handleShowOnlyAdminsChange,
  } = useUsersLogic();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <UsersFilters
        sortType={sortType}
        sortOrder={sortOrder}
        showOnlyAdmins={showOnlyAdmins}
        handleSortTypeChange={handleSortTypeChange}
        handleSortOrderChange={handleSortOrderChange}
        handleShowOnlyAdminsChange={handleShowOnlyAdminsChange}
      />
      {status === QueryStatusEnum.LOADING && users.length === 0 && (
        <PageLoader />
      )}
      {status === QueryStatusEnum.ERROR && <PageError />}
      {users.length !== 0 && (
        <>
          {status === QueryStatusEnum.LOADING && <LinearProgress />}
          {status === QueryStatusEnum.SUCCESS && <LinearProgressPlaceholder />}
          <UsersTable
            users={users}
            onDelete={handleDelete}
            onUpdateRole={handleUpdate}
          />
          <LoadMoreBtn
            isLoading={status === QueryStatusEnum.LOADING}
            hasMore={hasMore}
            handleLoadMore={handleLoadMore}
          />
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
