import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import { FormWrapper } from '../components/FormWrapper';
import UpdateUserForm from '../features/user/UpdateUserForm';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import { MutationStatusEnum } from '../enums/mutationStatus';
import useDeleteUser from '../features/user/useDeleteUser';
import useUpdateUser from '../features/user/useUpdateUser';

const formWrapperStyles: SxProps = {
  minWidth: '340px',
  position: 'relative',
};

const alertStyles: SxProps = {
  position: 'absolute',
  width: '100%',
  top: '10px',
  left: '0',
};

export default function Profile() {
  const { status, updateStatus, deleteStatus, name, surname, email } =
    useSelector(selectUser);
  const { id } = useSelector(selectUser);
  const handleDelete = useDeleteUser(id!, deleteStatus);
  const handleUpdate = useUpdateUser(id!);

  return (
    <Stack alignItems="center" pt={4}>
      <FormWrapper sx={formWrapperStyles}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Profile
        </Typography>
        {status === QueryStatusEnum.LOADING && (
          <Stack alignItems="center" justifyContent="center" minHeight="300px">
            <CircularProgress />
          </Stack>
        )}
        {updateStatus === MutationStatusEnum.SUCCESS && (
          <Alert sx={alertStyles} severity="success">
            The profile was successfully updated
          </Alert>
        )}
        {updateStatus === MutationStatusEnum.ERROR && (
          <Alert sx={alertStyles} severity="error">
            An error occurred during the update
          </Alert>
        )}
        {deleteStatus === MutationStatusEnum.ERROR && (
          <Alert sx={alertStyles} severity="error">
            An error occurred while deleting
          </Alert>
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
