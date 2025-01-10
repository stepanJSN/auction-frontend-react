import { Grid2 } from '@mui/material';
import Card from './Card';
import { ICardSummary } from '../types/cards.interface';

type CardsGridProps = {
  cards: ICardSummary[];
  cardPagePath: (cardId: string) => string;
  cardActions?: (card: ICardSummary) => React.ReactNode;
};

const cardColumnsNumber = { xs: 12, sm: 6, md: 4, lg: 3 };

export default function CardsGrid({
  cards,
  cardActions,
  cardPagePath,
}: CardsGridProps) {
  return (
    <Grid2 container spacing={2}>
      {cards.map((card) => (
        <Grid2 size={cardColumnsNumber} key={card.id}>
          <Card {...card} cardPagePath={cardPagePath}>
            {cardActions && cardActions(card)}
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}
