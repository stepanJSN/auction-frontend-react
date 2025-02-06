import { runSaga } from 'redux-saga';
import { cardsService } from '../../services/cardsService';
import { getCardsSaga } from './cardsSaga';
import { getCards, getCardsError, getCardsSuccess } from './cardsSlice';
import { AxiosError } from 'axios';

describe('Cards Saga', () => {
  let requestCardsMock: jest.SpyInstance;
  let dispatched: any[];

  beforeEach(() => {
    dispatched = [];
    requestCardsMock = jest.spyOn(cardsService, 'getAll');
  });

  afterEach(() => {
    requestCardsMock.mockRestore();
  });

  it('should call cardsService.getAll and dispatch getCardsSuccess action with page from state', async () => {
    const mockResponse = {
      data: [],
      info: { page: 1, totalCount: 0, totalPages: 0 },
    };

    requestCardsMock.mockResolvedValue(mockResponse);
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ cards: { currentPage: 1 } }),
      },
      getCardsSaga,
      {
        payload: undefined,
        type: getCards.type,
      },
    ).toPromise();

    expect(requestCardsMock).toHaveBeenCalledWith({ page: 1 });
    expect(dispatched).toEqual([getCardsSuccess(mockResponse)]);
  });

  it('should call cardsService.getAll and dispatch getCardsSuccess action with page from payload', async () => {
    const mockResponse = {
      data: [],
      info: { page: 1, totalCount: 0, totalPages: 0 },
    };

    requestCardsMock.mockResolvedValue(mockResponse);
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ cards: { currentPage: 10 } }),
      },
      getCardsSaga,
      {
        payload: 2,
        type: getCards.type,
      },
    ).toPromise();

    expect(requestCardsMock).toHaveBeenCalledWith({ page: 2 });
    expect(dispatched).toEqual([getCardsSuccess(mockResponse)]);
  });

  it('should call cardsService.getAll and dispatch getCardsError action', async () => {
    const errorCode = 500;
    const mockResponse = (new AxiosError('Request failed').status = errorCode);
    requestCardsMock.mockRejectedValue(mockResponse);
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ cards: { currentPage: 1 } }),
      },
      getCardsSaga,
      {
        payload: undefined,
        type: getCards.type,
      },
    ).toPromise();

    expect(requestCardsMock).toHaveBeenCalledWith({ page: 1 });
    expect(dispatched).toEqual([getCardsError()]);
  });
});
