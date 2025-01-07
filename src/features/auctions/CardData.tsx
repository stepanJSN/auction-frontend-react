import { Grid2, List, SxProps, Typography } from '@mui/material';
import EpisodesList from '../card/EpisodesList';
import { ICard } from '../../types/cards.interface';

type CardDataProps = {
  data: ICard;
};

const episodesListStyles: SxProps = {
  maxHeight: 300,
  overflowY: 'auto',
};

export default function CardData({ data }: CardDataProps) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={3}>
        <img src={data.image_url} alt={data.name} />
      </Grid2>
      <Grid2 size="grow" container spacing={2}>
        <Grid2>
          <Typography variant="h4" gutterBottom>
            {data.name}
          </Typography>
          <Typography variant="h6">Gender: {data.gender}</Typography>
          {data.type && <Typography variant="h6">Type: {data.type}</Typography>}
          <Typography variant="h6">Location: {data.location.name}</Typography>
        </Grid2>
        <Grid2>
          <Typography variant="h6">Episodes with this card:</Typography>
          <List disablePadding sx={episodesListStyles}>
            {data.episodes.map((episode) => (
              <EpisodesList key={episode.id} name={episode.name} />
            ))}
          </List>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
