import {
  Grid2,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  Stack,
  Chip,
  SxProps,
} from '@mui/material';
import EpisodesList from './EpisodesList';

type CardDataProps = {
  imageUrl: string;
  name: string;
  gender: string;
  type: string;
  isCreatedByAdmin: boolean;
  isActive: boolean;
  location: {
    name: string;
  };
  episodes: {
    id: number;
    name: string;
  }[];
};

const imgContainerStyles: SxProps = {
  alignSelf: 'stretch',
};
const cardTitleStyles: SxProps = {
  typography: 'h4',
};

export default function CardData({
  imageUrl,
  name,
  gender,
  type,
  location,
  episodes,
  isCreatedByAdmin,
  isActive,
}: CardDataProps) {
  return (
    <Grid2 container>
      <Grid2 size={5} sx={imgContainerStyles}>
        <img
          src={imageUrl}
          alt={name}
          width="100%"
          height="100%"
          style={{
            minHeight: 200,
            minWidth: 200,
          }}
        />
      </Grid2>
      <Grid2 size={7}>
        <DialogTitle sx={cardTitleStyles}>{name}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Gender: {gender}</Typography>
          <Typography variant="subtitle1">Type: {type}</Typography>
          <Typography variant="subtitle1">Location: {location.name}</Typography>
          <Typography variant="subtitle1">Episodes with this card:</Typography>
          <List disablePadding>
            {episodes.map((episode) => (
              <EpisodesList key={episode.id} name={episode.name} />
            ))}
          </List>
          <Stack direction="row" spacing={1}>
            {isCreatedByAdmin && (
              <Chip label="Created by admin" color="primary" />
            )}
            {isActive ? (
              <Chip label="active" color="success" />
            ) : (
              <Chip label="inactive" color="error" />
            )}
          </Stack>
        </DialogContent>
      </Grid2>
    </Grid2>
  );
}
