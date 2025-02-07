import { act, renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import useLocations from './useLocations';
import {
  deleteLocation,
  filterLocationsByName,
  getLocations,
} from './locationsSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('useLocations', () => {
  let mockDispatch = jest.fn();
  const mockCurrentPage = 1;

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      currentPage: mockCurrentPage,
    });
  });

  afterEach(() => mockDispatch.mockReset());

  it('should dispatch getLocations on first render', async () => {
    renderHook(() => useLocations());

    expect(mockDispatch).toHaveBeenCalledWith(getLocations());
  });

  it('should dispatch handleLoadMore when handleLoadMore is called', async () => {
    const { result } = renderHook(() => useLocations());

    act(() => {
      result.current.handleLoadMore();
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      getLocations(mockCurrentPage + 1),
    );
  });

  it('should dispatch deleteLocation when handleDelete is called', async () => {
    const mockLocationId = 1;
    const { result } = renderHook(() => useLocations());

    act(() => {
      result.current.handleDelete(mockLocationId);
    });

    expect(mockDispatch).toHaveBeenCalledWith(deleteLocation(mockLocationId));
  });

  it('should dispatch filterLocationsByName when handleFilterLocationsByName is called', async () => {
    const mockLocationName = 'test location';
    const { result } = renderHook(() => useLocations());

    act(() => {
      result.current.handleFilterLocationsByName(mockLocationName);
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      filterLocationsByName(mockLocationName),
    );
  });
});
