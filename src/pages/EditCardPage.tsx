import { useMemo } from 'react';
import {
  Alert,
  Button,
  Grid2,
  GridSize,
  SxProps,
  Typography,
} from '@mui/material';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import useImage from '../hooks/useImage';
import ManageCardForm from '../features/cards/ManageCardForm';
import { MutationStatusEnum } from '../enums/mutationStatus';
import useErrorMessage from '../hooks/useErrorMessage';
import { useParams } from 'react-router';
import useQuery from '../hooks/useQuery';
import { cardsService } from '../services/cardsService';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import useUpdateCard from '../features/cards/useUpdateCard';
import { updateCardErrorMessages } from '../features/cards/updateCardErrorMessages';

const alertStyles: SxProps = {
  mb: 1,
};

const imageContainerStyles: SxProps = {
  minWidth: '250px',
  height: '300px',
};

const imageBreakpoints: Record<string, GridSize> = {
  xs: 12,
  sm: 'auto',
};

export default function CreateCardPage() {
  const { cardId } = useParams();
  const { data, status } = useQuery({
    requestFn: cardsService.getOne,
    params: cardId!,
    autoFetch: true,
  });
  const { image, handleDelete, handleUpload, isImageError, setIsImageError } =
    useImage(data?.image_url);
  const getErrorMessage = useErrorMessage(updateCardErrorMessages);
  const {
    handleSubmit,
    status: updateStatus,
    errorCode,
  } = useUpdateCard(setIsImageError, image, cardId);
  const mutationPending = updateStatus === MutationStatusEnum.PENDING;

  const actions = useMemo(
    () => (
      <>
        <Button type="submit" variant="contained" disabled={mutationPending}>
          {mutationPending ? 'Updating...' : 'Update'}
        </Button>
        <Button color="error" variant="contained" disabled={mutationPending}>
          {mutationPending ? 'Deleting...' : 'Delete'}
        </Button>
      </>
    ),
    [mutationPending],
  );
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Edit {data?.name} Card
      </Typography>
      {status === QueryStatusEnum.LOADING && <PageLoader />}
      {status === QueryStatusEnum.ERROR && <PageError />}
      {updateStatus === MutationStatusEnum.ERROR && (
        <Alert severity="error" sx={alertStyles}>
          {getErrorMessage(errorCode)}
        </Alert>
      )}
      {updateStatus === MutationStatusEnum.SUCCESS && (
        <Alert severity="success" sx={alertStyles}>
          Card updated successfully
        </Alert>
      )}
      {status === QueryStatusEnum.SUCCESS && (
        <Grid2 container spacing={3}>
          <Grid2 size={imageBreakpoints} sx={imageContainerStyles}>
            <ImageUpload
              imageUrl={image?.url}
              handleDelete={handleDelete}
              handleUpload={handleUpload}
              isPending={updateStatus === MutationStatusEnum.PENDING}
              isError={isImageError}
            />
          </Grid2>
          <Grid2 size="grow">
            <ManageCardForm
              data={data!}
              onSubmit={handleSubmit}
              actions={actions}
            />
          </Grid2>
        </Grid2>
      )}
    </>
  );
}
