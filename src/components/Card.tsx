import { useMemo } from 'react';
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Card as MuiCard,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import { ICardSummary } from '../types/cards.interface';
import { CardLabel } from './CardLabel';
import { Link } from 'react-router';

type CardProps = Omit<ICardSummary, 'created_at' | 'location_id'> & {
  children?: React.ReactNode;
  cardPagePath: (cardId: string) => string;
};

const cardMediaStyles = {
  height: '200px',
};

const cardContentStyles = {
  flex: 'auto',
};

export default function Card({
  id,
  name,
  image_url,
  gender,
  is_created_by_admin,
  is_active,
  is_owned,
  type,
  children,
  cardPagePath,
}: CardProps) {
  const cardStyles: SxProps = useMemo(
    () => ({
      height: '100%',
      backgroundColor: is_active ? '' : 'grey.300',
      borderColor: 'success.main',
      borderWidth: is_owned ? 3 : 0,
      borderStyle: 'solid',
    }),
    [is_active, is_owned],
  );
  return (
    <MuiCard sx={cardStyles} elevation={is_owned ? 3 : 1}>
      <Stack height="100%">
        <CardMedia sx={cardMediaStyles} image={image_url} title={name} />
        {is_created_by_admin && (
          <CardLabel colorVariant="info">Card was created by admin</CardLabel>
        )}
        {is_owned && (
          <CardLabel colorVariant="success">You have this card</CardLabel>
        )}
        <CardContent sx={cardContentStyles}>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1">Gender: {gender}</Typography>
          {type && <Typography variant="body1">Type: {type}</Typography>}
        </CardContent>
        <CardActions>
          <Button component={Link} to={cardPagePath(id)} size="small">
            Learn More
          </Button>
          {children}
        </CardActions>
      </Stack>
    </MuiCard>
  );
}
