import { Alert, AlertTitle } from '@mui/material';

export default function PageError() {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      Something went wrong ):
    </Alert>
  );
}
