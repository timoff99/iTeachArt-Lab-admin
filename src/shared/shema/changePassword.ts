import * as yup from "yup";

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().trim().required(),
  newPassword: yup
    .string()
    .trim()
    .required("Please enter new password")
    .matches(
      /^.*(?=.{5,})(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d)(?=.*[a-z,A-Z])/,
      "New pass must contain at least 5 characters, one uppercase, one number and one special case character"
    ),
});
