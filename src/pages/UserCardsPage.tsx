import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCards } from '../features/userCards/userCardsSlice';
import { AppDispatch, RootState } from '../redux/store';
import { Grid2, Typography } from '@mui/material';
import Card from '../components/Card';
import { QueryStatusEnum } from '../enums/queryStatus.enum';

export default function UserCardsPage() {
  const currentPage = useSelector(
    useCallback((state: RootState) => state.userCards.currentPage, []),
  );
  const cards = useSelector(
    useCallback(
      (state: RootState) => state.userCards.cards[currentPage],
      [currentPage],
    ),
  );
  const status = useSelector(
    useCallback((state: RootState) => state.userCards.status, []),
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCards(currentPage));
  }, [dispatch, currentPage]);

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
    </>
  );
}
