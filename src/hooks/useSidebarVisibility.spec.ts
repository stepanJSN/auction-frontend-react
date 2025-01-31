import { act, cleanup, renderHook } from '@testing-library/react';
import useSidebarVisibility from './useSidebarVisibility';
import { useMediaQuery } from '@mui/material';
import { useOnClickOutside } from 'usehooks-ts';

jest.mock('usehooks-ts', () => ({
  useOnClickOutside: jest.fn(),
}));
jest.mock('@mui/material', () => ({
  useMediaQuery: jest.fn(),
  useTheme: jest.fn(() => ({
    breakpoints: { down: jest.fn(() => true) },
  })),
}));

describe('useSidebarVisibility', () => {
  afterEach(cleanup);

  it('should handle sidebar open and close', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    const mockUseOnClickOutside = useOnClickOutside as jest.Mock;
    const { result } = renderHook(() => useSidebarVisibility('md'));

    expect(result.current.isSidebarOpen).toBe(false);
    expect(mockUseOnClickOutside).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.handleSidebarOpen();
    });

    expect(result.current.isSidebarOpen).toBe(true);

    act(() => {
      result.current.handleSidebarClose();
    });

    expect(result.current.isSidebarOpen).toBe(false);
  });
});
