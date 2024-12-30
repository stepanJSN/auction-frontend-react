import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { Stack, Typography } from '@mui/material';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import Pagination from '../components/Pagination';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import { Outlet } from 'react-router';
import FaqHeader from '../components/FaqHeader';
import { ROUTES } from '../config/routesConfig';
import { getSets, selectSets } from '../features/sets/setsSlice';
import Set from '../features/sets/Set';

export default function SetsPage() {
  const { status, sets, currentPage, totalPages } = useSelector(selectSets);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getSets(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(getSets(value));
    },
    [dispatch],
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
