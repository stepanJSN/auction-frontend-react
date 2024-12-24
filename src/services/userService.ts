import { api } from "../apiConfig";
import { ICreateUser } from "../types/userService.interfaces";

export const userService = {
  create: async (data: ICreateUser) => {
    await api.post('/users', data);
  }
}
