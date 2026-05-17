import { useEffect } from "react";

import { useDispatch } from "react-redux";

import {
  loginSuccess,
  logout,
} from "../features/auth/authSlice";

import api from "../services/api";

import {
  authStorage,
} from "../services/authStorage";

import {
  authService,
} from "../services/authService";


export default function
useAuthInitialize() {

  const dispatch =
    useDispatch();

  useEffect(() => {

    const init = async () => {

      try {

        let access =
          authStorage.getAccess();

        // try refresh if no access
        if (!access) {

          const response =
            await api.post(
              "/users/token/refresh/"
            );

          access =
            response.data.access;

          authStorage.setAccess(
            access
          );
        }

        const user =
          await authService
            .getCurrentUser();

        dispatch(
          loginSuccess({
            access,
            user,
          })
        );

      } catch (err) {

        authStorage.clear();

        dispatch(logout());
      }
    };

    init();

  }, [dispatch]);
}