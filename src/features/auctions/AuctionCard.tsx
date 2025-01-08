import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { CardLabel } from '../../components/CardLabel';
import { Link } from 'react-router';

type AuctionCardProps = {
  cardName: string;
  imageUrl: string;
  isUserLeader: boolean;
  endTime: string;
  highestBid: number | null;
};

export default function AuctionCard({
  cardName,
  imageUrl,
  isUserLeader,
  endTime,
  highestBid,
}: AuctionCardProps) {
  return (
    <Card>
      <Stack>
        <CardMedia image={imageUrl} title={cardName} />
        {isUserLeader && (
          <CardLabel colorVariant="success">Your bid is the highest</CardLabel>
        )}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {cardName}
          </Typography>
          <Typography>{endTime}</Typography>
          <Typography>{highestBid}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" component={Link} to="">
            Make bid
          </Button>
        </CardActions>
      </Stack>
    </Card>
  );
}
