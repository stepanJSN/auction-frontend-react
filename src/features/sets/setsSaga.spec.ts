import { runSaga } from 'redux-saga';
import { setsService } from '../../services/setsService';
import { getSetsSaga } from './setsSaga';
import { getSets, getSetsError, getSetsSuccess } from './setsSlice';
import { AxiosError } from 'axios';

describe('Sets saga', () => {
  describe('getSetsSaga', () => {
    let requestFindAllSetsMock: jest.SpyInstance;
    let dispatched: any[];
    const mockSetsResponse = {
      data: [
        {
          id: 'cardId',
          name: 'card name',
          bonus: 10,
          is_user_has_set: false,
          created_at: '2025-01-01T00:00:00.000Z',
          cards: [],
        },
      ],
      info: { page: 1, totalPages: 1, totalCount: 1 },
    };

    beforeEach(() => {
      dispatched = [];
      requestFindAllSetsMock = jest.spyOn(setsService, 'getAll');
    });

    afterEach(() => {
      requestFindAllSetsMock.mockRestore();
    });

    const runTestSaga = async (page?: number) => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
          getState: () => ({
            sets: { currentPage: 1 },
          }),
        },
        getSetsSaga,
        {
          payload: page,
          type: getSets.type,
        },
      ).toPromise();
    };

    it('should call setsService.getAll and dispatch getSetsSuccess action if request is resolved', async () => {
      const mockPage = 2;
      requestFindAllSetsMock.mockResolvedValue(mockSetsResponse);
      await runTestSaga(mockPage);

      expect(requestFindAllSetsMock).toHaveBeenCalledWith(mockPage);
      expect(dispatched).toEqual([getSetsSuccess(mockSetsResponse)]);
    });

    it('should call setsService.getAll with page from state if payload is not provided', async () => {
      requestFindAllSetsMock.mockResolvedValue(mockSetsResponse);
      await runTestSaga();

      expect(requestFindAllSetsMock).toHaveBeenCalledWith(1);
      expect(dispatched).toEqual([getSetsSuccess(mockSetsResponse)]);
    });

    it('should dispatch getSetsError action if request is rejected', async () => {
      const mockPage = 2;
      const errorCode = 500;
      const mockEpisodeResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestFindAllSetsMock.mockRejectedValue(mockEpisodeResponse);
      await runTestSaga(mockPage);

      expect(dispatched).toEqual([getSetsError()]);
    });
  });
});
