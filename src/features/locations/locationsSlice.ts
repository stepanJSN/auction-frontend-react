import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { RootState } from '../../redux/store';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import {
  IGetLocationsResponse,
  ILocation,
} from '../../types/locations.interfaces';

export interface LocationsState {
  locations: {
    data: ILocation;
    updateStatus: MutationStatusEnum;
    deleteStatus: MutationStatusEnum;
  }[];
  totalPages: number;
  currentPage: number;
  locationName: string;
  status: QueryStatusEnum;
  errorCode: number | null;
}

const initialState: LocationsState = {
  locations: [],
  totalPages: 0,
  currentPage: 0,
  locationName: '',
  status: QueryStatusEnum.IDLE,
  errorCode: null,
};

const findLocationIndex = (
  state: LocationsState,
  locationId: number,
): number => {
  return state.locations.findIndex(
    (location) => location.data.id === locationId,
  );
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    filterLocationsByName: (state, action: PayloadAction<string>) => {
      state.locationName = action.payload;
      state.status = QueryStatusEnum.LOADING;
      state.currentPage = 0;
      state.locations = [];
    },

    getLocations: (state, _action: PayloadAction<number | undefined>) => {
      state.status = QueryStatusEnum.LOADING;
    },

    getLocationsSuccess: (
      state,
      action: PayloadAction<IGetLocationsResponse | null>,
    ) => {
      state.status = QueryStatusEnum.SUCCESS;
      if (action.payload) {
        state.locations = state.locations.concat(
          action.payload.data.map((location) => ({
            data: location,
            updateStatus: MutationStatusEnum.IDLE,
            deleteStatus: MutationStatusEnum.IDLE,
          })),
        );
        state.currentPage += 1;
        state.totalPages = action.payload.info.totalPages;
      }
    },

    getLocationsError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },

    deleteLocation: (state, action: PayloadAction<number>) => {
      const locationIndex = findLocationIndex(state, action.payload);
      state.locations[locationIndex].deleteStatus = MutationStatusEnum.PENDING;
    },

    deleteLocationSuccess: (state, action: PayloadAction<number>) => {
      state.locations = state.locations.filter(
        (location) => location.data.id !== action.payload,
      );
    },

    deleteLocationError: (state, action: PayloadAction<number>) => {
      const locationIndex = findLocationIndex(state, action.payload);
      state.locations[locationIndex].deleteStatus = MutationStatusEnum.ERROR;
    },

    resetDeleteLocationStatus: (state, action: PayloadAction<number>) => {
      const locationIndex = findLocationIndex(state, action.payload);
      state.locations[locationIndex].deleteStatus = MutationStatusEnum.IDLE;
    },

    updateLocation: (state, action: PayloadAction<ILocation>) => {
      const locationIndex = findLocationIndex(state, action.payload.id);
      state.locations[locationIndex].updateStatus = MutationStatusEnum.PENDING;
    },

    updateLocationSuccess: (state, action: PayloadAction<ILocation>) => {
      const locationIndex = findLocationIndex(state, action.payload.id);
      state.locations[locationIndex].data = action.payload;
      state.locations[locationIndex].updateStatus = MutationStatusEnum.SUCCESS;
    },

    updateLocationError: (state, action: PayloadAction<number>) => {
      const locationIndex = findLocationIndex(state, action.payload);
      state.locations[locationIndex].updateStatus = MutationStatusEnum.ERROR;
    },

    resetUpdateLocationStatus: (state, action: PayloadAction<number>) => {
      const locationIndex = findLocationIndex(state, action.payload);
      state.locations[locationIndex].updateStatus = MutationStatusEnum.IDLE;
    },
  },
});

export const {
  filterLocationsByName,
  getLocations,
  getLocationsSuccess,
  getLocationsError,
  deleteLocation,
  deleteLocationSuccess,
  deleteLocationError,
  resetDeleteLocationStatus,
  updateLocation,
  updateLocationSuccess,
  updateLocationError,
  resetUpdateLocationStatus,
} = locationsSlice.actions;
export const selectLocations = createSelector(
  (state: RootState) => state.locations,
  (locations) => ({
    users: locations.locations,
    hasMore: locations.totalPages !== locations.currentPage,
    locationName: locations.locationName,
    currentPage: locations.currentPage,
    status: locations.status,
  }),
);

export const selectLocationsSearchParams = createSelector(
  (state: RootState) => state.locations,
  (users) => ({
    locationName: users.locationName,
    currentPage: users.currentPage,
  }),
);

export default locationsSlice.reducer;
