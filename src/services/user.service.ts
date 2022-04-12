import api from "./api.service";

import { userData } from "../shared/interfaces/UserTable";
import { ApiRoutes } from "../shared/types/routes";
import { Order } from "../shared/types/table";
import { IUpdatedUserFiled } from "shared/interfaces/Settings";

export default class UserService {
  static async getAllUsers(search: string, user_status?: string, order?: Order, orderBy?: keyof userData) {
    if (user_status) {
      return api.get(ApiRoutes.getAllUsers, { params: { search, status: user_status, order, orderBy } });
    }
    return api.get(ApiRoutes.getAllUsers, { params: { search, status: undefined, order, orderBy } });
  }
  static async getUser() {
    return api.get(ApiRoutes.getUser);
  }
  static async getUserStatistics() {
    return api.get(ApiRoutes.getUserStatistics);
  }
  static async updateUserStatus(_id: string, user_status: string) {
    return api.put(ApiRoutes.updateUserStatus, { _id, user_status });
  }
  static async updateUser(updatedFiled: IUpdatedUserFiled) {
    return api.put(ApiRoutes.updateUser, { updatedFiled });
  }
  static async deleteUser(_id: string) {
    return api.delete(ApiRoutes.deleteUser, { params: { _id } });
  }
}
