import { LinearProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageError from '../components/PageError';
import PageLoader from '../components/PageLoader';
import LocationsTable from '../features/locations/LocationsTable';
import { selectLocations } from '../features/locations/locationsSlice';
import useLocations from '../features/locations/useLocations';
import { Outlet } from 'react-router';
import LocationsHeader from '../features/locations/LocationsHeader';
import LoadMoreBtn from '../components/LoadMoreBtn';
import { LinearProgressPlaceholder } from '../components/LinearProgressPlaceholder';

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
      {status === QueryStatusEnum.LOADING && locations.length !== 0 && (
        <LinearProgress />
      )}
      {status === QueryStatusEnum.ERROR && <PageError />}
      {locations.length !== 0 && (
        <>
          {status === QueryStatusEnum.LOADING && <LinearProgress />}
          {status === QueryStatusEnum.SUCCESS && <LinearProgressPlaceholder />}
          <LocationsTable locations={locations} onDelete={handleDelete} />
          <LoadMoreBtn
            isLoading={status === QueryStatusEnum.LOADING}
            hasMore={hasMore}
            handleLoadMore={handleLoadMore}
          />
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
