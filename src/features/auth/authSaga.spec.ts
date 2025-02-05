import { runSaga } from 'redux-saga';
import { Role } from '../../enums/role.enum';
import { authService } from '../../services/authService';
import { ISingInRequest, ISingInResponse } from '../../types/auth.interfaces';
import { logoutSaga, signinSaga } from './authSaga';
import { signin, signinError, signinSuccess } from './authSlice';
import { AxiosError } from 'axios';

describe('Auth Saga', () => {
  describe('signinSaga', () => {
    let requestSignInMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestSignInMock = jest.spyOn(authService, 'signIn');
    });

    afterEach(() => {
      requestSignInMock.mockRestore();
    });
    it('should call authService.signIn and dispatch signinSuccess action', async () => {
      const mockResponse: ISingInResponse = {
        accessToken: 'testAccessToken',
        id: 'testId',
        role: Role.USER,
      };
      const mockPayload: ISingInRequest = {
        email: 'testEmail',
        password: 'testPassword',
      };

      requestSignInMock.mockResolvedValue(mockResponse);
      await runSaga(
        { dispatch: (action) => dispatched.push(action) },
        signinSaga,
        {
          payload: mockPayload,
          type: signin.type,
        },
      ).toPromise();

      expect(requestSignInMock).toHaveBeenCalledWith(mockPayload);
      expect(dispatched).toEqual([signinSuccess(mockResponse)]);
    });

    it('should call authService.signIn and dispatch signinError action', async () => {
      const errorCode = 500;
      const mockResponse = (new AxiosError('Request failed').status =
        errorCode);
      const mockPayload: ISingInRequest = {
        email: 'testEmail',
        password: 'testPassword',
      };

      requestSignInMock.mockRejectedValue(mockResponse);
      await runSaga(
        { dispatch: (action) => dispatched.push(action) },
        signinSaga,
        {
          payload: mockPayload,
          type: signin.type,
        },
      ).toPromise();

      expect(requestSignInMock).toHaveBeenCalledWith(mockPayload);
      expect(dispatched).toEqual([signinError(errorCode)]);
    });
  });

  describe('logoutSaga', () => {
    let requestLogoutMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestLogoutMock = jest.spyOn(authService, 'logout');
    });

    afterEach(() => {
      requestLogoutMock.mockRestore();
    });
    it('should call authService.logout', async () => {
      requestLogoutMock.mockResolvedValue(undefined);
      await runSaga(
        { dispatch: (action) => dispatched.push(action) },
        logoutSaga,
      ).toPromise();

      expect(requestLogoutMock).toHaveBeenCalled();
    });
  });
});
