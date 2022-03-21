import api from "./api.service";
import { ApiRoutes } from "../shared/types/routes";

export default class AuthService {
  static async login(email: string, password: string) {
    return api.post(ApiRoutes.login, { email, password });
  }
}
