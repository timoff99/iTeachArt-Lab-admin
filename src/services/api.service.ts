import axios from "axios";
import Cookies from "js-cookie";

import { ROUTE_NAMES } from "../router/routeNames";
import { ApiUrl } from "../shared/types/routes";

export const API_URL = `${process.env.REACT_APP_API_URI}/api` || ApiUrl.dev;

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  // @ts-ignore: Unreachable code error
  config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      return (window.location.href = ROUTE_NAMES.LOGIN);
    }
    if (error.response.data.message === "User not authorized") {
      return (window.location.href = ROUTE_NAMES.LOGIN);
    }
    return error;
  }
);

export default api;
