import { useMemo, useCallback, useState } from 'react';
import { Grid2, Typography } from '@mui/material';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import useImage from '../hooks/useImage';
import ManageCardForm from '../features/card/ManageCardForm';
import useMutation from '../hooks/useMutation';
import { ICreateCard } from '../types/cards.interface';
import { cardsService } from '../services/cardsService';
import { MutationStatusEnum } from '../enums/mutationStatus';

export default function CreateCardPage() {
  const { image, handleDelete, handleUpload } = useImage();
  const [isImageError, setIsImageError] = useState(false);
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
        <Typography color="error">{errorCode}</Typography>
      )}
      {status === MutationStatusEnum.SUCCESS && (
        <Typography color="success">Card created successfully</Typography>
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
