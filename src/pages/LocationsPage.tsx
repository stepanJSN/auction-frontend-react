import {
  Button,
  LinearProgress,
  Stack,
  SxProps,
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
import LocationsHeader from '../features/locations/LocationsHeader';

const buttonContainerStyles: SxProps = {
  mt: 2,
};

export default function LocationsPage() {
  const { status, locations, hasMore } = useSelector(selectLocations);
  const { handleDelete, handleLoadMore, handleFilterLocationsByName } =
    useLocations();
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Locations
      </Typography>
      <LocationsHeader
        handleFilterLocationsByName={handleFilterLocationsByName}
      />
      {status === QueryStatusEnum.LOADING && locations.length === 0 && (
        <PageLoader />
      )}
      {status === QueryStatusEnum.ERROR && <PageError />}
      {locations.length !== 0 && (
        <>
          <LocationsTable locations={locations} onDelete={handleDelete} />
          {status === QueryStatusEnum.LOADING && <LinearProgress />}
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
