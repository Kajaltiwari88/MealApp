import { getItem } from "@/utils/secureStorage";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";

const WEB_URL =process.env.EXPO_WEB_URL;
const MOBILE_URL =process.env.EXPO_MOBILE_URL;

const BASE_URL = Platform.OS === "web" ? WEB_URL : MOBILE_URL;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,

  prepareHeaders: async (headers) => {
    const token = await getItem("accessToken");

    console.log("Token:", token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  console.log("ARGS:", args);

  const result = await rawBaseQuery(args, api, extraOptions);

  console.log("RTK Result:", result);

  return result;
};
