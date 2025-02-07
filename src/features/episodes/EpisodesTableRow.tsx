import {
  TableRow,
  TableCell,
  Stack,
  Button,
  SxProps,
  SnackbarOrigin,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useCallback } from 'react';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import Notification from '../../components/Notification';
import DeleteIcon from '@mui/icons-material/Delete';
import { IEpisode } from '../../types/episodes.interfaces';
import { Link } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import { ROUTES } from '../../config/routesConfig';

type EpisodesTableRowProps = {
  episode: IEpisode;
  deleteStatus: MutationStatusEnum;
  onDelete: (id: number) => void;
};

const rowStyles: SxProps = {
  '&:last-child td, &:last-child th': { border: 0 },
};
const buttonsContainerStyles: SxProps = {
  justifyContent: 'flex-end',
};

const notificationPosition: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'center',
};

export default function EpisodesTableRow({
  episode,
  deleteStatus,
  onDelete,
}: EpisodesTableRowProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const handleDelete = useCallback(
    () => onDelete(episode.id),
    [onDelete, episode.id],
  );

  return (
    <>
      <TableRow sx={rowStyles}>
        <TableCell component="th" scope="row">
          {episode.name}
        </TableCell>
        <TableCell>{episode.code}</TableCell>
        <TableCell align="right">
          <Stack
            component={'span'}
            direction="row"
            spacing={1}
            sx={buttonsContainerStyles}>
            <Button
              variant="outlined"
              component={Link}
              to={ROUTES.EDIT_EPISODE(episode.id)}>
              {matches ? 'Edit' : <EditIcon />}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              disabled={deleteStatus === MutationStatusEnum.PENDING}>
              {matches ? 'Delete' : <DeleteIcon />}
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
      <Notification
        open={deleteStatus === MutationStatusEnum.ERROR}
        message={`Failed to delete ${episode.name}, something went wrong`}
        severity="error"
        anchorOrigin={notificationPosition}
      />
    </>
  );
}
