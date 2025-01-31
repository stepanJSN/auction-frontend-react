import { act, cleanup, renderHook } from '@testing-library/react';
import usePaginatedData from './usePaginatedData';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('usePaginatedData', () => {
  afterEach(cleanup);

  it('should handle page change', () => {
    const fetchAction = jest.fn();
    const changePageAction = jest.fn();
    const event = {} as unknown as React.ChangeEvent<unknown>;
    const nextPage = 1;
    const { result } = renderHook(() =>
      usePaginatedData(fetchAction, changePageAction),
    );

    act(() => {
      result.current(event, nextPage);
    });

    expect(changePageAction).toHaveBeenCalledWith(nextPage);
  });

  it('should dispatch fetch action on mount', () => {
    const fetchAction = jest.fn();
    const changePageAction = jest.fn();
    renderHook(() => usePaginatedData(fetchAction, changePageAction));

    expect(fetchAction).toHaveBeenCalled();
  });
});
