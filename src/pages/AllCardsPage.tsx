import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import Pagination from '../components/Pagination';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import { Link, Outlet } from 'react-router';
import {
  changeCardsPage,
  getCards,
  selectCards,
} from '../features/cards/cardsSlice';
import FaqHeader from '../components/FaqHeader';
import { ROUTES } from '../config/routesConfig';
import usePaginatedData from '../hooks/usePaginatedData';
import { selectAuth } from '../features/auth/authSlice';
import { Role } from '../enums/role.enum';
import CardsGrid from '../components/CardsGrid';
import { ICardSummary } from '../types/cards.interface';

export default function AllCardsPage() {
  const { status, cards, currentPage, totalPages } = useSelector(selectCards);
  const { role } = useSelector(selectAuth);
  const handlePageChange = usePaginatedData(
    currentPage,
    getCards,
    changeCardsPage,
  );

  const cardActions = useCallback(
    (card: ICardSummary) => {
      if (role && role === Role.ADMIN) {
        return (
          <>
            <Button
              size="small"
              color="success"
              component={Link}
              disabled={!card.is_active}
              to={`/auction-create/${card.id}`}>
              Sell
            </Button>
            <Button component={Link} to={`/edit-card/${card.id}`} size="small">
              Manage
            </Button>
          </>
        );
      }
    },
    [role],
  );

  return (
    <>
      <FaqHeader currentPage={ROUTES.CARDS} />
      {status === QueryStatusEnum.ERROR && <PageError />}
      {status === QueryStatusEnum.LOADING && <PageLoader />}
      {status === QueryStatusEnum.SUCCESS && cards && cards.length !== 0 && (
        <>
          <CardsGrid cards={cards} cardActions={cardActions} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handleChange={handlePageChange}
          />
        </>
      )}
      {status === QueryStatusEnum.SUCCESS && cards && cards.length === 0 && (
        <Typography variant="h5" gutterBottom>
          There are no active cards
        </Typography>
      )}
      <Outlet />
    </>
  );
}
