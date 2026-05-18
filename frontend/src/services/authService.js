import api from "./api";

import {
  authStorage
} from "./authStorage";

export const authService = {

  register: async (data) => {

    const response =
      await api.post(
        "/users/register/",
        data
      );

    return response.data;
  },

  login: async (data) => {

    const response =
      await api.post(
        "/users/login/",
        data
      );

    return response.data;
  },

  logout: async () => {

    try {

      await api.post(
        "/users/logout/"
      );

    } catch (error) {

      console.log(error);
    }

    authStorage.clear();
  },

  getCurrentUser: async () => {

    const response =
      await api.get(
        "/users/me/"
      );

    return response.data;
  },

  updateProfile: async (data) => {

    const response =
      await api.patch(
        "/users/me/update/",
        data
      );

    return response.data;
  },

  updateEmail: async (data) => {

    const response =
      await api.patch(
        "/users/update-email/",
        data
      );

    return response.data;
  },

  changePassword: async (data) => {

    const response =
      await api.patch(
        "/users/change-password/",
        data
      );

    return response.data;
  },

  updatePrivacy: async (data) => {

    const response =
      await api.patch(
        "/users/privacy/",
        data
      );

    return response.data;
  },

  deactivateAccount: async () => {

    const response =
      await api.post(
        "/users/deactivate/"
      );

    authStorage.clear();

    return response.data;
  },

  logoutAllDevices: async () => {

    const response =
      await api.post(
        "/users/logout-all/"
      );

    authStorage.clear();

    return response.data;
  }
};