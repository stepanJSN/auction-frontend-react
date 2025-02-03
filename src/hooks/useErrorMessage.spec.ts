import { renderHook, cleanup } from '@testing-library/react';
import useErrorMessage from './useErrorMessage';

describe('useErrorMessage', () => {
  const errorMessages = {
    404: 'Not Found',
    500: 'Internal Server Error',
  };

  afterEach(cleanup);

  it('should return the correct error message for a known error code', () => {
    const { result } = renderHook(() => useErrorMessage(errorMessages));

    expect(result.current(404)).toBe('Not Found');
    expect(result.current(500)).toBe('Internal Server Error');
  });

  it('should return the default error message for an unknown error code', () => {
    const { result } = renderHook(() => useErrorMessage(errorMessages));

    expect(result.current(403)).toBe('Something went wrong');
  });

  it('should return null if errorCode is null or undefined', () => {
    const { result } = renderHook(() => useErrorMessage(errorMessages));

    expect(result.current(null)).toBeNull();
    expect(result.current(undefined as unknown as number)).toBeNull();
  });
});
