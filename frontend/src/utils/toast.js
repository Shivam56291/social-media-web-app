import toast from "react-hot-toast";

const baseStyle = {
  background: "#0B1120",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.1)",
};

export const showToast = {
  success: (message) =>
    toast.success(message, {
      style: baseStyle,
      iconTheme: {
        primary: "#22c55e",
        secondary: "#0B1120",
      },
    }),

  error: (message) =>
    toast.error(message, {
      style: baseStyle,
      iconTheme: {
        primary: "#ef4444",
        secondary: "#0B1120",
      },
    }),

  info: (message) =>
    toast(message, {
      icon: "👤",
      style: baseStyle,
    }),

  warning: (message) =>
    toast(message, {
      icon: "⚠️",
      style: baseStyle,
    }),
};