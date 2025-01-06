import { Stack, Button, SxProps } from '@mui/material';
import { Link } from 'react-router';
import { ROUTES } from '../../config/routesConfig';
import DebouncedInput from '../../components/DebouncedInput';

type LocationHeaderProps = {
  handleFilterLocationsByName: (name: string) => void;
};

const locationsHeaderStyles: SxProps = {
  mb: 2,
};

export default function LocationsHeader({
  handleFilterLocationsByName,
}: LocationHeaderProps) {
  return (
    <Stack direction="row" spacing={2} sx={locationsHeaderStyles}>
      <DebouncedInput
        label="Location name"
        handleDebouncedChange={handleFilterLocationsByName}
      />
      <Button component={Link} to={ROUTES.CREATE_LOCATION} variant="outlined">
        Create location
      </Button>
    </Stack>
  );
}
