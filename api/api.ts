import axios from "axios";
import { Platform } from "react-native";

const WEB_URL = "http://localhost:8086";

const MOBILE_URL = "http://10.253.23.36:8086";

const BASE_URL =
  Platform.OS === "web"
    ? WEB_URL
    : MOBILE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (
  token: string | null
) => {
  if (token) {
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common[
      "Authorization"
    ];
  }
};
