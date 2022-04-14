import axios from "axios";

import { ROUTE_NAMES } from "../router/routeNames";
import { ApiUrl } from "../shared/types/routes";

export const API_URL = `${process.env.REACT_APP_API_URI}/api` || ApiUrl.dev;

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.message === "User not authorized") {
      return (window.location.href = ROUTE_NAMES.LOGIN);
    }
    return error;
  }
);

export default api;
