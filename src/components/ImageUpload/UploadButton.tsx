import { Button, CircularProgress, styled, SxProps } from '@mui/material';

type UploadButtonProps = {
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const buttonStyles: SxProps = {
  height: '100%',
  width: '100%',
};

export default function UploadButton({
  handleUpload,
  loading,
}: UploadButtonProps) {
  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        disabled={loading}
        sx={buttonStyles}>
        {loading ? <CircularProgress /> : 'Upload image'}
        <VisuallyHiddenInput
          type="file"
          onChange={handleUpload}
          multiple
          accept=".jpg, .jpeg, .png, .avif, .webp"
        />
      </Button>
    </>
  );
}
