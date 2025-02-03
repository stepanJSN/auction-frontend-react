import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { AxiosError } from 'axios';
import useQuery from './useQuery';
import { QueryStatusEnum } from '../enums/queryStatus.enum';

describe('useMutation', () => {
  afterEach(cleanup);

  it('should fetch data on mount if autoFetch is true', async () => {
    const mockQueryFn = jest
      .fn()
      .mockImplementation((data: string) => Promise.resolve(data));
    const mockData = 'test';
    const { result } = renderHook(() =>
      useQuery({
        requestFn: mockQueryFn,
        params: mockData,
        autoFetch: true,
      }),
    );

    expect(mockQueryFn).toHaveBeenCalledWith(mockData);
    expect(result.current.status).toBe(QueryStatusEnum.LOADING);

    await waitFor(() => {
      expect(result.current.data).toBe(mockData);
    });
    expect(result.current.status).toBe(QueryStatusEnum.SUCCESS);
  });

  it('should not fetch data on mount if autoFetch is false', async () => {
    const mockQueryFn = jest
      .fn()
      .mockImplementation((data: string) => Promise.resolve(data));
    const mockData = 'test';
    const { result } = renderHook(() =>
      useQuery({
        requestFn: mockQueryFn,
        params: mockData,
        autoFetch: false,
      }),
    );

    expect(mockQueryFn).not.toHaveBeenCalled();
    expect(result.current.status).toBe(QueryStatusEnum.IDLE);
  });

  it('should handle request error and set errorCode', async () => {
    const mockQueryFn = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject((new AxiosError('Request failed').status = 500)),
      );
    const mockData = 'test';
    const { result } = renderHook(() =>
      useQuery({
        requestFn: mockQueryFn,
        params: mockData,
        autoFetch: true,
      }),
    );

    expect(result.current.status).toBe(QueryStatusEnum.LOADING);

    expect(mockQueryFn).toHaveBeenCalledWith(mockData);
    await waitFor(() => {
      expect(result.current.status).toBe(QueryStatusEnum.ERROR);
      expect(result.current.errorCode).toBe(500);
    });
  });
});
