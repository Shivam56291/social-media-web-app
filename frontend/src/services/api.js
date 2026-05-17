// src/services/api.js

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
  },

  (error) => {

    return Promise.reject(
      error
    );
  }
);


/* RESPONSE INTERCEPTOR */
api.interceptors.response.use(
  res => res,

  async (error) => {
    const original = error.config;

    if (
      error.response?.status === 401 &&
      !original._retry
    ) {
      original._retry = true;

      try {
        // 🔥 COOKIE BASED REFRESH CALL
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/users/token/refresh/`,
          {},
          { withCredentials: true }
        );

        const newAccess = res.data.access;

        authStorage.setAccess(newAccess);

        original.headers.Authorization = `Bearer ${newAccess}`;

        return api(original);

      } catch (err) {
        authStorage.clear();
        window.location.href = "/";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export default api;