import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCards,
  selectUserCards,
} from '../features/userCards/userCardsSlice';
import { AppDispatch } from '../redux/store';
import { Grid2, Typography } from '@mui/material';
import Card from '../components/Card';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import Pagination from '../components/Pagination';

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
      <Grid2 container spacing={2}>
        {status === QueryStatusEnum.SUCCESS &&
          cards.map((card) => (
            <Grid2 size={3} key={card.id}>
              <Card {...card} is_active is_created_by_admin />
            </Grid2>
          ))}
      </Grid2>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handleChange={handlePageChange}
      />
    </>
  );
}
