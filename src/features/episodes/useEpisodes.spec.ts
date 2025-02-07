import { act, renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import useEpisodes from './useEpisodes';
import {
  deleteEpisode,
  filterEpisodesByName,
  getEpisodes,
} from './episodesSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('useEpisodes', () => {
  let mockDispatch = jest.fn();
  const mockCurrentPage = 1;

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      currentPage: mockCurrentPage,
    });
  });

  afterEach(() => mockDispatch.mockReset());

  it('should dispatch getEpisodes on first render', async () => {
    renderHook(() => useEpisodes());

    expect(mockDispatch).toHaveBeenCalledWith(getEpisodes());
  });

  it('should dispatch handleLoadMore when handleLoadMore is called', async () => {
    const { result } = renderHook(() => useEpisodes());

    act(() => {
      result.current.handleLoadMore();
    });

    expect(mockDispatch).toHaveBeenCalledWith(getEpisodes(mockCurrentPage + 1));
  });

  it('should dispatch deleteEpisode when handleDelete is called', async () => {
    const mockEpisodeId = 1;
    const { result } = renderHook(() => useEpisodes());

    act(() => {
      result.current.handleDelete(mockEpisodeId);
    });

    expect(mockDispatch).toHaveBeenCalledWith(deleteEpisode(mockEpisodeId));
  });

  it('should dispatch filterEpisodesByName when handleFilterEpisodesByName is called', async () => {
    const mockEpisodeName = 'test episode';
    const { result } = renderHook(() => useEpisodes());

    act(() => {
      result.current.handleFilterEpisodesByName(mockEpisodeName);
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      filterEpisodesByName(mockEpisodeName),
    );
  });
});
