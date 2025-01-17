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
import { Role } from '../enums/role.enum';
import CardsGrid from '../components/CardsGrid';
import { ICardSummary } from '../types/cards.interface';
import { selectUser } from '../features/user/userSlice';

export default function AllCardsPage() {
  const { status, cards, currentPage, totalPages } = useSelector(selectCards);
  const { role } = useSelector(selectUser);
  const handlePageChange = usePaginatedData(getCards, changeCardsPage);

  const auctionCreateRoute = useCallback(
    (cardId: string) => ROUTES.CREATE_AUCTION(cardId),
    [],
  );
  const editCardPageRoute = useCallback(
    (cardId: string) => ROUTES.EDIT_CARD(cardId),
    [],
  );
  const cardDetailsRoute = useCallback(
    (cardId: string) => ROUTES.CARD_DETAILS(cardId),
    [],
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
              to={auctionCreateRoute(card.id)}>
              Sell
            </Button>
            <Button
              component={Link}
              to={editCardPageRoute(card.id)}
              size="small">
              Manage
            </Button>
          </>
        );
      }
    },
    [auctionCreateRoute, editCardPageRoute, role],
  );

  return (
    <>
      <FaqHeader currentPage={ROUTES.CARDS} />
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
      {status === QueryStatusEnum.SUCCESS && cards && cards.length === 0 && (
        <Typography variant="h5" gutterBottom>
          There are no active cards
        </Typography>
      )}
      <Outlet />
    </>
  );
}
