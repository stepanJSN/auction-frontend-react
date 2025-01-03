import { Alert, Grid2, SxProps, Typography } from '@mui/material';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import useImage from '../hooks/useImage';
import ManageCardForm from '../features/cards/ManageCardForm';
import { MutationStatusEnum } from '../enums/mutationStatus';
import useErrorMessage from '../hooks/useErrorMessage';
import { createCardErrorMessages } from '../features/cards/createImageErrorMessages';
import useCreateCard from '../features/cards/useCreateCard';

const alertStyles: SxProps = {
  mb: 1,
};

const imageContainerStyles: SxProps = {
  height: '300px',
};

export default function CreateCardPage() {
  const { image, handleDelete, handleUpload, isImageError, setIsImageError } =
    useImage();
  const getErrorMessage = useErrorMessage(createCardErrorMessages);
  const { handleSubmit, status, errorCode } = useCreateCard(
    setIsImageError,
    image?.image,
  );

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
        <Grid2 size={3} sx={imageContainerStyles}>
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
            isPending={status === MutationStatusEnum.PENDING}
          />
        </Grid2>
      </Grid2>
    </>
  );
}
