import { act, renderHook } from '@testing-library/react';
import useCardList from './useCardList';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { cardsService } from '../../services/cardsService';
import { useDebounceValue } from 'usehooks-ts';

const mockCardsData = {
  data: [],
  info: { page: 1, totalCount: 0, totalPages: 0 },
};
const mockCardsStatus = QueryStatusEnum.SUCCESS;

jest.mock(
  '../../hooks/useQuery',
  () =>
    ({ requestFn }: { requestFn: () => void }) => {
      requestFn();
      return {
        data: mockCardsData,
        status: mockCardsStatus,
      };
    },
);
jest.mock('../../services/cardsService', () => ({
  cardsService: { getAll: jest.fn() },
}));
jest.mock('usehooks-ts', () => ({
  useDebounceValue: jest.fn(() => ['', jest.fn()]),
}));

describe('useCardList', () => {
  it('should return cards data, current page, query status', () => {
    const { result } = renderHook(() => useCardList());

    expect(result.current.data).toEqual(mockCardsData);
    expect(result.current.status).toBe(mockCardsStatus);
    expect(result.current.page).toBe(1);
    expect(cardsService.getAll).toHaveBeenCalled();
  });

  it('should change page on handlePageChange call', () => {
    const mockNewPage = 2;
    const { result } = renderHook(() => useCardList());

    act(() => {
      result.current.handlePageChange(
        {} as React.ChangeEvent<unknown>,
        mockNewPage,
      );
    });
    expect(result.current.page).toBe(mockNewPage);
  });

  it('should change page on handleFilterChange call', () => {
    const mockCardName = 'card';
    const mockSetCardName = jest.fn();
    (useDebounceValue as jest.Mock).mockReturnValue(['test', mockSetCardName]);
    const { result } = renderHook(() => useCardList());

    act(() => {
      result.current.handleFilterChange({
        target: { value: mockCardName },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(mockSetCardName).toHaveBeenCalled();
  });
});
