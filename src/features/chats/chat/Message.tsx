import { useMemo } from 'react';
import { ListItem, Stack, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { MessageState } from './chatSlice';
import { MutationStatusEnum } from '../../../enums/mutationStatus';

const messageHeaderStyles: SxProps = {
  alignItems: 'flex-end',
};
const senderNameStyles: SxProps = {
  fontWeight: 'bold',
};

type MessageProps = {
  message: MessageState;
};

export default function Message({ message }: MessageProps) {
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
            {message.creationStatus === MutationStatusEnum.PENDING
              ? 'Sending...'
              : dayjs(message.created_at).format('DD.MM.YYYY HH:mm')}
          </Typography>
        </Stack>
        {message.message}
      </Stack>
    </ListItem>
  );
}
