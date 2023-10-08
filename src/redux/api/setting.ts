import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customBaseQuery, { baseQuery } from "../setup/instance";
import { RootState } from "../setup/store";

export const setting = createApi({
  reducerPath: "settingApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getSettingConfigs: builder.query({
      query: () => "/posts",
    }),
    updatePost: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: "/post",
        method: "POST",
        body: rest,
      }),
    }),
  }),
});

export const { useGetSettingConfigsQuery } = setting;
