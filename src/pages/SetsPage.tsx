import { Stack, Typography } from '@mui/material';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import Pagination from '../components/Pagination';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import { Outlet } from 'react-router';
import FaqHeader from '../components/FaqHeader';
import { ROUTES } from '../config/routesConfig';
import {
  changeSetsPage,
  getSets,
  selectSets,
} from '../features/sets/setsSlice';
import Set from '../features/sets/Set';
import { useSelector } from 'react-redux';
import usePaginatedData from '../hooks/usePaginatedData';

export default function SetsPage() {
  const { status, sets, currentPage, totalPages } = useSelector(selectSets);
  const handlePageChange = usePaginatedData(
    currentPage,
    getSets,
    changeSetsPage,
  );

  return (
    <>
      <FaqHeader currentPage={ROUTES.SETS} />
      {status === QueryStatusEnum.ERROR && <PageError />}
      {status === QueryStatusEnum.LOADING && <PageLoader />}
      {status === QueryStatusEnum.SUCCESS && sets.length !== 0 && (
        <>
          <Stack spacing={2}>
            {sets.map((set) => (
              <Set key={set.id} set={set} />
            ))}
          </Stack>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handleChange={handlePageChange}
          />
        </>
      )}
      {status === QueryStatusEnum.SUCCESS && sets.length === 0 && (
        <Typography variant="h5" gutterBottom>
          There are no sets available
        </Typography>
      )}
      <Outlet />
    </>
  );
}
