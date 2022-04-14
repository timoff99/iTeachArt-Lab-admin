import * as yup from "yup";

import { addCollectionSchema } from "shared/shema/collection";

export type ICollection = yup.InferType<typeof addCollectionSchema>;
