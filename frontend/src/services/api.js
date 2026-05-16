import axios from "axios";

import {
  authStorage,
} from "./authStorage";

const api = axios.create({
  baseURL:
    import.meta.env
      .VITE_API_BASE_URL,
});

/* REQUEST INTERCEPTOR */
api.interceptors.request.use(
  (config) => {

    const token =
      authStorage.getAccess();

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

/* RESPONSE INTERCEPTOR */
api.interceptors.response.use(

  /* SUCCESS */
  (response) => response,

  /* ERROR */
  async (error) => {

    const originalRequest =
      error.config;

    /* TOKEN EXPIRED */
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry =
        true;

      try {

        const refresh =
          authStorage.getRefresh();

        /* NO REFRESH TOKEN */
        if (!refresh) {

          authStorage.clear();

          window.location.href = "/";

          return Promise.reject(
            error
          );
        }

        /* GET NEW ACCESS TOKEN */
        const response =
          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/users/token/refresh/`,
            {
              refresh,
            }
          );

        const {
  access,
  refresh: newRefresh,
} = response.data;

/* SAVE NEW ACCESS */
authStorage.setAccessToken(
  access
);

/* SAVE NEW REFRESH */
if (newRefresh) {
  authStorage.setRefreshToken(
    newRefresh
  );
}

        /* UPDATE HEADER */
        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        /* RETRY ORIGINAL REQUEST */
        return api(
          originalRequest
        );

      } catch (refreshError) {

        console.log(
          "Refresh failed",
          refreshError
        );

        /* FORCE LOGOUT */
        authStorage.clear();

        window.location.href =
          "/";

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(
      error
    );
  }
);

export default api;