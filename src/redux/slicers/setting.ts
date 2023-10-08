import { SettingsInterface } from "@/types/redux";
import { createSlice } from "@reduxjs/toolkit";
import { setting } from "../api/setting";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/helper";
const isSeeWelcomeAlert = getFromLocalStorage("is_see_welcome_alert");
const themeMode = getFromLocalStorage("theme_mode");

const initialState: SettingsInterface = {
  setting: {
    loading: false,
    settings: [],
    isSeeWelcomeAlert: !!isSeeWelcomeAlert,
    themeMode: themeMode,
  },
  actionsAlert: {
    open: false,
    options: {
      title: "",
      description: "",
      submitText: "",
      canceledText: "",
      renderSubmitButton: undefined,
      renderCanceledButton: undefined,
      confirmText: "",
      type: "success",
    },
  },
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    handleShowActionsAlert: (state, { payload }) => {
      state.actionsAlert.open = payload;
    },
    setActionsAlertOptions: (state, { payload }) => {
      state.actionsAlert.options = payload;
    },
    setSeeWelcomeAlert: (state, { payload }) => {
      setToLocalStorage("is_see_welcome_alert", payload);
      state.setting.isSeeWelcomeAlert = payload;
    },
    setThemeMode: (state, { payload }) => {
      setToLocalStorage("theme_mode", payload);
      state.setting.themeMode = payload;
    },
  },
  extraReducers: (builder) => {
    const { getSettingConfigs } = setting.endpoints;
    builder
      .addMatcher(getSettingConfigs.matchFulfilled, (state, { payload }) => {
        state.setting.settings = payload;
      })
      .addMatcher(getSettingConfigs.matchRejected, (state) => {
        state.setting.settings = [];
      });
  },
});

export const {
  handleShowActionsAlert,
  setActionsAlertOptions,
  setSeeWelcomeAlert,
  setThemeMode,
} = settingSlice.actions;
