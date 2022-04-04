import api from "./api.service";

import { ApiRoutes } from "../shared/types/routes";
import { Order } from "../shared/types/table";
import { tableData } from "../shared/interfaces/Table";

export default class RecipeService {
  static async getRecipe(_id: string) {
    return api.get(ApiRoutes.getRecipe, { params: { _id } });
  }
  static async getRecipeStatistics() {
    return api.get(ApiRoutes.getRecipeStatistics);
  }
  static async getAllSortedRecipes(order: Order = "asc", orderBy: keyof tableData = "title") {
    return api.get(ApiRoutes.getAllSortedRecipes, { params: { order, orderBy } });
  }
  static async deleteRecipe(_id: string) {
    return api.delete(ApiRoutes.deleteRecipe, { params: { _id } });
  }
}
