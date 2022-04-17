import * as yup from "yup";

import { changePasswordSchema } from "shared/shema/changePassword";

export type IChangePassword = yup.InferType<typeof changePasswordSchema>;
