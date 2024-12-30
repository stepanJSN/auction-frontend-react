import { useSelector } from 'react-redux';
import {
  changeUserCardsPage,
  getCards,
  selectUserCards,
} from '../features/userCards/userCardsSlice';
import { Button, Grid2, Typography } from '@mui/material';
import Card from '../components/Card';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import Pagination from '../components/Pagination';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import { Outlet } from 'react-router';
import NoCards from '../features/userCards/NoCards';
import usePaginatedData from '../hooks/usePaginatedData';

const cardColumnsNumber = { xs: 12, sm: 6, md: 4, lg: 3 };

export default function UserCardsPage() {
  const { status, cards, currentPage, totalPages } =
    useSelector(selectUserCards);
  const handlePageChange = usePaginatedData(
    currentPage,
    getCards,
    changeUserCardsPage,
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
