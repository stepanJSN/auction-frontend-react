import { api } from "../apiConfig";
import { ICreateUser } from "../types/userService.interfaces";

class UserService {
  create = async (data: ICreateUser) => {
    await api.post('/users', data);
  }
}

export const userService = new UserService();