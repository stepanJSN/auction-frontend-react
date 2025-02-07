import { MutationStatusEnum } from '../../enums/mutationStatus';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { RootState } from '../../redux/store';
import locationsReducer, {
  createLocation,
  createLocationError,
  createLocationSuccess,
  deleteLocation,
  deleteLocationError,
  deleteLocationSuccess,
  LocationsState,
  filterLocationsByName,
  getLocations,
  getLocationsError,
  getLocationsSuccess,
  resetCreateLocationStatus,
  resetDeleteLocationStatus,
  resetUpdateLocationStatus,
  selectLocationById,
  selectLocationCreationStatus,
  selectLocations,
  selectLocationsSearchParams,
  updateLocation,
  updateLocationError,
  updateLocationSuccess,
} from './locationsSlice';

const mockLocation = {
  id: 1,
  name: 'locationName',
  type: 'locationType',
};
const mockLocationsResponse = {
  data: [mockLocation],
  info: {
    page: 1,
    totalCount: 1,
    totalPages: 2,
  },
};
const mockLocationWithStatus = {
  data: mockLocation,
  updateStatus: MutationStatusEnum.IDLE,
  deleteStatus: MutationStatusEnum.IDLE,
  errorCode: null,
};

describe('Locations slice reducers', () => {
  let initialState: LocationsState;

  beforeEach(() => {
    initialState = {
      locations: [],
      totalPages: 0,
      currentPage: 0,
      locationName: '',
      status: QueryStatusEnum.IDLE,
      creationStatus: MutationStatusEnum.IDLE,
      creationErrorCode: null,
      errorCode: null,
    };
  });

  it('should handle filterLocationsByName action', () => {
    const mockLocationName = 'LocationName';
    const nextState = locationsReducer(
      initialState,
      filterLocationsByName(mockLocationName),
    );
    expect(nextState).toEqual({
      ...initialState,
      locationName: mockLocationName,
      status: QueryStatusEnum.LOADING,
      currentPage: 0,
      locations: [],
    });
  });

  it('should handle getLocations action', () => {
    const mockLocationsPage = 2;
    const nextState = locationsReducer(
      initialState,
      getLocations(mockLocationsPage),
    );
    expect(nextState).toEqual({
      ...initialState,
      status: QueryStatusEnum.LOADING,
    });
  });

  it('should handle getLocationsSuccess action', () => {
    const nextState = locationsReducer(
      initialState,
      getLocationsSuccess(mockLocationsResponse),
    );
    expect(nextState).toEqual({
      ...initialState,
      status: QueryStatusEnum.SUCCESS,
      locations: [mockLocationWithStatus],
      currentPage: 1,
      totalPages: mockLocationsResponse.info.totalPages,
    });
  });

  it('should handle getLocationsError action', () => {
    const nextState = locationsReducer(initialState, getLocationsError());
    expect(nextState).toEqual({
      ...initialState,
      status: QueryStatusEnum.ERROR,
    });
  });

  it('should handle createLocation action', () => {
    const mockPayload = {
      name: 'locationName',
      type: 'locationType',
    };
    const nextState = locationsReducer(
      initialState,
      createLocation(mockPayload),
    );
    expect(nextState).toEqual({
      ...initialState,
      creationStatus: MutationStatusEnum.PENDING,
    });
  });

  it('should handle createLocationSuccess action', () => {
    const previousState = {
      ...initialState,
      locations: [
        {
          data: { ...mockLocation, id: 0 },
          updateStatus: MutationStatusEnum.IDLE,
          deleteStatus: MutationStatusEnum.IDLE,
          errorCode: null,
        },
      ],
    };
    const nextState = locationsReducer(
      previousState,
      createLocationSuccess(mockLocation),
    );
    expect(nextState).toEqual({
      ...previousState,
      creationStatus: MutationStatusEnum.SUCCESS,
      locations: [...previousState.locations, mockLocationWithStatus],
    });
  });

  it('should handle createLocation action', () => {
    const mockPayload = {
      name: 'locationName',
      type: 'locationType',
    };
    const nextState = locationsReducer(
      initialState,
      createLocation(mockPayload),
    );
    expect(nextState).toEqual({
      ...initialState,
      creationStatus: MutationStatusEnum.PENDING,
    });
  });

  it('should handle createLocationError action', () => {
    const mockErrorCode = 500;
    const nextState = locationsReducer(
      initialState,
      createLocationError(mockErrorCode),
    );
    expect(nextState).toEqual({
      ...initialState,
      creationStatus: MutationStatusEnum.ERROR,
      creationErrorCode: mockErrorCode,
    });
  });

  it('should handle resetCreateLocationStatus action', () => {
    const nextState = locationsReducer(
      initialState,
      resetCreateLocationStatus(),
    );
    expect(nextState).toEqual({
      ...initialState,
      creationStatus: MutationStatusEnum.IDLE,
      creationErrorCode: null,
    });
  });

  it('should handle deleteLocation action', () => {
    const mockLocationId = mockLocation.id;
    const previousState = {
      ...initialState,
      locations: [
        {
          data: mockLocation,
          updateStatus: MutationStatusEnum.IDLE,
          deleteStatus: MutationStatusEnum.IDLE,
          errorCode: null,
        },
      ],
    };

    const nextState = locationsReducer(
      previousState,
      deleteLocation(mockLocationId),
    );
    expect(nextState).toEqual({
      ...previousState,
      locations: [
        {
          ...previousState.locations[0],
          deleteStatus: MutationStatusEnum.PENDING,
        },
      ],
    });
  });

  it('should handle deleteLocationSuccess action', () => {
    const mockLocationId = mockLocation.id;
    const previousState = {
      ...initialState,
      locations: [mockLocationWithStatus],
    };
    const nextState = locationsReducer(
      previousState,
      deleteLocationSuccess(mockLocationId),
    );
    expect(nextState).toEqual({
      ...previousState,
      locations: [],
    });
  });

  it('should handle deleteLocationError action', () => {
    const mockLocationId = mockLocation.id;
    const previousState = {
      ...initialState,
      locations: [mockLocationWithStatus],
    };

    const nextState = locationsReducer(
      previousState,
      deleteLocationError(mockLocationId),
    );
    expect(nextState).toEqual({
      ...previousState,
      locations: [
        {
          ...previousState.locations[0],
          deleteStatus: MutationStatusEnum.ERROR,
        },
      ],
    });
  });

  it('should handle resetDeleteLocationStatus action', () => {
    const mockLocationId = mockLocation.id;
    const previousState = {
      ...initialState,
      locations: [mockLocationWithStatus],
    };

    const nextState = locationsReducer(
      previousState,
      resetDeleteLocationStatus(mockLocationId),
    );
    expect(nextState).toEqual({
      ...previousState,
      locations: [
        {
          ...previousState.locations[0],
          deleteStatus: MutationStatusEnum.IDLE,
        },
      ],
    });
  });

  it('should handle updateLocation action', () => {
    const mockPayload = {
      ...mockLocation,
      name: 'updatedLocationName',
    };
    const previousState = {
      ...initialState,
      locations: [mockLocationWithStatus],
    };

    const nextState = locationsReducer(
      previousState,
      updateLocation(mockPayload),
    );
    expect(nextState).toEqual({
      ...previousState,
      locations: [
        {
          ...previousState.locations[0],
          updateStatus: MutationStatusEnum.PENDING,
        },
      ],
    });
  });

  it('should handle updateLocationSuccess action', () => {
    const mockPayload = {
      ...mockLocation,
      name: 'updatedLocationName',
    };
    const previousState = {
      ...initialState,
      locations: [mockLocationWithStatus],
    };

    const nextState = locationsReducer(
      previousState,
      updateLocationSuccess(mockPayload),
    );
    expect(nextState).toEqual({
      ...previousState,
      locations: [
        {
          ...previousState.locations[0],
          data: mockPayload,
          updateStatus: MutationStatusEnum.SUCCESS,
        },
      ],
    });
  });

  it('should handle updateLocationError action', () => {
    const mockPayload = {
      id: mockLocation.id,
      errorCode: 500,
    };
    const previousState = {
      ...initialState,
      locations: [mockLocationWithStatus],
    };

    const nextState = locationsReducer(
      previousState,
      updateLocationError(mockPayload),
    );
    expect(nextState).toEqual({
      ...previousState,
      locations: [
        {
          ...previousState.locations[0],
          errorCode: mockPayload.errorCode,
          updateStatus: MutationStatusEnum.ERROR,
        },
      ],
    });
  });

  it('should handle resetUpdateLocationStatus action', () => {
    const mockLocationId = mockLocation.id;
    const previousState = {
      ...initialState,
      locations: [mockLocationWithStatus],
    };

    const nextState = locationsReducer(
      previousState,
      resetUpdateLocationStatus(mockLocationId),
    );
    expect(nextState).toEqual({
      ...previousState,
      locations: [
        {
          ...previousState.locations[0],
          errorCode: null,
          updateStatus: MutationStatusEnum.IDLE,
        },
      ],
    });
  });
});

