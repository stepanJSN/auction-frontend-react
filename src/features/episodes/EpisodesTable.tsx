import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import EpisodesTableRow from './EpisodesTableRow';
import { IEpisode } from '../../types/episodes.interfaces';
import TableContainer from '../../components/TableContainer';

type EpisodesTableProps = {
  episodes: {
    data: IEpisode;
    deleteStatus: MutationStatusEnum;
  }[];
  onDelete: (id: number) => void;
};

export default function EpisodesTable({
  episodes,
  onDelete,
}: EpisodesTableProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <TableContainer>
      <Table aria-label="episodes table" size={matches ? 'medium' : 'small'}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Code</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {episodes.map((episode) => (
            <EpisodesTableRow
              key={episode.data.id}
              episode={episode.data}
              deleteStatus={episode.deleteStatus}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
