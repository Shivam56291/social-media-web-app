import api from "./api";

export const authService = {
  register: async (data) => {
    const response = await api.post(
      "users/register/",
      data
    );

    return response.data;
  },

  login: async (data) => {
    const response = await api.post(
      "users/login/",
      data
    );

    return response.data;
  },
};