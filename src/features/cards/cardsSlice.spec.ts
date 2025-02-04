import { Gender } from '../../enums/gender.enum';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import cardsReducer, {
  CardsState,
  changeCardsPage,
  getCards,
  getCardsError,
  getCardsSuccess,
  selectCards,
} from './cardsSlice';
import { RootState } from '../../redux/store';

describe('Cards Slice', () => {
  const mockCard = {
    id: 'card1',
    name: 'cardsName',
    created_at: '2025-01-01T00:00:00.000Z',
    image_url: 'imageUrl',
    type: 'type',
    gender: Gender.MALE,
    is_active: true,
    is_created_by_admin: false,
    location_id: 1,
  };

  describe('reducers', () => {
    let initialState: CardsState;

    beforeEach(() => {
      initialState = {
        cards: null,
        totalPages: 0,
        currentPage: 1,
        status: QueryStatusEnum.IDLE,
      };
    });

    it('should handle page change', () => {
      const nextState = cardsReducer(initialState, changeCardsPage(2));
      expect(nextState).toEqual({
        ...initialState,
        currentPage: 2,
        status: QueryStatusEnum.LOADING,
      });
    });

    it('should handle get cards', () => {
      const nextState = cardsReducer(initialState, getCards(2));
      expect(nextState).toEqual({
        ...initialState,
        status: QueryStatusEnum.LOADING,
      });
    });

    it('should handle get cards success', () => {
      const mockPayload = {
        data: [mockCard],
        info: { page: 1, totalCount: 0, totalPages: 0 },
      };
      const nextState = cardsReducer(
        initialState,
        getCardsSuccess(mockPayload),
      );
      expect(nextState).toEqual({
        ...initialState,
        cards: mockPayload.data,
        totalPages: mockPayload.info.totalPages,
        status: QueryStatusEnum.SUCCESS,
      });
    });

    it('should handle get cards error', () => {
      const nextState = cardsReducer(initialState, getCardsError());
      expect(nextState).toEqual({
        ...initialState,
        status: QueryStatusEnum.ERROR,
      });
    });
  });

  describe('selectors', () => {
    const mockState = {
      cards: {
        cards: [mockCard],
        totalPages: 3,
        currentPage: 1,
        status: QueryStatusEnum.SUCCESS,
      },
    } as RootState;
    const result = selectCards(mockState);

    expect(result).toEqual({
      cards: [mockCard],
      totalPages: 3,
      currentPage: 1,
      status: QueryStatusEnum.SUCCESS,
    });
  });
});
