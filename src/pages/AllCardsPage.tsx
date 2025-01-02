import { useSelector } from 'react-redux';
import { Button, Grid2, Typography } from '@mui/material';
import Card from '../components/Card';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import Pagination from '../components/Pagination';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import { Outlet } from 'react-router';
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

const cardColumnsNumber = { xs: 12, sm: 6, md: 4, lg: 3 };

export default function AllCardsPage() {
  const { status, cards, currentPage, totalPages } = useSelector(selectCards);
  const { role } = useSelector(selectAuth);
  const handlePageChange = usePaginatedData(
    currentPage,
    getCards,
    changeCardsPage,
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
                <Card {...card}>
                  {role === Role.ADMIN && (
                    <>
                      <Button size="small" color="success">
                        Sell
                      </Button>
                      <Button size="small">Manage</Button>
                    </>
                  )}
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
      {status === QueryStatusEnum.SUCCESS && cards.length === 0 && (
        <Typography variant="h5" gutterBottom>
          There are no active cards
        </Typography>
      )}
      <Outlet />
    </>
  );
}
