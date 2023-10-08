import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { RootState } from "./store";
import { getFromLocalStorage } from "@/utils/helper";
import { BASE_URL } from "@/lib/env";
import { Mutex } from "async-mutex";
import { redirect } from "next/navigation";
export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getFromLocalStorage("TOKEN");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const mutex = new Mutex();

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (
    result?.meta?.response?.status === 401 ||
    result?.meta?.response?.status === 403
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        // api.dispatch(logout())
        window.location.href = "/login";
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export default customBaseQuery;
