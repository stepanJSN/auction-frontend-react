import { act, renderHook } from '@testing-library/react';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import useMutation from '../../hooks/useMutation';
import { useDispatch } from 'react-redux';
import { getSets } from './setsSlice';
import useUpdateSet from './useUpdateSet';

jest.mock('../../hooks/useMutation');
jest.mock('../../services/setsService', () => ({
  setsService: { update: jest.fn() },
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('useDeleteSet', () => {
  const mockSetId = 'setId';
  it('should return status and errorCode of response', () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      status: MutationStatusEnum.IDLE,
      errorCode: null,
    });
    const { result } = renderHook(() => useUpdateSet(mockSetId));

    expect(result.current.status).toBe(MutationStatusEnum.IDLE);
    expect(result.current.errorCode).toBe(null);
  });

  it('should call mutate and dispatch getSets action on handleUpdate call', () => {
    const mockMutate = jest.fn();
    const mockPayload = {
      name: 'updatedSet',
      bonus: 10,
      cardsId: ['card1', 'card2'],
    };
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      status: MutationStatusEnum.IDLE,
      errorCode: null,
    });
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    const { result } = renderHook(() => useUpdateSet(mockSetId));

    act(() => {
      result.current.handleUpdate(mockPayload);
    });

    expect(mockMutate).toHaveBeenCalledWith({
      id: mockSetId,
      setData: mockPayload,
    });
    expect(mockDispatch).toHaveBeenCalledWith(getSets());
  });
});
