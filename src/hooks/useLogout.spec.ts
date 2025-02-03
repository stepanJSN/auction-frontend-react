import { act, cleanup, renderHook } from '@testing-library/react';
import useLogout from './useLogout';
import { ROUTES } from '../config/routesConfig';
import { RESET_ACTION } from '../redux/rootReducer';

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));
jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('useLogout', () => {
  afterEach(cleanup);

  it('should navigate user to sign in and dispatch RESET_ACTION on logout', () => {
    const { result } = renderHook(() => useLogout());

    act(() => {
      result.current();
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: RESET_ACTION });
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.SIGN_IN);
  });
});
