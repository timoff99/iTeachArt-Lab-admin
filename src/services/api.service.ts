import axios from "axios";

export const API_URL = "http://localhost:5000/api";

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
      return (window.location.href = "/login");
    }
    return error;
  }
);

export default api;
