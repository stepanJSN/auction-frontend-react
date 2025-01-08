import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import { CardLabel } from '../../components/CardLabel';
import { Link } from 'react-router';
import dayjs from 'dayjs';

type AuctionCardProps = {
  cardName: string;
  imageUrl: string;
  isUserLeader: boolean;
  endTime: string;
  highestBid: number | null;
  minBidStep: number;
  startingBid: number;
  maxBid?: number;
  isCompleted?: boolean;
};

const cardWrapperStyles: SxProps = {
  height: '100%',
};

const cardMediaStyles: SxProps = {
  height: '200px',
};

const cardContentStyles = {
  flex: 'auto',
};

export default function AuctionCard({
  cardName,
  imageUrl,
  isUserLeader,
  endTime,
  highestBid,
  maxBid,
  startingBid,
  minBidStep,
  isCompleted,
}: AuctionCardProps) {
  return (
    <Card sx={cardWrapperStyles}>
      <Stack sx={cardWrapperStyles}>
        <CardMedia sx={cardMediaStyles} image={imageUrl} title={cardName} />
        {isUserLeader && (
          <CardLabel colorVariant="success">Your bid is the highest</CardLabel>
        )}
        {isCompleted && (
          <CardLabel colorVariant="success">Auction is completed</CardLabel>
        )}
        <CardContent sx={cardContentStyles}>
          <Typography variant="h5" gutterBottom>
            {cardName}
          </Typography>
          <Typography>
            End time: {dayjs(endTime).format('YYYY-MM-DD HH:mm')}
          </Typography>
          <Typography>Highest bid: {highestBid ?? 'None'}</Typography>
          {startingBid && <Typography>Starting bid: {startingBid}</Typography>}
          <Typography>Min bid step: {minBidStep}</Typography>
          {maxBid && <Typography>Max bid: {maxBid}</Typography>}
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" component={Link} to="">
            Make bid
          </Button>
        </CardActions>
      </Stack>
    </Card>
  );
}
