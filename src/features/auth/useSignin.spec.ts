import { act, cleanup, renderHook } from '@testing-library/react';
import useSignin from './useSignin';
import { signin } from './authSlice';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('useSignin', () => {
  afterEach(cleanup);

  it('should navigate user to sign in and dispatch RESET_ACTION on logout', () => {
    const mockSigninPayload = {
      email: 'email@gmail.com',
      password: 'password123',
    };
    const { result } = renderHook(() => useSignin());

    act(() => {
      result.current(mockSigninPayload);
    });

    expect(mockDispatch).toHaveBeenCalledWith(signin(mockSigninPayload));
  });
});
