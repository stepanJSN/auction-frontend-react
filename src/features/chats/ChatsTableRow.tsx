import {
  TableRow,
  TableCell,
  SxProps,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { IChatSummary } from '../../types/chats.interfaces';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../config/routesConfig';
import { useCallback } from 'react';

type ChatsTableRowProps = {
  chat: IChatSummary;
};

const tableRowStyles: SxProps = {
  '&:hover': {
    cursor: 'pointer',
    bgcolor: 'grey.200',
  },
};

export default function ChatsTableRow({ chat }: ChatsTableRowProps) {
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();

  const handleTableRowClick = useCallback(() => {
    navigate(ROUTES.CHAT(chat.id));
  }, [navigate, chat.id]);

  const cutMessage = useCallback(
    (message: string) => {
      const maxMessageLength = isBigScreen ? 50 : 20;
      if (message.length > maxMessageLength) {
        return message.slice(0, maxMessageLength) + '...';
      }
      return message;
    },
    [isBigScreen],
  );

  return (
    <TableRow onClick={handleTableRowClick} sx={tableRowStyles}>
      <TableCell>{chat.name}</TableCell>
      <TableCell>
        {chat.lastMessage
          ? `${chat.lastMessage.sender.is_this_user_message ? 'You' : chat.lastMessage.sender.name}: ${cutMessage(chat.lastMessage.message)} (${dayjs(chat.lastMessage.created_at).format('YYYY-MM-DD HH:mm')})`
          : 'No messages or last message was deleted'}
      </TableCell>
    </TableRow>
  );
}
