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
  isUserHaveThisCard: boolean;
  isActive: boolean;
  location: {
    name: string;
  };
  episodes: {
    id: number;
    name: string;
  }[];
};

const containerStyles: SxProps = {
  minWidth: {
    xs: 'none',
    sm: 700,
  },
};
const imgContainerStyles: SxProps = {
  alignSelf: 'stretch',
  minHeight: 200,
  minWidth: 200,
};
const cardTitleStyles: SxProps = {
  typography: 'h4',
};

const episodesListStyles: SxProps = {
  maxHeight: 200,
  overflowY: 'auto',
  mb: 1,
};

const imgContainerColumns = {
  xs: 12,
  sm: 5,
};
const textColumns = {
  xs: 12,
  sm: 7,
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
  isUserHaveThisCard,
}: CardDataProps) {
  return (
    <Grid2 container sx={containerStyles}>
      <Grid2 size={imgContainerColumns} sx={imgContainerStyles}>
        <img src={imageUrl} alt={name} />
      </Grid2>
      <Grid2 size={textColumns}>
        <DialogTitle sx={cardTitleStyles}>{name}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Gender: {gender}</Typography>
          {type && <Typography variant="subtitle1">Type: {type}</Typography>}
          <Typography variant="subtitle1">Location: {location.name}</Typography>
          <Typography variant="subtitle1">Episodes with this card:</Typography>
          <List disablePadding sx={episodesListStyles}>
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
            {isUserHaveThisCard && (
              <Chip label="You have this card" color="success" />
            )}
          </Stack>
        </DialogContent>
      </Grid2>
    </Grid2>
  );
}
