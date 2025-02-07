import '@testing-library/jest-dom';
import { Gender } from '../../enums/gender.enum';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { act, render, screen } from '../../test-utils';
import CardsList from './CardsList';
import { ICardSummary } from '../../types/cards.interface';
import useCardList from './useCardList';
import CardsGrid from '../../components/CardsGrid';
import Pagination from '../../components/Pagination';
import PageLoader from '../../components/PageLoader';
import PageError from '../../components/PageError';
import userEvent from '@testing-library/user-event';

jest.mock('./useCardList');
jest.mock('./CardListAction');
jest.mock('../../components/PageLoader');
jest.mock('../../components/PageError');
jest.mock('../../components/CardsGrid');
jest.mock('../../components/Pagination');

describe('CardsList', () => {
  const mockCardsInSet: ICardSummary[] = [];
  const mockCard = {
    id: 'cardId',
    name: 'cardName',
    created_at: '2025-01-01T00:00:00.000Z',
    image_url: 'imageUrl',
    type: 'type',
    gender: Gender.MALE,
    is_active: true,
    is_created_by_admin: false,
    location_id: 1,
  };
  const mockUseCardList = {
    data: {
      data: [mockCard],
      info: { page: 1, totalPages: 1, totalCount: 1 },
    },
    status: QueryStatusEnum.SUCCESS,
    handleFilterChange: jest.fn(),
    handlePageChange: jest.fn(),
    page: 1,
  };
  afterEach(() => jest.clearAllMocks());

  it('should render component with CardsGrid and Pagination if there is any cards', () => {
    const mockHandleAddCard = jest.fn();
    const mockCardDetailsRoute = jest.fn();
    const mockHandlePageChange = jest.fn();

    (useCardList as jest.Mock).mockReturnValue({
      ...mockUseCardList,
      handlePageChange: mockHandlePageChange,
    });

    render(
      <CardsList
        cardsInSet={mockCardsInSet}
        handleAddCard={mockHandleAddCard}
        cardDetailsRoute={mockCardDetailsRoute}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Cards List' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Card Name' }),
    ).toBeInTheDocument();
    expect(CardsGrid).toHaveBeenCalledWith(
      {
        cards: mockUseCardList.data.data,
        cardActions: expect.any(Function),
        cardPagePath: mockCardDetailsRoute,
      },
      expect.anything(),
    );
    expect(Pagination).toHaveBeenCalledWith(
      {
        currentPage: mockUseCardList.page,
        totalPages: mockUseCardList.data.info.totalPages,
        handleChange: mockHandlePageChange,
      },
      expect.anything(),
    );
  });

  it('should render loader if status is LOADING', () => {
    const mockHandleAddCard = jest.fn();
    const mockCardDetailsRoute = jest.fn();

    (useCardList as jest.Mock).mockReturnValue({
      ...mockUseCardList,
      status: QueryStatusEnum.LOADING,
    });

    render(
      <CardsList
        cardsInSet={mockCardsInSet}
        handleAddCard={mockHandleAddCard}
        cardDetailsRoute={mockCardDetailsRoute}
      />,
    );

    expect(PageLoader).toHaveBeenCalled();
    expect(CardsGrid).not.toHaveBeenCalledWith();
    expect(Pagination).not.toHaveBeenCalledWith();
  });

  it('should render PageError if status is ERROR', () => {
    const mockHandleAddCard = jest.fn();
    const mockCardDetailsRoute = jest.fn();

    (useCardList as jest.Mock).mockReturnValue({
      ...mockUseCardList,
      status: QueryStatusEnum.ERROR,
    });

    render(
      <CardsList
        cardsInSet={mockCardsInSet}
        handleAddCard={mockHandleAddCard}
        cardDetailsRoute={mockCardDetailsRoute}
      />,
    );

    expect(PageError).toHaveBeenCalled();
    expect(CardsGrid).not.toHaveBeenCalledWith();
    expect(Pagination).not.toHaveBeenCalledWith();
  });

  it('should render "No cards found" message if there is no cards', () => {
    const mockHandleAddCard = jest.fn();
    const mockCardDetailsRoute = jest.fn();

    (useCardList as jest.Mock).mockReturnValue({
      ...mockUseCardList,
      data: {
        data: [],
        info: { page: 1, totalPages: 0, totalCount: 0 },
      },
    });

    render(
      <CardsList
        cardsInSet={mockCardsInSet}
        handleAddCard={mockHandleAddCard}
        cardDetailsRoute={mockCardDetailsRoute}
      />,
    );

    expect(PageError).not.toHaveBeenCalled();
    expect(CardsGrid).not.toHaveBeenCalledWith();
    expect(Pagination).not.toHaveBeenCalledWith();
    expect(screen.getByText('No cards found')).toBeInTheDocument();
  });

  it('should render "No cards found" message if there is no cards', async () => {
    const mockHandleFilterChange = jest.fn();

    (useCardList as jest.Mock).mockReturnValue({
      ...mockUseCardList,
      handleFilterChange: mockHandleFilterChange,
    });

    render(
      <CardsList
        cardsInSet={mockCardsInSet}
        handleAddCard={jest.fn()}
        cardDetailsRoute={jest.fn()}
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Card Name' });
    await act(async () => {
      userEvent.type(input, 'some name');
    });

    expect(mockHandleFilterChange).toHaveBeenCalled();
  });
});
