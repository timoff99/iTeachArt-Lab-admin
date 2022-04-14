import api from "./api.service";
import { ApiRoutes } from "../shared/types/routes";

interface ICreateCollection {
  title: string;
  image: string;
  cloudinary_id: string;
  collection: string[];
}

export default class RecipeCollectionService {
  static async getAllRecipeCollection() {
    return api.get(ApiRoutes.getAllRecipeCollection);
  }
  static async getOneRecipeCollection(id: string) {
    return api.get(ApiRoutes.getOneRecipeCollection, { params: { id } });
  }
  static async createCollection(collectionData: ICreateCollection) {
    return api.post(ApiRoutes.createRecipeCollection, { collectionData });
  }
  static async deleteCollection(collection_id: string, cloudinary_id: string) {
    return api.delete(ApiRoutes.deleteRecipeCollection, { data: { collection_id, cloudinary_id } });
  }
  static async deleteCollectionFiled(collection_id: string, cloudinary_id: string, collection_filed_id: string) {
    return api.delete(ApiRoutes.deleteRecipeCollectionFiled, {
      data: { collection_id, cloudinary_id, collection_filed_id },
    });
  }
}
