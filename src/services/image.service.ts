import api from "./api.service";
import { ApiRoutes } from "../shared/types/routes";

export default class ImageService {
  static async addImage(formData: FormData) {
    return api.post(ApiRoutes.addImage, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}
