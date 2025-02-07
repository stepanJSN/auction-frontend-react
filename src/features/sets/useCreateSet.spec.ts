import { act, renderHook } from '@testing-library/react';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import useMutation from '../../hooks/useMutation';
import useCreateSet from './useCreateSet';
import { useDispatch } from 'react-redux';
import { getSets } from './setsSlice';

jest.mock('../../hooks/useMutation');
jest.mock('../../services/cardsService', () => ({
  cardsService: { create: jest.fn() },
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('useCreateSet', () => {
  it('should return status and errorCode of response', () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      status: MutationStatusEnum.IDLE,
      errorCode: null,
    });
    const { result } = renderHook(() => useCreateSet());

    expect(result.current.status).toBe(MutationStatusEnum.IDLE);
    expect(result.current.errorCode).toBe(null);
  });

  it('should call mutate and dispatch getSets action on handleSubmit call', () => {
    const mockPayload = {
      name: 'newSet',
      bonus: 10,
      cardsId: ['card1', 'card2'],
    };
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      status: MutationStatusEnum.IDLE,
      errorCode: null,
    });
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    const { result } = renderHook(() => useCreateSet());

    act(() => {
      result.current.handleSubmit(mockPayload);
    });

    expect(mockMutate).toHaveBeenCalledWith(mockPayload);
    expect(mockDispatch).toHaveBeenCalledWith(getSets());
  });
});
