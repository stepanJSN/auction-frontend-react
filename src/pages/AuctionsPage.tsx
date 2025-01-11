import {
  Button,
  Grid2,
  IconButton,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import AuctionsFilters from '../features/auctions/AuctionsFilters';
import { useSelector } from 'react-redux';
import {
  getAuctions,
  selectAuctions,
  setPage,
} from '../features/auctions/AuctionsSlice';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import useAuctionsUpdateListener from '../features/auctions/useAuctionsUpdateListener';
import AuctionsGrid from '../features/auctions/AuctionsGrid';
import useFilterVisibility from '../features/auctions/useFilterVisibility';
import CloseIcon from '@mui/icons-material/Close';
import Pagination from '../components/Pagination';
import usePaginatedData from '../hooks/usePaginatedData';

const filterGridBreakpoints = {
  xs: 0,
  md: 3,
};

const auctionsGridBreakpoints = {
  xs: 12,
  md: 9,
};

const closeButtonStyles: SxProps = {
  alignSelf: 'flex-end',
};

export default function AuctionsPage() {
  const { auctions, status, totalPages, currentPage } =
    useSelector(selectAuctions);
  useAuctionsUpdateListener(auctions);
  const { isFilterOpen, handleFilterOpen, handleFilterClose, isMobileVersion } =
    useFilterVisibility();
  const handlePageChange = usePaginatedData(getAuctions, setPage);

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Typography variant="h4">Auctions</Typography>
        {isMobileVersion &&
          (isFilterOpen ? (
            <IconButton
              onClick={handleFilterClose}
              aria-label="close"
              sx={closeButtonStyles}>
              <CloseIcon />
            </IconButton>
          ) : (
            <Button
              onClick={handleFilterOpen}
              sx={closeButtonStyles}
              variant="outlined">
              Filters
            </Button>
          ))}
      </Stack>
      <Grid2 container spacing={2}>
        <Grid2 size={filterGridBreakpoints}>
          <AuctionsFilters isOpen={isFilterOpen} />
        </Grid2>
        <Grid2 container spacing={2} size={auctionsGridBreakpoints}>
          {status === QueryStatusEnum.LOADING && <PageLoader />}
          {status === QueryStatusEnum.ERROR && <PageError />}
          {status === QueryStatusEnum.SUCCESS && auctions.length !== 0 && (
            <>
              <AuctionsGrid auctions={auctions} />
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handleChange={handlePageChange}
              />
            </>
          )}
          {status === QueryStatusEnum.SUCCESS && auctions.length === 0 && (
            <Typography variant="h5" gutterBottom>
              There are no auctions available
            </Typography>
          )}
        </Grid2>
      </Grid2>
    </>
  );
}
