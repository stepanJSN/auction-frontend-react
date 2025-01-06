import { Stack, Button, SxProps } from '@mui/material';
import { Link } from 'react-router';
import { ROUTES } from '../../config/routesConfig';
import DebouncedInput from '../../components/DebouncedInput';

type EpisodeHeaderProps = {
  handleFilterEpisodesByName: (name: string) => void;
};

const episodesHeaderStyles: SxProps = {
  mb: 2,
};

export default function EpisodesHeader({
  handleFilterEpisodesByName,
}: EpisodeHeaderProps) {
  return (
    <Stack direction="row" spacing={2} sx={episodesHeaderStyles}>
      <DebouncedInput
        label="Episode name"
        handleDebouncedChange={handleFilterEpisodesByName}
      />
      <Button component={Link} to={ROUTES.CREATE_EPISODE} variant="outlined">
        Create episode
      </Button>
    </Stack>
  );
}
