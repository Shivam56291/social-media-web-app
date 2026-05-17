import { useEffect } from "react";

import { useDispatch } from "react-redux";

import {
  loginSuccess,
  logout,
} from "../features/auth/authSlice";

import { authStorage } from "../services/authStorage";

import { authService } from "../services/authService";

export default function useAuthInitialize() {
  const dispatch = useDispatch();

useEffect(() => {
  const init = async () => {
    try {
      const access = authStorage.getAccess();

      if (!access) return;

      const user = await authService.getCurrentUser();

      dispatch(loginSuccess({
        access,
        user,
      }));

    } catch (err) {
      authStorage.clear();
    }
  };

  init();
}, [dispatch]);
}