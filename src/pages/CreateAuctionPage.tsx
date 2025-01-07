import { Alert, Button, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { cardsService } from '../services/cardsService';
import useQuery from '../hooks/useQuery';
import CardData from '../features/auctions/CardData';
import AuctionForm from '../features/auctions/AuctionForm';
import { useCallback, useMemo } from 'react';
import useMutation from '../hooks/useMutation';
import { ICreateAuction } from '../types/auctions.interfaces';
import { auctionService } from '../services/auctionService';
import { MutationStatusEnum } from '../enums/mutationStatus';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import Notification from '../components/Notification';
import useErrorMessage from '../hooks/useErrorMessage';
import { createAuctionErrorMessages } from '../features/auctions/createAuctionErrorMessages';

export default function CreateAuctionPage() {
  const { cardId } = useParams();
  const { data, status } = useQuery({
    requestFn: cardsService.getOne,
    params: cardId!,
    autoFetch: !!cardId,
  });
  const getErrorMessage = useErrorMessage(createAuctionErrorMessages);

  const {
    mutate,
    status: creationStatus,
    errorCode,
  } = useMutation((data: ICreateAuction) => {
    return auctionService.create(data);
  }, false);

  const handleCreate = useCallback(
    (data: Omit<ICreateAuction, 'cardId'>) => {
      mutate({
        minBidStep: +data.minBidStep,
        maxBid: data.maxBid ? +data.maxBid : undefined,
        startingBid: +data.startingBid,
        minLength: +data.minLength,
        endTime: data.endTime,
        cardId: cardId!,
      });
    },
    [mutate, cardId],
  );

  const actions = useMemo(
    () => (
      <Button
        disabled={
          creationStatus === MutationStatusEnum.PENDING ||
          creationStatus === MutationStatusEnum.SUCCESS
        }
        type="submit"
        variant="contained">
        {creationStatus === MutationStatusEnum.PENDING
          ? 'Creating...'
          : 'Create'}
      </Button>
    ),
    [creationStatus],
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create auction
      </Typography>
      {!cardId && <Alert color="error">Id was not provided</Alert>}
      {status === QueryStatusEnum.LOADING && <PageLoader />}
      {status === QueryStatusEnum.ERROR && <PageError />}
      {cardId && data && (
        <Stack spacing={2}>
          <CardData data={data} />
          <AuctionForm actions={actions} onSubmit={handleCreate} />
        </Stack>
      )}
      <Notification
        open={creationStatus === MutationStatusEnum.SUCCESS}
        message="Action was created successfully"
        severity="success"
      />
      <Notification
        open={creationStatus === MutationStatusEnum.ERROR}
        message={getErrorMessage(errorCode)!}
        severity="error"
      />
    </>
  );
}
