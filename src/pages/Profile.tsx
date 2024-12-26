import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { FormWrapper } from '../components/FormWrapper';
import UpdateUserForm from '../features/users/UpdateUserForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  selectUser,
  updateUser,
} from '../features/users/userSlice';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import { AppDispatch } from '../redux/store';
import { useCallback, useEffect, useMemo } from 'react';
import { IUpdateUser } from '../types/userService.interfaces';
import { selectAuth } from '../features/auth/authSlice';
import { MutationStatusEnum } from '../enums/mutationStatus';
import useLogout from '../hooks/useLogout';

export default function Profile() {
  const { status, updateStatus, deleteStatus, name, surname, email } =
    useSelector(selectUser);
  const { id } = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();
  const logout = useLogout();

  const handleUpdate = useCallback(
    (data: IUpdateUser) => {
      if (id) {
        dispatch(updateUser({ id, data }));
      }
    },
    [dispatch, id],
  );

  const handleDelete = useCallback(() => {
    if (id) {
      dispatch(deleteUser(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (deleteStatus === MutationStatusEnum.SUCCESS) {
      logout();
    }
  }, [deleteStatus, logout]);
  const sx = useMemo(() => ({ minWidth: '400px' }), []);
  return (
    <Stack alignItems="center" pt={4}>
      <FormWrapper sx={sx}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Profile
        </Typography>
        {status === QueryStatusEnum.LOADING && (
          <Stack alignItems="center" justifyContent="center" minHeight="300px">
            <CircularProgress />
          </Stack>
        )}
        {updateStatus === MutationStatusEnum.SUCCESS && (
          <Alert severity="success">The profile was successfully updated</Alert>
        )}
        {updateStatus === MutationStatusEnum.ERROR && (
          <Alert severity="error">An error occurred during the update</Alert>
        )}
        {deleteStatus === MutationStatusEnum.ERROR && (
          <Alert severity="error">An error occurred while deleting</Alert>
        )}
        {status === QueryStatusEnum.SUCCESS && (
          <>
            <Typography variant="h6">Email: {email}</Typography>
            <UpdateUserForm
              isUpdating={updateStatus === MutationStatusEnum.PENDING}
              onSubmit={handleUpdate}
              name={name!}
              surname={surname!}
            />
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleDelete}
              disabled={deleteStatus === MutationStatusEnum.PENDING}>
              Delete profile
            </Button>
          </>
        )}
      </FormWrapper>
    </Stack>
  );
}
