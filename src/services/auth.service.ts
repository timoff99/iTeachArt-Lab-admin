import api from "./api.service";

export default class AuthService {
  static async adminLogin(email: string, password: string) {
    return api.post("auth/admin-login", { email, password });
  }
}
