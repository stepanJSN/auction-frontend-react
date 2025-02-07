import { act, renderHook } from '@testing-library/react';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import useMutation from '../../hooks/useMutation';
import { useDispatch } from 'react-redux';
import { getSets } from './setsSlice';
import useDeleteSet from './useDeleteSet';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../config/routesConfig';

jest.mock('../../hooks/useMutation');
jest.mock('../../services/setsService', () => ({
  setsService: { delete: jest.fn() },
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

describe('useDeleteSet', () => {
  const mockSetId = 'setId';
  it('should return status and errorCode of response', () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      status: MutationStatusEnum.IDLE,
      errorCode: null,
    });
    const { result } = renderHook(() => useDeleteSet(mockSetId));

    expect(result.current.status).toBe(MutationStatusEnum.IDLE);
    expect(result.current.errorCode).toBe(null);
  });

  it('should call mutate and dispatch getSets action on handleDelete call', () => {
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      status: MutationStatusEnum.IDLE,
      errorCode: null,
    });
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    const { result } = renderHook(() => useDeleteSet(mockSetId));

    act(() => {
      result.current.handleDelete();
    });

    expect(mockMutate).toHaveBeenCalledWith(mockSetId);
    expect(mockDispatch).toHaveBeenCalledWith(getSets());
  });

  it('should navigate to sets page if mutation is successful', () => {
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      status: MutationStatusEnum.SUCCESS,
      errorCode: null,
    });
    const mockNavigate = jest.fn();
    (useNavigate as unknown as jest.Mock).mockReturnValue(mockNavigate);
    renderHook(() => useDeleteSet(mockSetId));

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.SETS);
  });
});
