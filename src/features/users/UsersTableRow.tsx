import {
  TableRow,
  TableCell,
  Stack,
  Button,
  SxProps,
  SnackbarOrigin,
} from '@mui/material';
import { useCallback } from 'react';
import { Role } from '../../enums/role.enum';
import { IUserSummary } from '../../types/user.interfaces';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import Notification from '../../components/Notification';

type UsersTableRowProps = {
  user: IUserSummary;
  updateStatus: MutationStatusEnum;
  deleteStatus: MutationStatusEnum;
  onDelete: (id: string) => void;
  onUpdateRole: (id: string, role: Role) => void;
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

export default function UsersTableRow({
  user,
  updateStatus,
  deleteStatus,
  onDelete,
  onUpdateRole,
}: UsersTableRowProps) {
  const handleRoleUpdate = useCallback(
    () =>
      onUpdateRole(user.id, user.role === Role.USER ? Role.ADMIN : Role.USER),
    [onUpdateRole, user.id, user.role],
  );
  const handleDelete = useCallback(
    () => onDelete(user.id),
    [onDelete, user.id],
  );

  return (
    <>
      <TableRow sx={rowStyles}>
        <TableCell component="th" scope="row">
          {`${user.name} ${user.surname}`}
        </TableCell>
        <TableCell align="right">{user.role}</TableCell>
        <TableCell align="right">{user.rating >= 0 && user.rating}</TableCell>
        <TableCell align="right">
          <Stack
            component={'span'}
            direction="row"
            spacing={2}
            sx={buttonsContainerStyles}>
            <Button
              variant="outlined"
              onClick={handleRoleUpdate}
              disabled={updateStatus === MutationStatusEnum.PENDING}>
              Make {user.role === Role.USER ? 'admin' : 'user'}
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
      <Notification
        open={updateStatus === MutationStatusEnum.ERROR}
        severity="error"
        message={`Failed to change the role of ${user.name}, something went wrong`}
        anchorOrigin={notificationPosition}
      />
      <Notification
        open={deleteStatus === MutationStatusEnum.ERROR}
        message={`Failed to delete ${user.name}, something went wrong`}
        severity="error"
        anchorOrigin={notificationPosition}
      />
    </>
  );
}
