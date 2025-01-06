import { useCallback } from 'react';
import { ICardSummary } from '../../types/cards.interface';
import { Button } from '@mui/material';

type CardActionsProps = {
  card: ICardSummary;
  cardsInSet: ICardSummary[];
  handleAddCard: (card: ICardSummary) => void;
};

export default function CardListAction({
  card,
  cardsInSet,
  handleAddCard,
}: CardActionsProps) {
  const isCardInSet = !!cardsInSet.find(
    (cardInSet) => cardInSet.id === card.id,
  );

  const handleButtonClick = useCallback(() => {
    handleAddCard(card);
  }, [card, handleAddCard]);

  return (
    <Button
      size="small"
      color="success"
      disabled={!card.is_active || isCardInSet}
      onClick={handleButtonClick}>
      Add to set
    </Button>
  );
}
