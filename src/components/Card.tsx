import { useMemo } from 'react';
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Card as MuiCard,
  Stack,
  Typography,
} from '@mui/material';
import { ICardSummary } from '../types/cards.interface';
import { CardLabel } from './CardLabel';

type CardProps = ICardSummary;

const cardMediaStyles = {
  height: '200px',
};

const cardContentStyles = {
  flex: 'auto',
};

export default function Card({
  name,
  image_url,
  gender,
  is_created_by_admin,
  is_active,
  type,
}: CardProps) {
  const cardStyles = useMemo(
    () => ({
      height: '100%',
      backgroundColor: is_active ? '' : 'grey.300',
    }),
    [is_active],
  );
  return (
    <MuiCard sx={cardStyles}>
      <Stack height="100%">
        <CardMedia sx={cardMediaStyles} image={image_url} title={name} />
        {is_created_by_admin && (
          <CardLabel>Card was created by admin</CardLabel>
        )}
        <CardContent sx={cardContentStyles}>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1">Gender: {gender}</Typography>
          {type && <Typography variant="body1">Type: {type}</Typography>}
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
          <Button size="small" color="success">
            Sell
          </Button>
        </CardActions>
      </Stack>
    </MuiCard>
  );
}
