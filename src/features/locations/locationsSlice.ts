import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { RootState } from '../../redux/store';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import {
  ICreateLocation,
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
  creationStatus: MutationStatusEnum;
  creationErrorCode: number | null;
  errorCode: number | null;
}

const initialState: LocationsState = {
  locations: [],
  totalPages: 0,
  currentPage: 0,
  locationName: '',
  status: QueryStatusEnum.IDLE,
  creationStatus: MutationStatusEnum.IDLE,
  creationErrorCode: null,
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

    createLocation: (state, _action: PayloadAction<ICreateLocation>) => {
      state.creationStatus = MutationStatusEnum.PENDING;
    },

    createLocationSuccess: (state, action: PayloadAction<ILocation>) => {
      state.locations.push({
        data: action.payload,
        updateStatus: MutationStatusEnum.IDLE,
        deleteStatus: MutationStatusEnum.IDLE,
      });
      state.creationStatus = MutationStatusEnum.SUCCESS;
    },

    createLocationError: (state, action: PayloadAction<number>) => {
      state.creationStatus = MutationStatusEnum.ERROR;
      state.creationErrorCode = action.payload;
    },

    resetCreateLocationStatus: (state) => {
      state.creationStatus = MutationStatusEnum.IDLE;
      state.creationErrorCode = null;
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
  createLocation,
  createLocationSuccess,
  createLocationError,
  resetCreateLocationStatus,
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
    locations: locations.locations,
    hasMore: locations.totalPages !== locations.currentPage,
    locationName: locations.locationName,
    currentPage: locations.currentPage,
    status: locations.status,
  }),
);

export const selectLocationsSearchParams = createSelector(
  (state: RootState) => state.locations,
  (locations) => ({
    locationName: locations.locationName,
    currentPage: locations.currentPage,
  }),
);

export const selectLocationCreationStatus = createSelector(
  (state: RootState) => state.locations,
  (locations) => ({
    creationStatus: locations.creationStatus,
    errorCode: locations.creationErrorCode,
  }),
);

export default locationsSlice.reducer;
