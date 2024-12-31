import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { IUserSummary } from '../../types/user.interfaces';
import { Role } from '../../enums/role.enum';
import UsersTableRow from './UsersTableRow';

type UsersTableProps = {
  users: IUserSummary[];
  onDelete: (id: string) => void;
  onUpdateRole: (id: string, role: Role) => void;
};

export default function UsersTable({
  users,
  onDelete,
  onUpdateRole,
}: UsersTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name and surname</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UsersTableRow
              key={user.id}
              user={user}
              onDelete={onDelete}
              onUpdateRole={onUpdateRole}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
