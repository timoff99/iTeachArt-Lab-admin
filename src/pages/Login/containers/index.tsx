import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import AuthService from "services/auth.service";

import { LoginView } from "../components";
import { CustomError } from "shared/interfaces/CustomError";
import { ROUTE_NAMES } from "router/routeNames";
import { CookiesType } from "shared/types/routes";
import { loginSchema } from "shared/shema/login";
import { ILogin } from "shared/types/login";
import { useState } from "react";

export const LoginContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(true);
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
    } finally {
      setLoading(false);
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

  return <LoginView formik={formik} loading={loading} />;
};
