import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  SxProps,
} from '@mui/material';
import { IChatSummary } from '../../types/chats.interfaces';
import ChatsTableRow from './ChatsTableRow';

type ChatsTableProps = {
  chats: IChatSummary[];
};

const tableContainerStyles: SxProps = {
  mb: 1,
};

export default function ChatsTable({ chats }: ChatsTableProps) {
  return (
    <TableContainer component={Paper} sx={tableContainerStyles}>
      <Table aria-label="chats table">
        <TableBody>
          {chats.map((chat) => (
            <ChatsTableRow key={chat.id} chat={chat} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
