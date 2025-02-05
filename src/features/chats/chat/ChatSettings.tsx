import {
  Alert,
  Button,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import { ChatState } from './chatSlice';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef } from 'react';
import useDeleteChat from '../delete/useDeleteChat';
import { MutationStatusEnum } from '../../../enums/mutationStatus';
import { Link } from 'react-router';

const mainContainerStyles: SxProps = {
  height: '100%',
  position: {
    xs: 'absolute',
    md: 'static',
  },
  right: 0,
  top: -1,
  backgroundColor: 'common.white',
  minWidth: '300px',
  padding: 2,
  zIndex: 1,
};
const listStyles: SxProps = {
  flex: 'auto',
};
const closeIconStyles: SxProps = {
  alignSelf: 'flex-start',
};

type ChatSettingsProps = {
  participants: ChatState['participants'];
  chatId: string;
  isOpen: boolean;
  isMobileVersion: boolean;
  onClose: () => void;
};

export default forwardRef(function ChatSettings(
  { participants, isOpen, isMobileVersion, onClose, chatId }: ChatSettingsProps,
  ref,
) {
  const { handleDelete, deleteStatus } = useDeleteChat(chatId);
  const isDeleting = deleteStatus === MutationStatusEnum.PENDING;

  return (
    <Grow ref={ref} in={isOpen}>
      <Stack sx={mainContainerStyles}>
        {isMobileVersion && (
          <IconButton
            aria-label="Close settings"
            onClick={onClose}
            sx={closeIconStyles}>
            <CloseIcon />
          </IconButton>
        )}
        <Typography variant="h6">Participants</Typography>
        <List sx={listStyles}>
          {participants.map((participant) => (
            <ListItem key={participant.id}>
              <ListItemText primary={participant.name} />
            </ListItem>
          ))}
        </List>
        <Stack spacing={1}>
          {deleteStatus === MutationStatusEnum.ERROR && (
            <Alert severity="error">
              Failed to delete chat. Something went wrong
            </Alert>
          )}
          <Button variant="contained" fullWidth component={Link} to="./edit">
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={isDeleting}
            fullWidth
            onClick={handleDelete}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </Stack>
      </Stack>
    </Grow>
  );
});
