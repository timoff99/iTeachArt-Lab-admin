import api from "./api.service";
import { ApiRoutes } from "../shared/types/routes";

export default class CookbookCollectionService {
  static async createCollection(title: string, image: string, cloudinary_id: string, collection: [], type: string) {
    return api.post(ApiRoutes.createCookbookCollection, { title, image, cloudinary_id, collection, type });
  }
}
