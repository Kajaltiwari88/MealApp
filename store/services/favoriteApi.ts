import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const favoriteApi = createApi({
  reducerPath: "favoriteApi",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["Favorite"],

  endpoints: (builder) => ({
    getFavorites: builder.query<any, void>({
      query: () => ({
        url: "/api/get-favorites",
        method: "GET",
      }),
      providesTags: ["Favorite"],
    }),

    addFavorite: builder.mutation({
      query: (body) => {
        return {
          url: "/api/add-favorites",
          method: "POST",
          body,
        };
      },
    }),

    removeFavorite: builder.mutation({
      query: (mealId: string) => ({
        url: `/api/remove-favorites/${mealId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorite"],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoriteApi;
