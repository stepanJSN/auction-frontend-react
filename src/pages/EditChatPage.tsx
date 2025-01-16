import {
  Alert,
  Box,
  Button,
  CircularProgress,
  SxProps,
  Typography,
} from '@mui/material';
import ModalPage from '../components/ModalPage';
import ManageChatForm from '../features/chats/ManageChatForm';
import { useMemo } from 'react';
import { MutationStatusEnum } from '../enums/mutationStatus';
import useErrorMessage from '../hooks/useErrorMessage';
import { manageChatErrorMessages } from '../features/chats/manageChatErrorMessages';
import useUpdateChat from '../features/chats/update/useUpdateChat';
import { useSelector } from 'react-redux';
import { selectChat } from '../features/chats/chat/chatSlice';
import { useParams } from 'react-router';

const pageInnerWrapper: SxProps = {
  p: 2,
  minWidth: {
    xs: 'none',
    sm: 450,
  },
};

const alertStyles: SxProps = {
  mb: 1,
};

export default function EditChatPage() {
  const { chatId } = useParams();
  const { name, participants, updateStatus, updateErrorCode } =
    useSelector(selectChat);
  const getErrorMessage = useErrorMessage(manageChatErrorMessages);
  const { handleUpdate } = useUpdateChat(chatId);

  const actions = useMemo(
    () => (
      <Button
        disabled={updateStatus === MutationStatusEnum.PENDING}
        type="submit"
        variant="contained">
        {updateStatus === MutationStatusEnum.PENDING ? 'Updating...' : 'Update'}
      </Button>
    ),
    [updateStatus],
  );

  return (
    <ModalPage>
      <Box sx={pageInnerWrapper}>
        <Typography variant="h5" gutterBottom>
          Edit chat
        </Typography>
        {(updateStatus === MutationStatusEnum.IDLE ||
          updateStatus === MutationStatusEnum.PENDING) && (
          <Alert severity="info" sx={alertStyles}>
            Chat with more than 2 participants should have a name
          </Alert>
        )}
        {updateStatus === MutationStatusEnum.ERROR && (
          <Alert severity="error" sx={alertStyles}>
            {getErrorMessage(updateErrorCode)}
          </Alert>
        )}
        {updateStatus === MutationStatusEnum.SUCCESS && (
          <Alert severity="success" sx={alertStyles}>
            Chat updated successfully
          </Alert>
        )}
        {name && participants ? (
          <ManageChatForm
            onSubmit={handleUpdate}
            actions={actions}
            name={name!}
            participants={participants}
          />
        ) : (
          <CircularProgress />
        )}
      </Box>
    </ModalPage>
  );
}
