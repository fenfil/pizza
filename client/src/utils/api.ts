import axios from "axios";
import { LS_ACCESS_TOKEN } from "../constants/localStorage";
import { toastr } from "react-redux-toastr";
import { refreshTokenIfExpired } from "./tokens";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(async config => {
  await refreshTokenIfExpired();
  const token = localStorage.getItem(LS_ACCESS_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  config => {
    return config;
  },
  err => {
    toastr.error(err.response.data, "");
    return Promise.reject(err);
  }
);

export default api;
