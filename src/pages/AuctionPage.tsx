import { useParams } from 'react-router';
import CardData from '../features/auctions/CardData';
import {
  Chip,
  Divider,
  Grid2,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import NewBidForm from '../features/auctions/auction/NewBidForm';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import { MutationStatusEnum } from '../enums/mutationStatus';
import dayjs from 'dayjs';
import Notification from '../components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBid,
  getAuction,
  selectAuction,
} from '../features/auctions/auction/AuctionSlice';
import { useCallback, useEffect } from 'react';
import useErrorMessage from '../hooks/useErrorMessage';
import { createBidErrorMessages } from '../features/auctions/auction/createBidErrorMessages';
import useAuctionUpdateListener from '../features/auctions/auction/useAuctionListener';
import { getUser } from '../features/user/userSlice';

const chipStyles: SxProps = {
  maxWidth: '200px',
};

export default function AuctionPage() {
  const { auctionId } = useParams();
  const { data, status, bidCreationStatus, bidCreationErrorCode } =
    useSelector(selectAuction);
  const dispatch = useDispatch();
  const getErrorMessage = useErrorMessage(createBidErrorMessages);
  useAuctionUpdateListener(auctionId!);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAuction(auctionId!));
  }, [auctionId, dispatch]);

  const handleBidCreation = useCallback(
    (data: { bid: string }) => {
      if (!auctionId) return;
      dispatch(createBid({ auctionId: auctionId!, bidAmount: +data.bid }));
    },
    [dispatch, auctionId],
  );

  const isFormInactive =
    data?.is_completed ||
    data?.card.is_owned ||
    data?.is_this_user_auction ||
    false;

  return (
    <>
      {status === QueryStatusEnum.LOADING && <PageLoader />}
      {status === QueryStatusEnum.ERROR && <PageError />}
      {data && (
        <Stack spacing={2}>
          <CardData data={data.card} />
          <Divider />
          <Grid2 container spacing={1}>
            <Grid2 size={6}>
              <Typography variant="h6">
                Starting bid: {data.starting_bid}
              </Typography>
              <Typography variant="h6">
                Min bid step: {data.min_bid_step}
              </Typography>
              <Typography variant="h6">
                Min length: {data.min_length}
              </Typography>
            </Grid2>
            <Grid2 size={6}>
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
          <Divider />
          {data.is_this_user_auction && (
            <Chip label="This is your auction" color="info" sx={chipStyles} />
          )}
          <NewBidForm
            isFormInactive={isFormInactive}
            min={
              data.highest_bid?.amount
                ? data.highest_bid.amount + data.min_bid_step
                : data.starting_bid
            }
            isSubmitting={bidCreationStatus === MutationStatusEnum.PENDING}
            max={data.max_bid ?? undefined}
            onSubmit={handleBidCreation}
          />
        </Stack>
      )}
      <Notification
        open={bidCreationStatus === MutationStatusEnum.SUCCESS}
        message="Bid created successfully"
      />
      <Notification
        open={bidCreationStatus === MutationStatusEnum.ERROR}
        message={getErrorMessage(bidCreationErrorCode)!}
        severity="error"
      />
    </>
  );
}
