import { Alert, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router';
import useQuery from '../hooks/useQuery';
import CardData from '../features/auctions/CardData';
import AuctionForm from '../features/auctions/AuctionForm';
import { useMemo } from 'react';
import { MutationStatusEnum } from '../enums/mutationStatus';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import Notification from '../components/Notification';
import { auctionService } from '../services/auctionService';
import useUpdateAuction from '../features/auctions/editAuction/useUpdateAuction';
import useDeleteAuction from '../features/auctions/editAuction/useDeleteAuction';
import useErrorMessage from '../hooks/useErrorMessage';
import { editAuctionErrorMessages } from '../features/auctions/editAuction/editAuctionErrorMessage';
import FormActions from '../features/auctions/editAuction/FormActions';

export default function CreateAuctionPage() {
  const { auctionId } = useParams();
  const { data, status } = useQuery({
    requestFn: auctionService.findOne,
    params: auctionId!,
    autoFetch: !!auctionId,
  });
  const {
    handleUpdate,
    updateStatus,
    errorCode: updateErrorCode,
  } = useUpdateAuction(auctionId);
  const {
    handleDelete,
    deleteStatus,
    errorCode: deleteErrorCode,
  } = useDeleteAuction(auctionId);
  const getErrorMessage = useErrorMessage(editAuctionErrorMessages);

  const actions = useMemo(
    () => (
      <FormActions
        updateStatus={updateStatus}
        deleteStatus={deleteStatus}
        handleDelete={handleDelete}
        isCompleted={data?.is_completed || true}
      />
    ),
    [data?.is_completed, deleteStatus, handleDelete, updateStatus],
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Edit auction
      </Typography>
      {!auctionId && <Alert color="error">Id was not provided</Alert>}
      {status === QueryStatusEnum.LOADING && <PageLoader />}
      {status === QueryStatusEnum.ERROR && <PageError />}
      {auctionId && data && (
        <Stack spacing={2}>
          <CardData data={data.card} />
          <AuctionForm
            data={data}
            actions={actions}
            onSubmit={handleUpdate}
            isFormInactive={data.is_completed}
          />
        </Stack>
      )}
      <Notification
        open={updateStatus === MutationStatusEnum.SUCCESS}
        message="Action was updated successfully"
        severity="success"
      />
      <Notification
        open={updateStatus === MutationStatusEnum.ERROR}
        message={getErrorMessage(updateErrorCode)!}
        severity="error"
      />
      <Notification
        open={deleteStatus === MutationStatusEnum.ERROR}
        message={getErrorMessage(deleteErrorCode)!}
        severity="error"
      />
    </>
  );
}
