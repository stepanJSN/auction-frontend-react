import { Grid2, Typography } from '@mui/material';
import AuctionsFilters from '../features/auctions/AuctionsFilters';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuctions,
  removeAuctionFromList,
  selectAuctions,
  updateAuctionGeneralInfo,
  updateAuctionHighestBid,
} from '../features/auctions/AuctionsSlice';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import AuctionCard from '../features/auctions/AuctionCard';
import { useEffect } from 'react';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import { socket } from '../socket';
import { AuctionEventEnum } from '../features/auctions/auctionEventEnum';
import {
  IAuctionChangedEvent,
  IAuctionFinishedEvent,
  IAuctionNewBidEvent,
} from '../features/auctions/auctionEvents.interfaces';

export default function AuctionsPage() {
  const { auctions, status } = useSelector(selectAuctions);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNewBidEvent = (event: IAuctionNewBidEvent) => {
      dispatch(updateAuctionHighestBid(event));
    };
    socket.on(AuctionEventEnum.NEW_BID, handleNewBidEvent);
    return () => {
      socket.off(AuctionEventEnum.NEW_BID, handleNewBidEvent);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleAuctionFinishedEvent = (event: IAuctionFinishedEvent) => {
      dispatch(removeAuctionFromList(event.auctionId));
    };
    socket.on(AuctionEventEnum.FINISHED, handleAuctionFinishedEvent);
    return () => {
      socket.off(AuctionEventEnum.FINISHED, handleAuctionFinishedEvent);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleAuctionChangedEvent = (event: IAuctionChangedEvent) => {
      dispatch(updateAuctionGeneralInfo(event));
    };
    socket.on(AuctionEventEnum.CHANGED, handleAuctionChangedEvent);
    return () => {
      socket.off(AuctionEventEnum.CHANGED, handleAuctionChangedEvent);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAuctions());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Auctions
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={3}>
          <AuctionsFilters />
        </Grid2>
        <Grid2 container spacing={2} size={9}>
          {status === QueryStatusEnum.LOADING && <PageLoader />}
          {status === QueryStatusEnum.ERROR && <PageError />}
          {status === QueryStatusEnum.SUCCESS &&
            auctions.length !== 0 &&
            auctions.map((auction) => (
              <Grid2 key={auction.id} size={4}>
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
      </Grid2>
    </>
  );
}
