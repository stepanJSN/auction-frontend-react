import { Alert, Link, Snackbar, SnackbarOrigin, SxProps } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { ROUTES } from '../../config/routesConfig';

type NewMessageNotificationProps = {
  open: boolean;
  handleClose: () => void;
  sender: string;
  chatId: string;
};

const snackbarOrigin: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};

const linkStyles: SxProps = {
  color: 'common.white',
  fontWeight: 'bold',
  pl: 1,
  textDecoration: 'underline',
};

export default function NewMessageNotification({
  open,
  handleClose,
  sender,
  chatId,
}: NewMessageNotificationProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={snackbarOrigin}>
      <Alert onClose={handleClose} severity="success" variant="filled">
        {`New message from ${sender}`}
        <Link component={RouterLink} to={ROUTES.CHAT(chatId)} sx={linkStyles}>
          See message
        </Link>
      </Alert>
    </Snackbar>
  );
}
