import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import LocationsTableRow from './LocationsTableRow';
import { ILocation } from '../../types/locations.interfaces';

type LocationsTableProps = {
  users: {
    data: ILocation;
    deleteStatus: MutationStatusEnum;
  }[];
  onDelete: (id: number) => void;
};

export default function LocationsTable({
  users,
  onDelete,
}: LocationsTableProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="users table" size={matches ? 'medium' : 'small'}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <LocationsTableRow
              key={user.data.id}
              location={user.data}
              deleteStatus={user.deleteStatus}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
