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

      state.user = {
        id: action.payload.id,
        username:
          action.payload.username,
        email: action.payload.email,
      };
    },

    logout: (state) => {
      state.access = null;

      state.refresh = null;

      state.user = null;

      authStorage.clear();
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  logout,
} = authSlice.actions;

export default authSlice.reducer;