import {
  CardContent,
  CardMedia,
  Card as MuiCard,
  Typography,
} from '@mui/material';
import { ICardSummary } from '../types/cards.interface';

type CardProps = ICardSummary;

export default function Card({
  name,
  image_url,
  gender,
  is_created_by_admin,
  is_active,
  type,
}: CardProps) {
  return (
    <MuiCard>
      <CardMedia image={image_url} title={name} />
      {is_created_by_admin && (
        <Typography>Card was created by admin</Typography>
      )}
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body1">Gender: {gender}</Typography>
        <Typography variant="body1">Type: {type}</Typography>
      </CardContent>
    </MuiCard>
  );
}
