import { Chip, Grid2, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { IAuction } from '../../../types/auctions.interfaces';

type AuctionDataProps = {
  data: Omit<IAuction, 'card' | 'is_this_user_auction'>;
};

const gridSizeBreakpoints = {
  xs: 12,
  sm: 6,
};

export default function AuctionData({ data }: AuctionDataProps) {
  return (
    <Grid2 container spacing={1}>
      <Grid2 size={gridSizeBreakpoints}>
        <Typography variant="h6">Starting bid: {data.starting_bid}</Typography>
        <Typography variant="h6">Min bid step: {data.min_bid_step}</Typography>
        <Typography variant="h6">Min length: {data.min_length}</Typography>
      </Grid2>
      <Grid2 size={gridSizeBreakpoints}>
        <Typography variant="h6">
          End time: {dayjs(data.end_time).format('YYYY-MM-DD HH:mm')}{' '}
          {data.is_completed && (
            <Chip label="Auction is completed" color="info" />
          )}
        </Typography>
        <Typography variant="h6">
          Highest bid: {data.highest_bid?.amount ?? 'None'}{' '}
          {data.highest_bid?.is_this_user_bid && (
            <Chip label="Your bid is the highest" color="success" />
          )}
        </Typography>
        {data.max_bid && (
          <Typography variant="h6">Max bid: {data.max_bid}</Typography>
        )}
      </Grid2>
    </Grid2>
  );
}
