import api from "./api.service";

import { ApiRoutes } from "../shared/types/routes";

export default class RecipeCommentService {
  static async deleteRecipeComment(_id: string) {
    return api.delete(ApiRoutes.deleteRecipeComment, { params: { _id } });
  }
}
