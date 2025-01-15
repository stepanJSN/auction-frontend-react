import { useCallback, useMemo } from 'react';
import {
  IconButton,
  ListItem,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { MessageState } from './chatSlice';
import { MutationStatusEnum } from '../../../enums/mutationStatus';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

const messageHeaderStyles: SxProps = {
  alignItems: 'center',
};
const senderNameStyles: SxProps = {
  fontWeight: 'bold',
};

type MessageProps = {
  message: MessageState;
  onDelete: (messageId: string) => void;
  onResend: (messageId: string) => void;
};

export default function Message({ message, onDelete, onResend }: MessageProps) {
  const handleDelete = useCallback(() => {
    if (!message.id) return;
    onDelete(message.id);
  }, [onDelete, message.id]);

  const handleResend = useCallback(() => {
    if (!message.id) return;
    onResend(message.id);
  }, [onResend, message.id]);

  const messageStyles: SxProps = useMemo(
    () => ({
      bgcolor: message.sender.is_this_user_message
        ? 'success.main'
        : 'primary.main',
      p: 1.5,
      borderRadius: 2,
      color: 'common.white',
      minWidth: '30%',
      maxWidth: '50%',
    }),
    [message.sender.is_this_user_message],
  );

  const listItemStyles: SxProps = useMemo(
    () => ({
      justifyContent: message.sender.is_this_user_message
        ? 'flex-end'
        : 'flex-start',
    }),
    [message.sender.is_this_user_message],
  );

  return (
    <ListItem sx={listItemStyles}>
      <Stack sx={messageStyles}>
        <Stack direction="row" sx={messageHeaderStyles} spacing={1}>
          <Typography sx={senderNameStyles}>
            {message.sender.is_this_user_message
              ? 'You'
              : `${message.sender.name} ${message.sender.surname}`}
          </Typography>
          <Typography variant="caption">
            {message.creationStatus === MutationStatusEnum.PENDING &&
              'Sending...'}
            {message.creationStatus === MutationStatusEnum.ERROR && 'Error'}
            {message.creationStatus === MutationStatusEnum.SUCCESS &&
              dayjs(message.created_at).format('DD.MM.YYYY HH:mm')}
          </Typography>
          {message.sender.is_this_user_message &&
            message.creationStatus === MutationStatusEnum.SUCCESS && (
              <IconButton
                disabled={message.deletionStatus === MutationStatusEnum.PENDING}
                aria-label="delete"
                size="small"
                color="error"
                onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            )}
          {message.sender.is_this_user_message &&
            message.creationStatus === MutationStatusEnum.ERROR && (
              <IconButton
                aria-label="resend"
                size="small"
                color="error"
                onClick={handleResend}>
                <RefreshIcon />
              </IconButton>
            )}
        </Stack>
        {message.message}
      </Stack>
    </ListItem>
  );
}
