import { LS_ACCESS_TOKEN, LS_REFRESH_TOKEN } from "../constants/localStorage";
import { toastr } from "react-redux-toastr";
import api from "./api";
import * as jwt from "jsonwebtoken";

let refreshPromise: Promise<void> | null = null;

const shouldRefresh = () => {
  const token = localStorage.getItem(LS_ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(LS_REFRESH_TOKEN);
  if (!refreshToken) return false;
  if (!token) return true;
  const data = jwt.decode(token) as { exp: number };
  return data && data.exp < Date.now() / 1000 + 10;
};

const refreshToken = async () => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = new Promise(async res => {
    const token = localStorage.getItem(LS_REFRESH_TOKEN);
    try {
      const res = await api.post<{ accessToken: string; refreshToken: string }>(
        "/refresh",
        { token }
      );
      localStorage.setItem(LS_ACCESS_TOKEN, res.data.accessToken);
      localStorage.setItem(LS_REFRESH_TOKEN, res.data.refreshToken);
    } catch (error) {
      toastr.error("Error refreshing token", "");
      localStorage.removeItem(LS_ACCESS_TOKEN);
      localStorage.removeItem(LS_REFRESH_TOKEN);
    }
    res();
    refreshPromise = null;
  });
};

export const refreshTokenIfExpired = () => {
  if (shouldRefresh()) return refreshToken();
};

export default api;
