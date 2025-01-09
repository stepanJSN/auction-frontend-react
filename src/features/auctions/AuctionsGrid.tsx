import { Grid2 } from '@mui/material';
import AuctionCard from './AuctionCard';
import { IAuctionSummary } from '../../types/auctions.interfaces';

type AuctionsGridProps = {
  auctions: IAuctionSummary[];
};

const auctionsGridBreakpoints = {
  xs: 12,
  sm: 6,
  lg: 4,
};

export default function AuctionsGrid({ auctions }: AuctionsGridProps) {
  return (
    <Grid2 container spacing={2}>
      {auctions.length !== 0 &&
        auctions.map((auction) => (
          <Grid2 key={auction.id} size={auctionsGridBreakpoints}>
            <AuctionCard
              cardName={auction.name}
              imageUrl={auction.image_url}
              isUserLeader={auction.is_user_leader}
              endTime={auction.end_time}
              highestBid={auction.highest_bid}
              maxBid={auction.max_bid}
              minBidStep={auction.min_bid_step}
              startingBid={auction.starting_bid}
            />
          </Grid2>
        ))}
    </Grid2>
  );
}
