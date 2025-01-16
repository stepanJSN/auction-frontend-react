import { Button, Divider, Grid2, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

type ChatHeaderProps = {
  name: string;
  numberOfParticipants: number;
  isOpenSettingsButtonShown: boolean;
  onSettingsButtonClick: () => void;
};

export default function ChatHeader({
  name,
  numberOfParticipants,
  isOpenSettingsButtonShown,
  onSettingsButtonClick,
}: ChatHeaderProps) {
  return (
    <>
      <Grid2 container>
        <Grid2 size="grow">
          <Typography variant="h4">{name}</Typography>
          <Typography variant="subtitle1">
            Number of participants: {numberOfParticipants}
          </Typography>
        </Grid2>
        {isOpenSettingsButtonShown && (
          <Grid2>
            <Button variant="contained" onClick={onSettingsButtonClick}>
              <SettingsIcon />
            </Button>
          </Grid2>
        )}
      </Grid2>
      <Divider />
    </>
  );
}
