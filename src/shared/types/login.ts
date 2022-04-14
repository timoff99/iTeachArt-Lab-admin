import * as yup from "yup";

import { loginSchema } from "shared/shema/login";

export type ILogin = yup.InferType<typeof loginSchema>;
