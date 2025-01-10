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
import { Link, Outlet } from 'react-router';
import NoCards from '../features/userCards/NoCards';
import usePaginatedData from '../hooks/usePaginatedData';
import CardsGrid from '../components/CardsGrid';
import { useCallback } from 'react';
import { ICardSummary } from '../types/cards.interface';
import { ROUTES } from '../config/routesConfig';

export default function UserCardsPage() {
  const { status, cards, currentPage, totalPages } =
    useSelector(selectUserCards);
  const handlePageChange = usePaginatedData(
    currentPage,
    getCards,
    changeUserCardsPage,
  );

  const auctionCreateRoute = useCallback(
    (cardId: string) => ROUTES.CREATE_AUCTION(cardId),
    [],
  );
  const cardDetailsRoute = useCallback(
    (cardId: string) => ROUTES.CARD_DETAILS(cardId),
    [],
  );

  const cardActions = useCallback(
    (card: ICardSummary) => (
      <>
        <Button
          size="small"
          color="success"
          component={Link}
          to={auctionCreateRoute(card.id)}>
          Sell
        </Button>
      </>
    ),
    [auctionCreateRoute],
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        My Cards
      </Typography>
      {status === QueryStatusEnum.ERROR && <PageError />}
      {status === QueryStatusEnum.LOADING && <PageLoader />}
      {status === QueryStatusEnum.SUCCESS && cards && cards.length !== 0 && (
        <>
          <CardsGrid
            cards={cards}
            cardActions={cardActions}
            cardPagePath={cardDetailsRoute}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handleChange={handlePageChange}
          />
        </>
      )}
      {status === QueryStatusEnum.SUCCESS && cards?.length === 0 && <NoCards />}
      <Outlet />
    </>
  );
}
