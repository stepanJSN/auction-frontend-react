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
  locations: {
    data: ILocation;
    deleteStatus: MutationStatusEnum;
  }[];
  onDelete: (id: number) => void;
};

export default function LocationsTable({
  locations,
  onDelete,
}: LocationsTableProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="locations table" size={matches ? 'medium' : 'small'}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map((location) => (
            <LocationsTableRow
              key={location.data.id}
              location={location.data}
              deleteStatus={location.deleteStatus}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
