import api from "./api.service";

import { tableData } from "../shared/interfaces/Table";
import { ApiRoutes } from "../shared/types/routes";
import { Order } from "../shared/types/table";

export default class CookBookService {
  static async getAllCookBooks() {
    return api.get(ApiRoutes.getAllCookBooks);
  }
  static async getCookbook(_id: string) {
    return api.get(ApiRoutes.getCookbook, { params: { _id } });
  }
  static async getCookbookStatistics() {
    return api.get(ApiRoutes.getCookbookStatistics);
  }
  static async getAllSortedCookbooks(order: Order = "asc", orderBy: keyof tableData = "title", search: string) {
    return api.get(ApiRoutes.getAllSortedCookbooks, { params: { order, orderBy, search } });
  }
  static async deleteCookbook(_id: string) {
    return api.delete(ApiRoutes.deleteCookbook, { params: { _id } });
  }
  static async deleteCookBookCommentsId(card_id: string, comment_id: string) {
    return api.delete(ApiRoutes.deleteCookbookCommentsId, { params: { card_id, comment_id } });
  }
}
