import { Stack, Button, TextField, SxProps, Slide } from '@mui/material';
import Autocomplete from '../../components/Autocomplete';
import Switch from '../../components/Switch';
import Select from '../../components/Select';
import { useSelector } from 'react-redux';
import { selectFilters } from './AuctionsSlice';
import { SortOrderEnum } from '../../enums/sortOrder.enum';
import { AuctionSortByEnum } from '../../types/auctions.interfaces';
import PriceSlider from './PriceSlider';
import useFilters from './useFilters';

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
  const {
    searchLocation,
    getLocationLabel,
    handleCardNameChange,
    handlePriceRangeChange,
    handleShowOnlyWhereUserTakePartChange,
    handleSortByChange,
    handleSortOrderChange,
    handleLocationChange,
    handleResetChange,
  } = useFilters();

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
