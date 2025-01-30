import { api } from '../apiConfig';
import { Role } from '../enums/role.enum';
import { authService } from './authService';

jest.mock('../apiConfig', () => ({
  api: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('auctionService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set access token to local storage', () => {
    const mockToken = 'testToken';
    Storage.prototype.setItem = jest.fn();

    authService.setAccessToken(mockToken);

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', mockToken);
  });

  it('should sign in user and set access token', async () => {
    const mockSignInData = {
      email: 'testEmail',
      password: 'testPassword',
    };
    const mockResponseData = {
      accessToken: 'testAccessToken',
      id: 'testId',
      role: Role.USER,
    };
    jest.spyOn(api, 'post').mockResolvedValue({ data: mockResponseData });
    Storage.prototype.setItem = jest.fn();

    const response = await authService.signIn(mockSignInData);

    expect(api.post).toHaveBeenCalledWith('/auth/signin', mockSignInData);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      mockResponseData.accessToken,
    );
    expect(response).toEqual(mockResponseData);
  });

  it('should get access token from local storage', () => {
    const mockToken = 'testToken';
    Storage.prototype.getItem = jest.fn().mockReturnValue(mockToken);

    const accessToken = authService.getAccessToken();

    expect(localStorage.getItem).toHaveBeenCalledWith('accessToken');
    expect(accessToken).toBe(mockToken);
  });

  it('should get new access token', async () => {
    const mockNewToken = 'testToken';
    jest
      .spyOn(api, 'get')
      .mockResolvedValue({ data: { accessToken: mockNewToken } });

    const newToken = await authService.getNewTokens();

    expect(api.get).toHaveBeenCalledWith('/auth/access-token');
    expect(newToken.accessToken).toBe(mockNewToken);
  });

  it('should clear all data from local storage', () => {
    Storage.prototype.clear = jest.fn();

    authService.clearStorage();
    expect(localStorage.clear).toHaveBeenCalled();
  });

  it('should logout user', async () => {
    Storage.prototype.clear = jest.fn();

    await authService.logout();
    expect(api.get).toHaveBeenCalledWith('/auth/logout');
    expect(localStorage.clear).toHaveBeenCalled();
  });
});
