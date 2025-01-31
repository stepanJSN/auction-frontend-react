import { api, apiWithAuth } from '../apiConfig';
import { Role } from '../enums/role.enum';
import { SortOrderEnum } from '../enums/sortOrder.enum';
import { UsersSortTypeEnum } from '../types/user.interfaces';
import { userService } from './userService';

jest.mock('../apiConfig', () => ({
  apiWithAuth: {
    get: jest.fn(),
    patch: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
  api: {
    post: jest.fn(),
  },
}));

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = {
    id: 'user1',
    role: Role.USER,
    name: 'testName',
    email: 'test@gmail.com',
    surname: 'testSurname',
    rating: 10,
    balance: {
      available: 100,
      total: 200,
    },
    has_stripe_account: false,
    created_at: '2025-01-01T00:00:00.000Z',
  };

  it('should create a user', async () => {
    const mockPayload = {
      email: 'test@gmail.com',
      name: 'testName',
      surname: 'testSurname',
      password: 'testPassword',
    };

    await userService.create(mockPayload);
    expect(api.post).toHaveBeenCalledWith('/users', mockPayload);
  });

  it('should update a user', async () => {
    const mockId = mockUser.id;
    const mockPayload = {
      name: 'Updated name',
    };
    const mockResponseData = {
      ...mockUser,
      name: mockPayload.name,
    };
    jest
      .spyOn(apiWithAuth, 'put')
      .mockResolvedValue({ data: mockResponseData });

    const result = await userService.update(mockId, mockPayload);
    expect(apiWithAuth.put).toHaveBeenCalledWith(
      `/users/${mockId}`,
      mockPayload,
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should change the role of user', async () => {
    const mockId = mockUser.id;
    const mockRole = Role.ADMIN;

    await userService.changeRole(mockId, mockRole);
    expect(apiWithAuth.patch).toHaveBeenCalledWith('/users/role', {
      userId: mockId,
      role: mockRole,
    });
  });

  it('should get one user', async () => {
    const mockId = mockUser.id;
    jest.spyOn(apiWithAuth, 'get').mockResolvedValue({ data: mockUser });

    const result = await userService.getOne(mockId);

    expect(apiWithAuth.get).toHaveBeenCalledWith(`/users/${mockId}`);
    expect(result).toEqual(mockUser);
  });

  it('should get current user', async () => {
    jest.spyOn(apiWithAuth, 'get').mockResolvedValue({ data: mockUser });

    const result = await userService.getCurrent();

    expect(apiWithAuth.get).toHaveBeenCalledWith('/users/current');
    expect(result).toEqual(mockUser);
  });

  it('should get all users', async () => {
    const mockPayload = {
      page: 1,
      sortType: UsersSortTypeEnum.CREATION_DATE,
      sortOrder: SortOrderEnum.ASC,
      isAdmin: false,
      fullName: 'test',
    };
    const mockResponseData = {
      data: [
        {
          id: mockUser.id,
          role: mockUser.role,
          name: mockPayload.fullName,
          surname: mockUser.surname,
          rating: mockUser.rating,
        },
      ],
      info: { page: mockPayload.page, totalCount: 1, totalPages: 0 },
    };
    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    const result = await userService.getAll(mockPayload);
    const [[, options]] = (apiWithAuth.get as jest.Mock).mock.calls;
    const receivedParams = Object.fromEntries(options.params);

    expect(receivedParams).toEqual({
      page: mockPayload.page.toString(),
      sortType: mockPayload.sortType,
      sortOrder: mockPayload.sortOrder,
      fullName: mockPayload.fullName,
    });
    expect(apiWithAuth.get).toHaveBeenCalledWith('/users', expect.any(Object));
    expect(result).toEqual(mockResponseData);
  });

  it('should delete an location', async () => {
    const mockId = mockUser.id;
    await userService.delete(mockId);
    expect(apiWithAuth.delete).toHaveBeenCalledWith(`/users/${mockId}`);
  });
});
