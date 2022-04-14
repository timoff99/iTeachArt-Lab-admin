import api from "./api.service";

import { ApiRoutes } from "../shared/types/routes";
import { Order } from "../shared/types/table";
import { tableData } from "../shared/interfaces/Table";

export default class RecipeService {
  static async getAllRecipes() {
    return api.get(ApiRoutes.getAllRecipes);
  }
  static async getRecipe(_id: string) {
    return api.get(ApiRoutes.getRecipe, { params: { _id } });
  }
  static async getRecipeStatistics() {
    return api.get(ApiRoutes.getRecipeStatistics);
  }
  static async getAllSortedRecipes(order: Order = "asc", orderBy: keyof tableData = "title", search: string) {
    return api.get(ApiRoutes.getAllSortedRecipes, { params: { order, orderBy, search } });
  }
  static async deleteRecipe(_id: string) {
    return api.delete(ApiRoutes.deleteRecipe, { params: { _id } });
  }
  static async deleteRecipeCommentsId(card_id: string, comment_id: string) {
    return api.delete(ApiRoutes.deleteRecipesCommentsId, { params: { card_id, comment_id } });
  }
}
