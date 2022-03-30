import React, { FC } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import AuthService from "services/auth.service";

import { LoginView } from "../components";
import { CustomError } from "shared/interfaces/CustomError";
import { ROUTE_NAMES } from "router/routeNames";
import { CookiesType } from "shared/types/routes";

const loginSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
type ILogin = yup.InferType<typeof loginSchema>;

export const LoginContainer: FC = () => {
  const navigation = useNavigate();

  const successNotify = (msg: string) => {
    return toast.success(msg);
  };

  const errorNotify = (errors: { message: string }) => {
    if (errors?.message) {
      return toast.error(errors.message);
    }
  };

  const onSubmit = async (values: ILogin) => {
    try {
      const loginData = await AuthService.login(values.email, values.password);
      if (!loginData.data) {
        throw loginData;
      }
      Cookies.set(CookiesType.token, loginData.data.token);

      successNotify("user login");
      setTimeout(() => {
        navigation(ROUTE_NAMES.HOME, { replace: true });
      }, 1000);
      return true;
    } catch (error) {
      return errorNotify((error as CustomError).response.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return <LoginView formik={formik} />;
};
