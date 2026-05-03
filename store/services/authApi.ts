import {
  createApi,
} from "@reduxjs/toolkit/query/react";

import {
  baseQueryWithReauth,
} from "./baseQuery";

export const authApi =
  createApi({
    reducerPath:
      "authApi",

    baseQuery:
      baseQueryWithReauth,

    endpoints:
      (builder) => ({
        signup:
          builder.mutation({
            query:
              (body) => ({
                url:
                  "/auth/signup",
                method:
                  "POST",
                body,
              }),
          }),

        verifyOtp:
          builder.mutation({
            query:
              (body) => ({
                url:
                  "/auth/verify-otp",
                method:
                  "POST",
                body,
              }),
          }),

        login:
          builder.mutation({
            query:
              (body) => ({
                url:
                  "/auth/login",
                method:
                  "POST",
                body,
              }),
          }),

        logout:
          builder.mutation({
            query:
              (body) => ({
                url:
                  "/auth/logout",
                method:
                  "POST",
                body,
              }),
          }),
      }),
  });

export const {
  useSignupMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;