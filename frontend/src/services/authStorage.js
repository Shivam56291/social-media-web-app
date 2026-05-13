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

    storage.setItem(
      "user",
      JSON.stringify({
        id: data.id,
        username: data.username,
        email: data.email,
      })
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
    const user =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    return user ? JSON.parse(user) : null;
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