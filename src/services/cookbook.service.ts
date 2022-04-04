import api from "./api.service";

import { tableData } from "../shared/interfaces/Table";
import { ApiRoutes } from "../shared/types/routes";
import { Order } from "../shared/types/table";

export default class CookBookService {
  static async getCookbook(_id: string) {
    return api.get(ApiRoutes.getCookbook, { params: { _id } });
  }
  static async getCookbookStatistics() {
    return api.get(ApiRoutes.getCookbookStatistics);
  }
  static async getAllSortedCookbooks(order: Order = "asc", orderBy: keyof tableData = "title") {
    return api.get(ApiRoutes.getAllSortedCookbooks, { params: { order, orderBy } });
  }
  static async deleteCookbook(_id: string) {
    return api.delete(ApiRoutes.deleteCookbook, { params: { _id } });
  }
}
