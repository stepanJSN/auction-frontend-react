import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCards } from '../features/cards/cardsSlice';
import { AppDispatch } from '../redux/store';
import { Grid2 } from '@mui/material';
import Card from '../components/Card';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import Pagination from '../components/Pagination';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import { Outlet } from 'react-router';
import NoCards from '../features/userCards/NoCards';
import { selectCards } from '../features/cards/cardsSlice';
import FaqHeader from '../components/FaqHeader';
import { ROUTES } from '../config/routesConfig';

const cardColumnsNumber = { xs: 12, sm: 6, md: 4, lg: 3 };

export default function AllCardsPage() {
  const { status, cards, currentPage, totalPages } = useSelector(selectCards);

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
      <FaqHeader currentPage={ROUTES.CARDS} />
      {status === QueryStatusEnum.ERROR && <PageError />}
      {status === QueryStatusEnum.LOADING && <PageLoader />}
      {status === QueryStatusEnum.SUCCESS && cards.length !== 0 && (
        <>
          <Grid2 container spacing={2}>
            {cards.map((card) => (
              <Grid2 size={cardColumnsNumber} key={card.id}>
                <Card {...card} />
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
