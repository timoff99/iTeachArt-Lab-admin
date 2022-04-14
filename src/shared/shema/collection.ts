import * as yup from "yup";

export const addCollectionSchema = yup.object({
  title: yup.string().trim().required(),
  file: yup.mixed().required("File is required"),
  collection: yup.array().min(1, "collection is required"),
});
