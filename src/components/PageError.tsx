import { Alert, AlertTitle, SxProps } from '@mui/material';

const alertStyles: SxProps = {
  mb: 1,
  width: '100%',
  height: 'max-content',
};

export default function PageError() {
  return (
    <Alert severity="error" sx={alertStyles}>
      <AlertTitle>Error</AlertTitle>
      Something went wrong ):
    </Alert>
  );
}
