import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import setsReducer, {
  changeSetsPage,
  getSets,
  getSetsError,
  getSetsSuccess,
  SetsState,
} from './setsSlice';

describe('Sets slice reducers', () => {
  let initialState: SetsState;

  beforeEach(() => {
    initialState = {
      sets: null,
      totalPages: 0,
      currentPage: 1,
      status: QueryStatusEnum.IDLE,
    };
  });

  it('should handle changeSetsPage action', () => {
    const mockPage = 2;
    const nextState = setsReducer(initialState, changeSetsPage(mockPage));
    expect(nextState).toEqual({
      ...initialState,
      status: QueryStatusEnum.LOADING,
      currentPage: mockPage,
    });
  });

  it('should handle getSets action', () => {
    const mockPage = 2;
    const nextState = setsReducer(initialState, getSets(mockPage));
    expect(nextState).toEqual({
      ...initialState,
      status: QueryStatusEnum.LOADING,
    });
  });

  it('should handle getSetsSuccess action', () => {
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
    const nextState = setsReducer(
      initialState,
      getSetsSuccess(mockSetsResponse),
    );
    expect(nextState).toEqual({
      ...initialState,
      status: QueryStatusEnum.SUCCESS,
      totalPages: mockSetsResponse.info.totalPages,
      sets: mockSetsResponse.data,
    });
  });

  it('should handle getSetsError action', () => {
    const nextState = setsReducer(initialState, getSetsError());
    expect(nextState).toEqual({
      ...initialState,
      status: QueryStatusEnum.ERROR,
    });
  });
});
