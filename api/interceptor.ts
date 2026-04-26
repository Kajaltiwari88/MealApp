import { instance, setAuthToken } from "./api";
import * as SecureStore from "expo-secure-store";

instance.interceptors.response.use(
  res => res,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      if (!refreshToken) return Promise.reject(error);

      try {
        const res = await instance.post("/auth/refresh", { refreshToken });

        const newToken = res?.data?.accessToken;

        setAuthToken(newToken);
        error.config.headers.Authorization = `Bearer ${newToken}`;

        return instance(error?.config);

      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);