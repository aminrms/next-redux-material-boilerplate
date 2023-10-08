import { combineReducers } from "@reduxjs/toolkit";
import { settingSlice } from "../slicers/setting";
import { setting } from "../api/setting";
import { auth } from "../slicers/auth";

export const rootReducer = combineReducers({
  settingSlice: settingSlice.reducer,
  authSlice: auth.reducer,
  [setting.reducerPath]: setting.reducer,
});

export const apiMiddlewares = [setting.middleware];
