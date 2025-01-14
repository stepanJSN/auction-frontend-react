import { Divider, Typography } from '@mui/material';

type ChatHeaderProps = {
  name: string;
  numberOfParticipants: number;
};

export default function ChatHeader({
  name,
  numberOfParticipants,
}: ChatHeaderProps) {
  return (
    <>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="subtitle1">
        Number of participants: {numberOfParticipants}
      </Typography>
      <Divider />
    </>
  );
}