describe('Location slice selectors', () => {
  const mockState = {
    locations: {
      locations: [mockLocationWithStatus],
      totalPages: 3,
      currentPage: 2,
      locationName: 'SomeName',
      status: QueryStatusEnum.IDLE,
      creationStatus: MutationStatusEnum.IDLE,
      creationErrorCode: null,
      errorCode: null,
    },
  } as unknown as RootState;

  it('should select locations', () => {
    const result = selectLocations(mockState);

    expect(result).toEqual({
      locations: [mockLocationWithStatus],
      hasMore: true,
      locationName: mockState.locations.locationName,
      currentPage: mockState.locations.currentPage,
      status: mockState.locations.status,
    });
  });

  it('should select locations search params', () => {
    const result = selectLocationsSearchParams(mockState);

    expect(result).toEqual({
      locationName: mockState.locations.locationName,
      currentPage: mockState.locations.currentPage,
    });
  });

  it('should select locations creation status', () => {
    const result = selectLocationCreationStatus(mockState);

    expect(result).toEqual({
      creationStatus: mockState.locations.creationStatus,
      errorCode: mockState.locations.creationErrorCode,
    });
  });

  it('should select location by id', () => {
    const mockLocationId = mockLocationWithStatus.data.id;
    const result = selectLocationById(mockState, mockLocationId);

    expect(result).toEqual(mockLocationWithStatus);
  });
});
