import { useMemo, useCallback, useState } from 'react';
import { Alert, Grid2, SxProps, Typography } from '@mui/material';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import useImage from '../hooks/useImage';
import ManageCardForm from '../features/cards/ManageCardForm';
import useMutation from '../hooks/useMutation';
import { ICreateCard } from '../types/cards.interface';
import { cardsService } from '../services/cardsService';
import { MutationStatusEnum } from '../enums/mutationStatus';
import useErrorMessage from '../hooks/useErrorMessage';
import { createCardErrorMessages } from '../features/cards/createImageErrorMessages';

const alertStyles: SxProps = {
  mb: 1,
};

export default function CreateCardPage() {
  const { image, handleDelete, handleUpload } = useImage();
  const [isImageError, setIsImageError] = useState(false);
  const getErrorMessage = useErrorMessage(createCardErrorMessages);
  const { mutate, status, errorCode } = useMutation(
    (data: { cardData: ICreateCard; image: Blob }) => {
      return cardsService.create(data.cardData, data.image);
    },
  );

  const handleSubmit = useCallback(
    (data: ICreateCard) => {
      if (image) {
        mutate({ cardData: data, image: image.image });
      } else {
        setIsImageError(true);
      }
    },
    [image, mutate],
  );
  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsImageError(false);
      handleUpload(event);
    },
    [handleUpload],
  );

  const sx = useMemo(() => ({ height: '300px' }), []);
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create Card
      </Typography>
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
        <Grid2 size={3} sx={sx}>
          <ImageUpload
            imageUrl={image?.url}
            handleDelete={handleDelete}
            handleUpload={handleImageUpload}
            isPending={status === MutationStatusEnum.PENDING}
            isError={isImageError}
          />
        </Grid2>
        <Grid2 size="grow">
          <ManageCardForm
            onSubmit={handleSubmit}
            isPending={status === MutationStatusEnum.PENDING}
          />
        </Grid2>
      </Grid2>
    </>
  );
}
