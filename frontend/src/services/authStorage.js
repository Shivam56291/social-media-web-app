export const authStorage = {
  setAuth(data, remember = true) {

    const storage = remember
      ? localStorage
      : sessionStorage;

    storage.setItem(
      "access",
      data.access
    );

    storage.setItem(
      "refresh",
      data.refresh
    );

    // STORE USER SAFELY
    storage.setItem(
      "user",
      JSON.stringify(
        data.user || null
      )
    );
  },

  getAccess() {
    return (
      localStorage.getItem("access") ||
      sessionStorage.getItem("access")
    );
  },

  getRefresh() {
    return (
      localStorage.getItem("refresh") ||
      sessionStorage.getItem("refresh")
    );
  },

  getUser() {

  try {

    const user =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (!user || user === "undefined") {
      return null;
    }

    return JSON.parse(user);

  } catch (error) {

    return null;
  }
},

  clear() {

    [
      "access",
      "refresh",
      "user",
    ].forEach((key) => {

      localStorage.removeItem(key);

      sessionStorage.removeItem(key);
    });
  },
};