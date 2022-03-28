import { ApiRoutes } from "../shared/types/routes";
import api from "./api.service";

export default class UserService {
  static async getAllUsers(user_status?: string) {
    if (user_status) {
      return api.get(ApiRoutes.getAllUsers, { params: { status: user_status } });
    }
    return api.get(ApiRoutes.getAllUsers, { params: { status: undefined } });
  }
  static async getUser() {
    return api.get(ApiRoutes.getUser);
  }
  static async updateUserStatus(_id: string, user_status: string) {
    return api.put(ApiRoutes.updateUserStatus, { _id, user_status });
  }
}
