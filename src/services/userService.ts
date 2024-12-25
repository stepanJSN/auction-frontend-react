import { api, apiWithAuth } from "../apiConfig";
import { ICreateUser, IUser } from "../types/userService.interfaces";

export const userService = {
  create: async (data: ICreateUser) => {
    await api.post('/users', data);
  },

  getOne: async (id: string) => {
    const userData = await apiWithAuth.get<IUser>(`/users/${id}`);
    return userData.data;
  }
}
