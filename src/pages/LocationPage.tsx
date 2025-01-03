import { useCallback } from 'react';
import {
  Button,
  LinearProgress,
  Stack,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageError from '../components/PageError';
import PageLoader from '../components/PageLoader';
import LocationsTable from '../features/locations/LocationsTable';
import { selectLocations } from '../features/locations/locationsSlice';
import useLocations from '../features/locations/useLocations';
import { Outlet } from 'react-router';
import { useDebounceCallback } from 'usehooks-ts';

const buttonContainerStyles: SxProps = {
  mt: 2,
};

const inputStyles: SxProps = {
  mb: 2,
};

export default function LocationsPage() {
  const { status, locations, hasMore } = useSelector(selectLocations);
  const { handleDelete, handleLoadMore, handleFilterLocationsByName } =
    useLocations();
  const debounced = useDebounceCallback(handleFilterLocationsByName, 500);

  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      debounced(event.target.value),
    [debounced],
  );
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Locations
      </Typography>
      <TextField
        label="Location name"
        onChange={handleFilterChange}
        size="small"
        sx={inputStyles}
      />
      {status === QueryStatusEnum.LOADING && locations.length === 0 && (
        <PageLoader />
      )}
      {status === QueryStatusEnum.ERROR && <PageError />}
      {locations.length !== 0 && (
        <>
          {status === QueryStatusEnum.LOADING && <LinearProgress />}
          <LocationsTable locations={locations} onDelete={handleDelete} />
          <Stack
            direction="row"
            justifyContent="center"
            sx={buttonContainerStyles}>
            <Button
              onClick={handleLoadMore}
              disabled={!hasMore}
              variant="contained">
              Load more
            </Button>
          </Stack>
        </>
      )}
      {locations.length === 0 && status === QueryStatusEnum.SUCCESS && (
        <Typography variant="h5" gutterBottom>
          There are no locations
        </Typography>
      )}
      <Outlet />
    </>
  );
}
