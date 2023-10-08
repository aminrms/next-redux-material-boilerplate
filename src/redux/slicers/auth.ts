import { AuthInterface } from "@/types/redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthInterface = {
  login: {
    email: "",
    password: "",
  },
  register: {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    accountType: "",
  },
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleChangeLoginForm: (state, { payload }) => {
      state.login = { ...state.login, [payload?.key]: payload?.value };
    },
    handleChangeRegisterForm: (state, { payload }) => {
      state.register = { ...state.register, [payload?.key]: payload?.value };
    },
  },
  extraReducers: (builder) => {},
});

export const { handleChangeLoginForm, handleChangeRegisterForm } = auth.actions;
