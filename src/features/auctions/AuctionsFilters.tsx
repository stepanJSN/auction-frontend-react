import {
  Stack,
  Button,
  SelectChangeEvent,
  TextField,
  SxProps,
  Slide,
} from '@mui/material';
import Autocomplete from '../../components/Autocomplete';
import Switch from '../../components/Switch';
import Select from '../../components/Select';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPriceRange,
  resetFilters,
  selectFilters,
  setCardName,
  setLocation,
  setPriceRange,
  setShowOnlyWhereUserTakePart,
  setSortBy,
  setSortOrder,
} from './AuctionsSlice';
import { SortOrderEnum } from '../../enums/sortOrder.enum';
import { AuctionSortByEnum } from '../../types/auctions.interfaces';
import { useCallback, useEffect } from 'react';
import { locationsService } from '../../services/locationsService';
import { ILocation } from '../../types/locations.interfaces';
import PriceSlider from './PriceSlider';

type AuctionsFiltersProps = {
  isOpen: boolean;
};

const sortByOptions = [
  { value: AuctionSortByEnum.CREATION_DATE, label: 'Creation date' },
  { value: AuctionSortByEnum.FINISH_DATE, label: 'Finish date' },
  { value: AuctionSortByEnum.HIGHEST_BID, label: 'Highest bid' },
];

const sortOrderOptions = [
  { value: SortOrderEnum.ASC, label: 'Ascending' },
  { value: SortOrderEnum.DESC, label: 'Descending' },
];

const filterStyles: SxProps = {
  position: {
    xs: 'absolute',
    md: 'static',
  },
  left: -1,
  height: '100%',
  backgroundColor: 'common.white',
  maxWidth: '400px',
  padding: 2,
  zIndex: 1,
};

export default function AuctionsFilters({ isOpen }: AuctionsFiltersProps) {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPriceRange());
  }, [dispatch]);

  const handleLocationChange = useCallback(
    (location: ILocation | null) => {
      dispatch(setLocation(location));
    },
    [dispatch],
  );

  const getLocationLabel = useCallback((location: ILocation | null) => {
    return location ? location.name : '';
  }, []);

  const searchLocation = useCallback((searchValue: string) => {
    return locationsService.getAll({ name: searchValue });
  }, []);

  const handleCardNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setCardName(event.target.value));
    },
    [dispatch],
  );

  const handlePriceRangeChange = useCallback(
    (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
      if (Array.isArray(newValue)) {
        dispatch(setPriceRange([newValue[0], newValue[1]]));
      }
    },
    [dispatch],
  );

  const handleShowOnlyWhereUserTakePartChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setShowOnlyWhereUserTakePart(event.target.checked));
    },
    [dispatch],
  );

  const handleSortByChange = useCallback(
    (sortBy: SelectChangeEvent) => {
      dispatch(setSortBy(sortBy.target.value as AuctionSortByEnum));
    },
    [dispatch],
  );

  const handleSortOrderChange = useCallback(
    (sortOrder: SelectChangeEvent) => {
      dispatch(setSortOrder(sortOrder.target.value as SortOrderEnum));
    },
    [dispatch],
  );

  const handleResetChange = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  return (
    <Slide in={isOpen} direction="right">
      <Stack spacing={1} sx={filterStyles}>
        <Autocomplete
          label="Location"
          searchFunc={searchLocation}
          value={filters.location}
          getLabel={getLocationLabel}
          onChange={handleLocationChange}
        />
        <TextField
          value={filters.cardName}
          label="Card name"
          onChange={handleCardNameChange}
          size="small"
        />
        {filters.price.max !== null && filters.price.min !== null && (
          <PriceSlider
            min={filters.price.min}
            max={filters.price.max}
            range={filters.price.range}
            handlePriceRangeChange={handlePriceRangeChange}
          />
        )}
        <Switch
          label="Show only where user take part"
          checked={filters.showOnlyWhereUserTakePart}
          handleChange={handleShowOnlyWhereUserTakePartChange}
        />
        <Select
          label="Sort by"
          value={filters.sortBy}
          options={sortByOptions}
          handleChange={handleSortByChange}
        />
        <Select
          label="Sort order"
          value={filters.sortOrder}
          options={sortOrderOptions}
          handleChange={handleSortOrderChange}
        />
        <Button
          color="warning"
          variant="contained"
          fullWidth
          onClick={handleResetChange}>
          Reset
        </Button>
      </Stack>
    </Slide>
  );
}
