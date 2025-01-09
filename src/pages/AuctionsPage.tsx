import {
  Button,
  Grid2,
  IconButton,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import AuctionsFilters from '../features/auctions/AuctionsFilters';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuctions,
  selectAuctions,
} from '../features/auctions/AuctionsSlice';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import { useEffect } from 'react';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import useAuctionsUpdateListener from '../features/auctions/useAuctionsUpdateListener';
import AuctionsGrid from '../features/auctions/AuctionsGrid';
import useFilterVisibility from '../features/auctions/useFilterVisibility';
import CloseIcon from '@mui/icons-material/Close';

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
  const { auctions, status } = useSelector(selectAuctions);
  const dispatch = useDispatch();
  useAuctionsUpdateListener(auctions);
  const { isFilterOpen, handleFilterOpen, handleFilterClose, isMobileVersion } =
    useFilterVisibility();

  useEffect(() => {
    dispatch(getAuctions());
  }, [dispatch]);

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
            <AuctionsGrid auctions={auctions} />
          )}
        </Grid2>
      </Grid2>
    </>
  );
}
