import { configureStore } from "@reduxjs/toolkit";
import { apiMiddlewares, rootReducer } from "./rootReducer";
import { useDispatch } from "react-redux";
import logger from "redux-logger";
import { setting } from "../api/setting";


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(logger)
      .concat(apiMiddlewares),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
