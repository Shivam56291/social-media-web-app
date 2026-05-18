// src/utils/authStorage.js

export const authStorage = {

  /* ACCESS TOKEN */
  setAccess(token) {

    localStorage.setItem(
      "access",
      token
    );
  },

  getAccess() {

    return localStorage.getItem(
      "access"
    );
  },


  /* USER */
  setUser(user) {

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  },

  getUser() {

    try {

      const user =
        localStorage.getItem(
          "user"
        );

      return user
        ? JSON.parse(user)
        : null;

    } catch {

      return null;
    }
  },


  /* CLEAR */
  clear() {

    localStorage.removeItem(
      "access"
    );

    localStorage.removeItem(
      "user"
    );
  },


  /* CHECK */
  isAuthenticated() {

    return !!this.getAccess();
  }
};