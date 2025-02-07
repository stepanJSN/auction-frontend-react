import { runSaga } from 'redux-saga';
import { episodesService } from '../../services/episodesService';
import {
  createEpisodeSaga,
  deleteEpisodeSaga,
  filterEpisodesByNameSaga,
  getEpisodesSaga,
  updateEpisodeSaga,
} from './episodesSaga';
import {
  createEpisodeError,
  createEpisodeSuccess,
  deleteEpisode,
  deleteEpisodeError,
  deleteEpisodeSuccess,
  filterEpisodesByName,
  getEpisodes,
  getEpisodesError,
  getEpisodesSuccess,
  resetCreateEpisodeStatus,
  resetDeleteEpisodeStatus,
  resetUpdateEpisodeStatus,
  updateEpisode,
  updateEpisodeError,
  updateEpisodeSuccess,
} from './episodesSlice';
import { AxiosError } from 'axios';

jest.mock('redux-saga/effects', () => ({
  ...jest.requireActual('redux-saga/effects'),
  delay: jest.fn(),
}));

describe('Episodes saga', () => {
  const mockEpisode = {
    id: 1,
    name: 'episodeName',
    code: 'episodeCode',
  };
  const mockEpisodesResponse = {
    data: [mockEpisode],
    info: {
      page: 1,
      totalCount: 1,
      totalPages: 2,
    },
  };
  describe('getEpisodesSaga', () => {
    const mockName = 'episodeName';
    let requestFindAllEpisodesMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestFindAllEpisodesMock = jest.spyOn(episodesService, 'getAll');
    });

    afterEach(() => {
      requestFindAllEpisodesMock.mockRestore();
    });

    const runTestSaga = async (page: number) => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
          getState: () => ({
            episodes: { episodeName: mockName, currentPage: 1 },
          }),
        },
        getEpisodesSaga,
        {
          payload: page,
          type: getEpisodes.type,
        },
      ).toPromise();
    };

    it('should call episodesService.getAll and dispatch getEpisodesSuccess action is request is resolved', async () => {
      const mockPage = 2;
      requestFindAllEpisodesMock.mockResolvedValue(mockEpisodesResponse);
      await runTestSaga(mockPage);

      expect(requestFindAllEpisodesMock).toHaveBeenCalledWith({
        page: mockPage,
        name: mockName,
      });
      expect(dispatched).toEqual([getEpisodesSuccess(mockEpisodesResponse)]);
    });

    it('should not call episodesService.getAll and dispatch getEpisodesSuccess with null if current page is equal to payload', async () => {
      const mockPage = 1;
      await runTestSaga(mockPage);

      expect(dispatched).toEqual([getEpisodesSuccess(null)]);
    });

    it('should dispatch getEpisodesError action if request is rejected', async () => {
      const mockPage = 2;
      const errorCode = 500;
      const mockEpisodeResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestFindAllEpisodesMock.mockRejectedValue(mockEpisodeResponse);
      await runTestSaga(mockPage);

      expect(dispatched).toEqual([getEpisodesError()]);
    });
  });

  describe('filterEpisodesByNameSaga', () => {
    const mockName = 'episodeName';
    let requestFindAllEpisodesMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestFindAllEpisodesMock = jest.spyOn(episodesService, 'getAll');
    });

    afterEach(() => {
      requestFindAllEpisodesMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
        },
        filterEpisodesByNameSaga,
        {
          payload: mockName,
          type: filterEpisodesByName.type,
        },
      ).toPromise();
    };

    it('should call episodesService.getAll and dispatch getEpisodesSuccess action is request is resolved', async () => {
      requestFindAllEpisodesMock.mockResolvedValue(mockEpisodesResponse);
      await runTestSaga();

      expect(requestFindAllEpisodesMock).toHaveBeenCalledWith({
        name: mockName,
      });
      expect(dispatched).toEqual([getEpisodesSuccess(mockEpisodesResponse)]);
    });

    it('should dispatch getEpisodesError action if request is rejected', async () => {
      const errorCode = 500;
      const mockEpisodeResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestFindAllEpisodesMock.mockRejectedValue(mockEpisodeResponse);
      await runTestSaga();

      expect(dispatched).toEqual([getEpisodesError()]);
    });
  });

  describe('createEpisodeSaga', () => {
    let requestCreateEpisodesMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestCreateEpisodesMock = jest.spyOn(episodesService, 'create');
    });

    afterEach(() => {
      requestCreateEpisodesMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
        },
        createEpisodeSaga,
        {
          payload: {
            name: mockEpisode.name,
            code: mockEpisode.code,
          },
          type: getEpisodes.type,
        },
      ).toPromise();
    };

    it('should call episodesService.create and dispatch createEpisodeSuccess and resetCreateEpisodeStatus actions if request is resolved', async () => {
      requestCreateEpisodesMock.mockResolvedValue(mockEpisode);

      await runTestSaga();

      expect(requestCreateEpisodesMock).toHaveBeenCalledWith({
        name: mockEpisode.name,
        code: mockEpisode.code,
      });
      expect(dispatched).toEqual([
        createEpisodeSuccess(mockEpisode),
        resetCreateEpisodeStatus(),
      ]);
    });

    it('should dispatch createEpisodeError and resetCreateEpisodeStatus actions if request is rejected', async () => {
      const errorCode = 500;
      const mockEpisodeResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestCreateEpisodesMock.mockRejectedValue(mockEpisodeResponse);
      await runTestSaga();

      expect(dispatched).toEqual([
        createEpisodeError(errorCode),
        resetCreateEpisodeStatus(),
      ]);
    });
  });

  describe('deleteEpisodeSaga', () => {
    const mockEpisodeId = 1;
    let requestDeleteEpisodeMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestDeleteEpisodeMock = jest.spyOn(episodesService, 'delete');
    });

    afterEach(() => {
      requestDeleteEpisodeMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
        },
        deleteEpisodeSaga,
        {
          payload: mockEpisodeId,
          type: deleteEpisode.type,
        },
      ).toPromise();
    };

    it('should call episodesService.delete and dispatch deleteEpisodeSuccess action if request is resolved', async () => {
      requestDeleteEpisodeMock.mockResolvedValue(mockEpisode);

      await runTestSaga();

      expect(requestDeleteEpisodeMock).toHaveBeenCalledWith(mockEpisodeId);
      expect(dispatched).toEqual([deleteEpisodeSuccess(mockEpisodeId)]);
    });

    it('should dispatch deleteEpisodeError and resetDeleteEpisodeStatus actions if request is rejected', async () => {
      const errorCode = 500;
      const mockEpisodeResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestDeleteEpisodeMock.mockRejectedValue(mockEpisodeResponse);
      await runTestSaga();

      expect(dispatched).toEqual([
        deleteEpisodeError(mockEpisodeId),
        resetDeleteEpisodeStatus(mockEpisodeId),
      ]);
    });
  });

  describe('updateEpisodeSaga', () => {
    let requestUpdateEpisodeMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestUpdateEpisodeMock = jest.spyOn(episodesService, 'update');
    });

    afterEach(() => {
      requestUpdateEpisodeMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
        },
        updateEpisodeSaga,
        {
          payload: mockEpisode,
          type: updateEpisode.type,
        },
      ).toPromise();
    };

    it('should call episodesService.update and dispatch updateEpisodeSuccess and resetUpdateEpisodeStatus actions if request is resolved', async () => {
      requestUpdateEpisodeMock.mockResolvedValue(mockEpisode);

      await runTestSaga();

      expect(requestUpdateEpisodeMock).toHaveBeenCalledWith(
        mockEpisode.id,
        mockEpisode,
      );
      expect(dispatched).toEqual([
        updateEpisodeSuccess(mockEpisode),
        resetUpdateEpisodeStatus(mockEpisode.id),
      ]);
    });

    it('should dispatch updateEpisodeError and resetUpdateEpisodeStatus actions if request is rejected', async () => {
      const errorCode = 500;
      const mockEpisodeResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestUpdateEpisodeMock.mockRejectedValue(mockEpisodeResponse);
      await runTestSaga();

      expect(dispatched).toEqual([
        updateEpisodeError({
          id: mockEpisode.id,
          errorCode,
        }),
        resetUpdateEpisodeStatus(mockEpisode.id),
      ]);
    });
  });
});
