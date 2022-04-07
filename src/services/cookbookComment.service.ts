import api from "./api.service";

import { ApiRoutes } from "../shared/types/routes";

export default class CookbookCommentService {
  static async deleteCookbookComment(_id: string) {
    return api.delete(ApiRoutes.deleteCookbookComment, { params: { _id } });
  }
}
