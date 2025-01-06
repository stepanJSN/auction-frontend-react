import { Grid2, SxProps, TextField, Typography } from '@mui/material';
import CardsGrid from '../../components/CardsGrid';
import Pagination from '../../components/Pagination';
import { useCallback } from 'react';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { ICardSummary } from '../../types/cards.interface';
import CardListAction from './CardListAction';
import PageLoader from '../../components/PageLoader';
import PageError from '../../components/PageError';
import useCardList from './useCardList';

type CardsListProps = {
  cardsInSet: ICardSummary[];
  handleAddCard: (value: ICardSummary) => void;
};

const headerStyles: SxProps = {
  mt: 2,
  mb: 1,
};
const inputStyles: SxProps = {
  mb: 1,
};

export default function CardsList({
  handleAddCard,
  cardsInSet,
}: CardsListProps) {
  const { data, status, handleFilterChange, handlePageChange, page } =
    useCardList();

  const cardActions = useCallback(
    (card: ICardSummary) => (
      <CardListAction
        card={card}
        cardsInSet={cardsInSet}
        handleAddCard={handleAddCard}
      />
    ),
    [handleAddCard, cardsInSet],
  );

  return (
    <>
      <Typography variant="h5" sx={headerStyles}>
        Cards List
      </Typography>
      <TextField
        label="Card Name"
        onChange={handleFilterChange}
        size="small"
        fullWidth
        sx={inputStyles}
      />
      {status === QueryStatusEnum.LOADING && <PageLoader />}
      {status === QueryStatusEnum.ERROR && <PageError />}
      {status === QueryStatusEnum.SUCCESS && data?.data.length !== 0 && (
        <>
          <CardsGrid cards={data!.data} cardActions={cardActions} />
          <Pagination
            currentPage={page}
            totalPages={data!.info.totalPages}
            handleChange={handlePageChange}
          />
        </>
      )}
      {status === QueryStatusEnum.SUCCESS && data && data.data.length === 0 && (
        <Typography variant="h6">No cards found</Typography>
      )}
    </>
  );
}
