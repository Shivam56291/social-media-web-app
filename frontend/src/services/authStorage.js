export const authStorage = {
  setAccess(token) {
    sessionStorage.setItem("access", token);
  },

  getAccess() {
    return sessionStorage.getItem("access");
  },

  setUser(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
  },

  getUser() {
    try {
      return JSON.parse(sessionStorage.getItem("user"));
    } catch {
      return null;
    }
  },

  clear() {
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("user");
  }
};