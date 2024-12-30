import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCards,
  selectUserCards,
} from '../features/userCards/userCardsSlice';
import { AppDispatch } from '../redux/store';
import { Button, Grid2, Stack, Typography } from '@mui/material';
import Card from '../components/Card';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import Pagination from '../components/Pagination';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import { Outlet, Link as RouterLink } from 'react-router';
import Link from '../components/Link';
import { ROUTES } from '../config/routesConfig';
import NoCards from '../features/userCards/NoCards';

const cardColumnsNumber = { xs: 12, sm: 6, md: 4, lg: 3 };

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
      {status === QueryStatusEnum.SUCCESS && cards.length !== 0 && (
        <>
          <Grid2 container spacing={2}>
            {cards.map((card) => (
              <Grid2 size={cardColumnsNumber} key={card.id}>
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
      {status === QueryStatusEnum.SUCCESS && cards.length === 0 && <NoCards />}
      <Outlet />
    </>
  );
}
