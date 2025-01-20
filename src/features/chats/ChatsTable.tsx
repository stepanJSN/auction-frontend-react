import { Table, TableBody } from '@mui/material';
import { IChatSummary } from '../../types/chats.interfaces';
import ChatsTableRow from './ChatsTableRow';
import TableContainer from '../../components/TableContainer';

type ChatsTableProps = {
  chats: IChatSummary[];
};

export default function ChatsTable({ chats }: ChatsTableProps) {
  return (
    <TableContainer>
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
