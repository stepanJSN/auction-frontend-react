import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import useMutation from './useMutation';
import { MutationStatusEnum } from '../enums/mutationStatus';
import { AxiosError } from 'axios';

jest.mock('../helpers/delay', () => ({
  delay: jest.fn(() => Promise.resolve()),
}));

describe('useMutation', () => {
  afterEach(cleanup);

  it('should call mutation function on mutation trigger', async () => {
    const mockMutationFn = jest
      .fn()
      .mockImplementation((data: string) => Promise.resolve(data));
    const { result } = renderHook(() => useMutation(mockMutationFn, false));
    let data: Promise<unknown>;
    const testData = 'test';

    expect(result.current.status).toBe(MutationStatusEnum.IDLE);

    act(() => {
      data = result.current.mutate(testData);
    });

    expect(mockMutationFn).toHaveBeenCalledWith(testData);
    expect(result.current.status).toBe(MutationStatusEnum.PENDING);
    await waitFor(() => {
      expect(data).resolves.toBe(testData);
    });
    expect(result.current.status).toBe(MutationStatusEnum.SUCCESS);
  });

  it('should call mutation function on mutation trigger and reset status after 2 seconds', async () => {
    const mockMutationFn = jest
      .fn()
      .mockImplementation((data: string) => Promise.resolve(data));
    const { result } = renderHook(() => useMutation(mockMutationFn, true));
    let data: Promise<unknown>;
    const testData = 'test';

    expect(result.current.status).toBe(MutationStatusEnum.IDLE);

    act(() => {
      data = result.current.mutate(testData);
    });

    expect(mockMutationFn).toHaveBeenCalledWith(testData);
    expect(result.current.status).toBe(MutationStatusEnum.PENDING);
    await waitFor(() => {
      expect(data).resolves.toBe(testData);
    });

    expect(result.current.status).toBe(MutationStatusEnum.IDLE);
  });

  it('should handle request error and set errorCode', async () => {
    const mockMutationFn = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject((new AxiosError('Request failed').status = 500)),
      );
    const { result } = renderHook(() => useMutation(mockMutationFn, false));
    const testData = 'test';

    expect(result.current.status).toBe(MutationStatusEnum.IDLE);

    act(() => {
      result.current.mutate(testData);
    });

    expect(mockMutationFn).toHaveBeenCalledWith(testData);
    expect(result.current.status).toBe(MutationStatusEnum.PENDING);
    await waitFor(() => {
      expect(result.current.status).toBe(MutationStatusEnum.ERROR);
      expect(result.current.errorCode).toBe(500);
    });
  });
});
