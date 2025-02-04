import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { Role } from '../../enums/role.enum';
import { ISingInResponse } from '../../types/auth.interfaces';
import authReducer, {
  AuthState,
  signin,
  signinError,
  signinSuccess,
} from './authSlice';

describe('Auth Slice', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      errorCode: null,
      status: QueryStatusEnum.IDLE,
    };
  });

  it('should handle signin', () => {
    const nextState = authReducer(
      initialState,
      signin({ email: 'test@example.com', password: 'password' }),
    );
    expect(nextState).toEqual({
      errorCode: null,
      status: QueryStatusEnum.LOADING,
    });
  });

  it('should handle signinSuccess', () => {
    const mockSigninSuccessPayload: Omit<ISingInResponse, 'accessToken'> = {
      id: 'userId',
      role: Role.USER,
    };
    const nextState = authReducer(
      initialState,
      signinSuccess(mockSigninSuccessPayload),
    );
    expect(nextState).toEqual({
      errorCode: null,
      status: QueryStatusEnum.SUCCESS,
    });
  });

  it('should handle signinError', () => {
    const errorCode = 500;
    const nextState = authReducer(initialState, signinError(errorCode));
    expect(nextState).toEqual({
      errorCode,
      status: QueryStatusEnum.ERROR,
    });
  });
});
