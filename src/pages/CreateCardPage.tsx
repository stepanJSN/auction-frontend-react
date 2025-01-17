import { useCallback, useEffect, useMemo } from 'react';
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
import { createCardErrorMessages } from '../features/cards/createCardErrorMessages';
import useCreateCard from '../features/cards/useCreateCard';
import { ICreateCard } from '../types/cards.interface';

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
  const { image, handleDelete, handleUpload, isImageError, setIsImageError } =
    useImage();
  const getErrorMessage = useErrorMessage(createCardErrorMessages);
  const { createCard, status, errorCode } = useCreateCard();

  useEffect(() => {
    if (status === MutationStatusEnum.SUCCESS) {
      handleDelete();
    }
  }, [handleDelete, status]);

  const handleSubmit = useCallback(
    (data: ICreateCard) => {
      if (image?.image) {
        createCard(data, image.image);
      } else {
        setIsImageError(true);
      }
    },
    [createCard, image, setIsImageError],
  );

  const actions = useMemo(
    () => (
      <Button
        type="submit"
        variant="contained"
        disabled={status === MutationStatusEnum.PENDING}>
        {status === MutationStatusEnum.PENDING ? 'Creating...' : 'Create'}
      </Button>
    ),
    [status],
  );
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create Card
      </Typography>
      {status !== MutationStatusEnum.ERROR &&
        status !== MutationStatusEnum.SUCCESS && (
          <Alert severity="info" sx={alertStyles}>
            Note: you can create a card only if all cards from api were sold
          </Alert>
        )}
      {status === MutationStatusEnum.ERROR && (
        <Alert severity="error" sx={alertStyles}>
          {getErrorMessage(errorCode)}
        </Alert>
      )}
      {status === MutationStatusEnum.SUCCESS && (
        <Alert severity="success" sx={alertStyles}>
          Card created successfully
        </Alert>
      )}
      <Grid2 container spacing={3}>
        <Grid2 size={imageBreakpoints} sx={imageContainerStyles}>
          <ImageUpload
            imageUrl={image?.url}
            handleDelete={handleDelete}
            handleUpload={handleUpload}
            isPending={status === MutationStatusEnum.PENDING}
            isError={isImageError}
          />
        </Grid2>
        <Grid2 size="grow">
          <ManageCardForm
            onSubmit={handleSubmit}
            actions={actions}
            isSubmitSuccessful={status === MutationStatusEnum.SUCCESS}
          />
        </Grid2>
      </Grid2>
    </>
  );
}
