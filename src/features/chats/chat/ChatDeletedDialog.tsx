import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../config/routesConfig';

type ChatDeletedDialogProps = {
  open: boolean;
};

export default function ChatDeletedDialog({ open }: ChatDeletedDialogProps) {
  const navigate = useNavigate();
  const handleClose = useCallback(() => {
    navigate(ROUTES.CHATS);
  }, [navigate]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="chat-deleted-dialog-title"
      aria-describedby="chat-deleted-dialog-description">
      <DialogTitle id="chat-deleted-dialog-title">Chat was deleted</DialogTitle>
      <DialogContent>
        <DialogContentText id="chat-deleted-dialog-description">
          The chat was deleted by some participant
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
