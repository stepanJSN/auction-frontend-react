import { api, apiWithAuth } from "../apiConfig";
import { Role } from "../enums/role.enum";
import { ICreateUser, IUpdateUser } from "../types/userService.interfaces";

export const userService = {
  create: async (data: ICreateUser) => {
    await api.post('/users', data);
  },

  update: async (id: string, data: IUpdateUser) => {
    await apiWithAuth.put(`/users/${id}`, data);
  },

  changeRole: async (id: string, role: Role) => {
    await apiWithAuth.put(`/users/role`, { userId: id, role });
  }
}
