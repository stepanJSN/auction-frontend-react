import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCards,
  selectUserCards,
} from '../features/userCards/userCardsSlice';
import { AppDispatch } from '../redux/store';
import { Button, Grid2, Typography } from '@mui/material';
import Card from '../components/Card';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import Pagination from '../components/Pagination';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import { Outlet } from 'react-router';

export default function UserCardsPage() {
  const { status, cards, currentPage, totalPages } =
    useSelector(selectUserCards);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCards(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(getCards(value));
    },
    [dispatch],
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        My Cards
      </Typography>
      {status === QueryStatusEnum.ERROR && <PageError />}
      {status === QueryStatusEnum.LOADING && <PageLoader />}
      {status === QueryStatusEnum.SUCCESS && (
        <>
          <Grid2 container spacing={2}>
            {cards.map((card) => (
              <Grid2 size={3} key={card.id}>
                <Card {...card}>
                  <Button size="small" color="success">
                    Sell
                  </Button>
                </Card>
              </Grid2>
            ))}
          </Grid2>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handleChange={handlePageChange}
          />
        </>
      )}
      <Outlet />
    </>
  );
}
