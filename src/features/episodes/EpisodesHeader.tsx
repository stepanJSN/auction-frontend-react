import { Stack, Button, SxProps } from '@mui/material';
import { Link } from 'react-router';
import { ROUTES } from '../../config/routesConfig';
import DebouncedInput from '../../components/DebouncedInput';
import { ResponsiveStyleValue } from '@mui/system';

type EpisodeHeaderProps = {
  handleFilterEpisodesByName: (name: string) => void;
};

const episodesHeaderStyles: SxProps = {
  mb: 2,
};

const episodesHeaderFlexDirection: ResponsiveStyleValue<
  'row' | 'row-reverse' | 'column' | 'column-reverse'
> = {
  xs: 'column',
  sm: 'row',
};

export default function EpisodesHeader({
  handleFilterEpisodesByName,
}: EpisodeHeaderProps) {
  return (
    <Stack
      direction={episodesHeaderFlexDirection}
      spacing={1}
      sx={episodesHeaderStyles}>
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
