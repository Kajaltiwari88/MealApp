import { getItem, removeItem, saveItem } from "@/utils/secureStorage";
import {
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";

const WEB_URL =
  "http://localhost:8086";

const MOBILE_URL =
  "http://10.179.33.36:8086";

const BASE_URL =
  Platform.OS === "web"
    ? WEB_URL
    : MOBILE_URL;

const rawBaseQuery =
  fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders:
      async (headers) => {
        const token =
          await getItem(
            "accessToken"
          );

        if (token) {
          headers.set(
            "Authorization",
            `Bearer ${token}`
          );
        }

        return headers;
      },
  });

export const baseQueryWithReauth =
  async (
    args: any,
    api: any,
    extraOptions: any
  ) => {
    let result =
      await rawBaseQuery(
        args,
        api,
        extraOptions
      );

    if (
      result.error &&
      result.error.status === 401
    ) {
      const refreshToken =
        await getItem(
          "refreshToken"
        );

      if (!refreshToken) {
        await removeItem(
          "accessToken"
        );
        await removeItem(
          "refreshToken"
        );
        return result;
      }

      const refreshResult =
        await rawBaseQuery(
          {
            url:
              "/auth/refresh-token",
            method: "POST",
            body: {
              refreshToken,
            },
          },
          api,
          extraOptions
        );

      if (
        refreshResult?.data
      ) {
        const newAccessToken =
          (
            refreshResult.data as any
          )?.accessToken;

        await saveItem(
          "accessToken",
          newAccessToken
        );

        result =
          await rawBaseQuery(
            args,
            api,
            extraOptions
          );
      } else {
        await removeItem(
          "accessToken"
        );
        await removeItem(
          "refreshToken"
        );
      }
    }

    return result;
  };