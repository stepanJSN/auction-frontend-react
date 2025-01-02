import { Alert, Snackbar, SnackbarOrigin, SxProps } from '@mui/material';

type NotificationProps = {
  open: boolean;
  severity?: 'success' | 'error' | 'info' | 'warning';
  message: string;
  anchorOrigin?: SnackbarOrigin;
};

const alertStyles: SxProps = {
  width: '100%',
};

export default function Notification({
  open,
  severity = 'success',
  message,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
}: NotificationProps) {
  return (
    <Snackbar open={open} anchorOrigin={anchorOrigin}>
      <Alert severity={severity} variant="filled" sx={alertStyles}>
        {message}
      </Alert>
    </Snackbar>
  );
}
