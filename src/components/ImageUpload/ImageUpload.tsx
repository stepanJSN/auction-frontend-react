import { Box, IconButton, SxProps, Typography } from '@mui/material';
import UploadButton from './UploadButton';
import DeleteIcon from '@mui/icons-material/Delete';

type ImageUploadProps = {
  isPending: boolean;
  isError: boolean;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: () => void;
  imageUrl?: string;
};

const imageWrapperStyles: SxProps = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

const deleteButtonStyles: SxProps = {
  borderRadius: '50%',
  position: 'absolute',
  top: '3px',
  right: '5px',
};

export default function ImageUpload({
  isPending,
  handleUpload,
  handleDelete,
  imageUrl,
  isError,
}: ImageUploadProps) {
  return (
    <>
      {imageUrl ? (
        <Box sx={imageWrapperStyles}>
          <IconButton
            color="error"
            onClick={handleDelete}
            sx={deleteButtonStyles}
            disabled={isPending}>
            <DeleteIcon />
          </IconButton>
          <img src={imageUrl} alt="uploaded" />
        </Box>
      ) : (
        <>
          <UploadButton
            isLoading={isPending}
            handleUpload={handleUpload}
            isError={isError}
          />
          {isError && (
            <Typography color="error" variant="subtitle2">
              Image is required
            </Typography>
          )}
        </>
      )}
    </>
  );
}
