import { ListItem, ListItemIcon, ListItemText, SxProps } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

type EpisodesListProps = {
  name: string;
};

const listItemIconStyles: SxProps = {
  minWidth: 25,
};

const iconStyles: SxProps = {
  width: 15,
  height: 15,
};

export default function EpisodesList({ name }: EpisodesListProps) {
  return (
    <ListItem dense>
      <ListItemIcon sx={listItemIconStyles}>
        <CircleIcon sx={iconStyles} />
      </ListItemIcon>
      <ListItemText>{name}</ListItemText>
    </ListItem>
  );
}
