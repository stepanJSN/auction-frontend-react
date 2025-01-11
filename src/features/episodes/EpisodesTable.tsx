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
  SxProps,
} from '@mui/material';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import EpisodesTableRow from './EpisodesTableRow';
import { IEpisode } from '../../types/episodes.interfaces';

type EpisodesTableProps = {
  episodes: {
    data: IEpisode;
    deleteStatus: MutationStatusEnum;
  }[];
  onDelete: (id: number) => void;
};

const tableContainerStyles: SxProps = {
  mb: 1,
};

export default function EpisodesTable({
  episodes,
  onDelete,
}: EpisodesTableProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <TableContainer component={Paper} sx={tableContainerStyles}>
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
