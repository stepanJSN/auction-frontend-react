import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import { ChatState } from './chatSlice';

const mainContainerStyles: SxProps = {
  height: '100%',
};
const listStyles: SxProps = {
  flex: 'auto',
};

type ChatSettingsProps = {
  participants: ChatState['participants'];
  chatId: string;
};

export default function ChatSettings({ participants }: ChatSettingsProps) {
  return (
    <Stack sx={mainContainerStyles}>
      <Typography variant="h6">Participants</Typography>
      <List sx={listStyles}>
        {participants.map((participant) => (
          <ListItem key={participant.id}>
            <ListItemText primary={participant.name} />
          </ListItem>
        ))}
      </List>
      <Stack spacing={1}>
        <Button variant="contained" fullWidth>
          Edit
        </Button>
        <Button variant="contained" color="error" fullWidth>
          Delete
        </Button>
      </Stack>
    </Stack>
  );
}
