import axios from "axios";

import {
  authStorage,
} from "./authStorage";


const api = axios.create({

  baseURL:
    import.meta.env
      .VITE_API_BASE_URL,

  withCredentials: true,
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
  },

  (error) => {

    return Promise.reject(
      error
    );
  }
);


/* RESPONSE INTERCEPTOR */
api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    // avoid infinite retry loop
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/users/token/refresh/"
    ) {

      originalRequest._retry = true;

      try {

        const response =
          await api.post(
            "/users/token/refresh/"
          );

        const newAccess =
          response.data.access;

        authStorage.setAccess(
          newAccess
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        return api(
          originalRequest
        );

      } catch (refreshError) {

        authStorage.clear();

        window.location.href = "/";

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error);
  }
);


export default api;