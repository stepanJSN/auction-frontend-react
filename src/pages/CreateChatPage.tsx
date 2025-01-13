import { Alert, Box, Button, SxProps, Typography } from '@mui/material';
import ModalPage from '../components/ModalPage';
import ManageChatForm from '../features/chats/ManageChatForm';
import { useMemo } from 'react';
import useCreateChat from '../features/chats/create/useCreateChat';
import { MutationStatusEnum } from '../enums/mutationStatus';
import useErrorMessage from '../hooks/useErrorMessage';
import { manageChatErrorMessages } from '../features/chats/manageChatErrorMessages';

const pageInnerWrapper: SxProps = {
  p: 2,
  minWidth: {
    xs: 'none',
    sm: 350,
  },
};

const alertStyles: SxProps = {
  mb: 1,
};

export default function CreateChatPage() {
  const { handleCreate, errorCode, creationStatus } = useCreateChat();
  const getErrorMessage = useErrorMessage(manageChatErrorMessages);

  const actions = useMemo(
    () => (
      <Button
        disabled={
          creationStatus === MutationStatusEnum.PENDING ||
          creationStatus === MutationStatusEnum.SUCCESS
        }
        type="submit"
        variant="contained">
        {creationStatus === MutationStatusEnum.PENDING
          ? 'Creating...'
          : 'Create'}
      </Button>
    ),
    [creationStatus],
  );

  return (
    <ModalPage>
      <Box sx={pageInnerWrapper}>
        <Typography variant="h5" gutterBottom>
          Create chat
        </Typography>
        {creationStatus === MutationStatusEnum.IDLE && (
          <Alert severity="info" sx={alertStyles}>
            Chat with more than 2 participants should have a name
          </Alert>
        )}
        {creationStatus === MutationStatusEnum.ERROR && (
          <Alert severity="error" sx={alertStyles}>
            {getErrorMessage(errorCode)}
          </Alert>
        )}
        {creationStatus === MutationStatusEnum.SUCCESS && (
          <Alert severity="success" sx={alertStyles}>
            Chat created successfully
          </Alert>
        )}
        <ManageChatForm onSubmit={handleCreate} actions={actions} />
      </Box>
    </ModalPage>
  );
}
