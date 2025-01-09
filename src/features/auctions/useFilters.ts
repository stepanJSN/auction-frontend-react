import { SelectChangeEvent } from '@mui/material';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SortOrderEnum } from '../../enums/sortOrder.enum';
import { locationsService } from '../../services/locationsService';
import { AuctionSortByEnum } from '../../types/auctions.interfaces';
import { ILocation } from '../../types/locations.interfaces';
import {
  getPriceRange,
  setLocation,
  setCardName,
  setPriceRange,
  setShowOnlyWhereUserTakePart,
  setSortBy,
  setSortOrder,
  resetFilters,
} from './AuctionsSlice';

export default function useFilters() {
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

  return {
    handleCardNameChange,
    handleLocationChange,
    getLocationLabel,
    searchLocation,
    handlePriceRangeChange,
    handleShowOnlyWhereUserTakePartChange,
    handleSortByChange,
    handleSortOrderChange,
    handleResetChange,
  };
}
