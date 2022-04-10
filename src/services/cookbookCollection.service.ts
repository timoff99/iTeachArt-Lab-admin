import api from "./api.service";
import { ApiRoutes } from "../shared/types/routes";

interface ICreateCollection {
  title: string;
  image: string;
  cloudinary_id: string;
  collection: string[];
}

export default class CookbookCollectionService {
  static async getAllCookbookCollection() {
    return api.get(ApiRoutes.getAllCookbookCollection);
  }
  static async getOneCookbookCollection(id: string) {
    return api.get(ApiRoutes.getOneCookbookCollection, { params: { id } });
  }
  static async createCollection(collectionData: ICreateCollection) {
    return api.post(ApiRoutes.createCookbookCollection, { collectionData });
  }
  static async deleteCollection(collection_id: string, cloudinary_id: string) {
    return api.delete(ApiRoutes.deleteCookbookCollection, { data: { collection_id, cloudinary_id } });
  }
  static async deleteCollectionFiled(collection_id: string, collection_filed_id: string) {
    return api.delete(ApiRoutes.deleteCookbookCollectionFiled, { data: { collection_id, collection_filed_id } });
  }
}
