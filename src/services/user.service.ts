import { ApiRoutes } from "../shared/types/routes";
import api from "./api.service";

export default class UserService {
  static async getUser() {
    return api.get(ApiRoutes.getUser);
  }
}
