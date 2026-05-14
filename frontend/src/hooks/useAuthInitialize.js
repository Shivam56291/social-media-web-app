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
    const initializeAuth = async () => {
      try {
        const access =
          authStorage.getAccess();

        const refresh =
          authStorage.getRefresh();

        if (!access || !refresh)
          return;

        const user =
          await authService.getCurrentUser();

        dispatch(
          loginSuccess({
            access,
            refresh,
            user,
          })
        );
      } catch (error) {
        dispatch(logout());
      }
    };

    initializeAuth();
  }, [dispatch]);
}