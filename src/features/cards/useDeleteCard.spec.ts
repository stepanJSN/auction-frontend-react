import { useDispatch } from 'react-redux';
import useMutation from '../../hooks/useMutation';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import { afterEach } from 'node:test';
import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import { getCards } from './cardsSlice';
import useDeleteCard from './useDeleteCard';
import { useNavigate } from 'react-router';

jest.mock('../../hooks/useMutation', () => jest.fn());
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

describe('useDeleteCard', () => {
  afterEach(cleanup);

  it('should call mutate with cardId and navigate to prev page if mutation is successful', async () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    const mockMutate = jest.fn();
    const mockStatus = MutationStatusEnum.SUCCESS;
    const mockErrorCode = null;
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      status: mockStatus,
      errorCode: mockErrorCode,
    });
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    const mockCardId = 'cardId';

    const { result } = renderHook(() => useDeleteCard(mockCardId));

    act(() => {
      result.current.handleDelete();
    });

    expect(useMutation as jest.Mock).toHaveBeenCalledWith(expect.any(Function));
    expect(mockMutate).toHaveBeenCalledWith({
      id: mockCardId,
    });
    expect(mockDispatch).toHaveBeenCalledWith(getCards());
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  it('should not navigate to prev page if mutation is not successful', async () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    const mockMutate = jest.fn();
    const mockStatus = MutationStatusEnum.ERROR;
    const mockErrorCode = null;
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      status: mockStatus,
      errorCode: mockErrorCode,
    });
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    const mockCardId = 'cardId';

    const { result } = renderHook(() => useDeleteCard(mockCardId));

    act(() => {
      result.current.handleDelete();
    });

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalledWith(-1);
    });
  });
});
