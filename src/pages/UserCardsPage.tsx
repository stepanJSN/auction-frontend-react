import { useSelector } from 'react-redux';
import {
  changeUserCardsPage,
  getCards,
  selectUserCards,
} from '../features/userCards/userCardsSlice';
import { Button, Typography } from '@mui/material';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import Pagination from '../components/Pagination';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import { Outlet } from 'react-router';
import NoCards from '../features/userCards/NoCards';
import usePaginatedData from '../hooks/usePaginatedData';
import CardsGrid from '../components/CardsGrid';
import { useCallback } from 'react';

export default function UserCardsPage() {
  const { status, cards, currentPage, totalPages } =
    useSelector(selectUserCards);
  const handlePageChange = usePaginatedData(
    currentPage,
    getCards,
    changeUserCardsPage,
  );

  const cardActions = useCallback(
    () => (
      <>
        <Button size="small" color="success">
          Sell
        </Button>
      </>
    ),
    [],
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
          <CardsGrid cards={cards} cardActions={cardActions} />
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
