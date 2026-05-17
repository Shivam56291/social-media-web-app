import api from "./api";

export const authService = {
  register: async (data) => {
    const response = await api.post(
      "/users/register/",
      data
    );

    return response.data;
  },

  login: async (data) => {
  const response = await api.post(
    "/users/login/",
    data
  );

  return response.data;
},

  getCurrentUser: async () => {
    const response = await api.get(
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

  /* UPDATE EMAIL */
updateEmail: async (
  data
) => {

  const response =
    await api.patch(
      "/users/update-email/",
      data
    );

  return response.data;
},

/* CHANGE PASSWORD */
changePassword: async (data) => {

    const response =
      await api.patch(
        "/users/change-password/",
        data
      );

    return response.data;
  },

/* UPDATE PRIVACY */
updatePrivacy: async (data) => {

    const response =
      await api.patch(
        "/users/privacy/",
        data
      );

    return response.data;
  },

/* DEACTIVATE ACCOUNT */
deactivateAccount: async () => {

    const response =
      await api.post(
        "/users/deactivate/"
      );

    return response.data;
  },

/* LOGOUT ALL DEVICES */
logoutAllDevices: async () => {

  const response =
    await api.post(
      "/users/logout-all/"
    );

  return response.data;
}
};