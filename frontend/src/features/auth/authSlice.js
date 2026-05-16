import { createSlice } from "@reduxjs/toolkit";

import { authStorage } from "../../services/authStorage";

const initialState = {
  access: authStorage.getAccess(),
  refresh: authStorage.getRefresh(),
  user: authStorage.getUser(),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (
  state,
  action
) => {

  state.loading = false;

  state.access =
    action.payload.access;

  state.refresh =
    action.payload.refresh;

  state.user =
    action.payload.user;

  /* SAVE AUTH TO STORAGE */
  authStorage.setAuth(
    action.payload,
    action.payload.remember ?? true
  );
},

    logout: (state) => {
      state.access = null;

      state.refresh = null;

      state.user = null;

      authStorage.clear();
    },

    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };

      const storage =
        localStorage.getItem("access")
          ? localStorage
          : sessionStorage;

      storage.setItem(
        "user",
        JSON.stringify(state.user)
      );
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  logout,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;