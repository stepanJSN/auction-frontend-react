import { runSaga } from 'redux-saga';
import { locationsService } from '../../services/locationsService';
import {
  createLocationSaga,
  deleteLocationSaga,
  filterLocationsByNameSaga,
  getLocationsSaga,
  updateLocationSaga,
} from './locationsSaga';
import {
  createLocationError,
  createLocationSuccess,
  deleteLocation,
  deleteLocationError,
  deleteLocationSuccess,
  filterLocationsByName,
  getLocations,
  getLocationsError,
  getLocationsSuccess,
  resetCreateLocationStatus,
  resetDeleteLocationStatus,
  resetUpdateLocationStatus,
  updateLocation,
  updateLocationError,
  updateLocationSuccess,
} from './locationsSlice';
import { AxiosError } from 'axios';

jest.mock('redux-saga/effects', () => ({
  ...jest.requireActual('redux-saga/effects'),
  delay: jest.fn(),
}));

describe('Locations saga', () => {
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
  describe('getLocationsSaga', () => {
    const mockName = 'locationName';
    let requestFindAllLocationsMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestFindAllLocationsMock = jest.spyOn(locationsService, 'getAll');
    });

    afterEach(() => {
      requestFindAllLocationsMock.mockRestore();
    });

    const runTestSaga = async (page: number) => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
          getState: () => ({
            locations: { locationName: mockName, currentPage: 1 },
          }),
        },
        getLocationsSaga,
        {
          payload: page,
          type: getLocations.type,
        },
      ).toPromise();
    };

    it('should call locationsService.getAll and dispatch getLocationsSuccess action is request is resolved', async () => {
      const mockPage = 2;
      requestFindAllLocationsMock.mockResolvedValue(mockLocationsResponse);
      await runTestSaga(mockPage);

      expect(requestFindAllLocationsMock).toHaveBeenCalledWith({
        page: mockPage,
        name: mockName,
      });
      expect(dispatched).toEqual([getLocationsSuccess(mockLocationsResponse)]);
    });

    it('should not call locationsService.getAll and dispatch getLocationsSuccess with null if current page is equal to payload', async () => {
      const mockPage = 1;
      await runTestSaga(mockPage);

      expect(dispatched).toEqual([getLocationsSuccess(null)]);
    });

    it('should dispatch getLocationsError action if request is rejected', async () => {
      const mockPage = 2;
      const errorType = 500;
      const mockLocationResponse = (new AxiosError('Request failed').status =
        errorType);

      requestFindAllLocationsMock.mockRejectedValue(mockLocationResponse);
      await runTestSaga(mockPage);

      expect(dispatched).toEqual([getLocationsError()]);
    });
  });

  describe('filterLocationsByNameSaga', () => {
    const mockName = 'locationName';
    let requestFindAllLocationsMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestFindAllLocationsMock = jest.spyOn(locationsService, 'getAll');
    });

    afterEach(() => {
      requestFindAllLocationsMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
        },
        filterLocationsByNameSaga,
        {
          payload: mockName,
          type: filterLocationsByName.type,
        },
      ).toPromise();
    };

    it('should call locationsService.getAll and dispatch getLocationsSuccess action is request is resolved', async () => {
      requestFindAllLocationsMock.mockResolvedValue(mockLocationsResponse);
      await runTestSaga();

      expect(requestFindAllLocationsMock).toHaveBeenCalledWith({
        name: mockName,
      });
      expect(dispatched).toEqual([getLocationsSuccess(mockLocationsResponse)]);
    });

    it('should dispatch getLocationsError action if request is rejected', async () => {
      const errorType = 500;
      const mockLocationResponse = (new AxiosError('Request failed').status =
        errorType);

      requestFindAllLocationsMock.mockRejectedValue(mockLocationResponse);
      await runTestSaga();

      expect(dispatched).toEqual([getLocationsError()]);
    });
  });

  describe('createLocationSaga', () => {
    let requestCreateLocationsMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestCreateLocationsMock = jest.spyOn(locationsService, 'create');
    });

    afterEach(() => {
      requestCreateLocationsMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
        },
        createLocationSaga,
        {
          payload: {
            name: mockLocation.name,
            type: mockLocation.type,
          },
          type: getLocations.type,
        },
      ).toPromise();
    };

    it('should call locationsService.create and dispatch createLocationSuccess and resetCreateLocationStatus actions if request is resolved', async () => {
      requestCreateLocationsMock.mockResolvedValue(mockLocation);

      await runTestSaga();

      expect(requestCreateLocationsMock).toHaveBeenCalledWith({
        name: mockLocation.name,
        type: mockLocation.type,
      });
      expect(dispatched).toEqual([
        createLocationSuccess(mockLocation),
        resetCreateLocationStatus(),
      ]);
    });

    it('should dispatch createLocationError and resetCreateLocationStatus actions if request is rejected', async () => {
      const errorType = 500;
      const mockLocationResponse = (new AxiosError('Request failed').status =
        errorType);

      requestCreateLocationsMock.mockRejectedValue(mockLocationResponse);
      await runTestSaga();

      expect(dispatched).toEqual([
        createLocationError(errorType),
        resetCreateLocationStatus(),
      ]);
    });
  });

  describe('deleteLocationSaga', () => {
    const mockLocationId = 1;
    let requestDeleteLocationMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestDeleteLocationMock = jest.spyOn(locationsService, 'delete');
    });

    afterEach(() => {
      requestDeleteLocationMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
        },
        deleteLocationSaga,
        {
          payload: mockLocationId,
          type: deleteLocation.type,
        },
      ).toPromise();
    };

    it('should call locationsService.delete and dispatch deleteLocationSuccess action if request is resolved', async () => {
      requestDeleteLocationMock.mockResolvedValue(mockLocation);

      await runTestSaga();

      expect(requestDeleteLocationMock).toHaveBeenCalledWith(mockLocationId);
      expect(dispatched).toEqual([deleteLocationSuccess(mockLocationId)]);
    });

    it('should dispatch deleteLocationError and resetDeleteLocationStatus actions if request is rejected', async () => {
      const errorType = 500;
      const mockLocationResponse = (new AxiosError('Request failed').status =
        errorType);

      requestDeleteLocationMock.mockRejectedValue(mockLocationResponse);
      await runTestSaga();

      expect(dispatched).toEqual([
        deleteLocationError(mockLocationId),
        resetDeleteLocationStatus(mockLocationId),
      ]);
    });
  });

  describe('updateLocationSaga', () => {
    let requestUpdateLocationMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestUpdateLocationMock = jest.spyOn(locationsService, 'update');
    });

    afterEach(() => {
      requestUpdateLocationMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
        },
        updateLocationSaga,
        {
          payload: mockLocation,
          type: updateLocation.type,
        },
      ).toPromise();
    };

    it('should call locationsService.update and dispatch updateLocationSuccess and resetUpdateLocationStatus actions if request is resolved', async () => {
      requestUpdateLocationMock.mockResolvedValue(mockLocation);

      await runTestSaga();

      expect(requestUpdateLocationMock).toHaveBeenCalledWith(
        mockLocation.id,
        mockLocation,
      );
      expect(dispatched).toEqual([
        updateLocationSuccess(mockLocation),
        resetUpdateLocationStatus(mockLocation.id),
      ]);
    });

    it('should dispatch updateLocationError and resetUpdateLocationStatus actions if request is rejected', async () => {
      const errorCode = 500;
      const mockLocationResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestUpdateLocationMock.mockRejectedValue(mockLocationResponse);
      await runTestSaga();

      expect(dispatched).toEqual([
        updateLocationError({
          id: mockLocation.id,
          errorCode,
        }),
        resetUpdateLocationStatus(mockLocation.id),
      ]);
    });
  });
});
