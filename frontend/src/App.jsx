import AppRoutes from "./routes/AppRoutes";
import useAuthInitialize from "./hooks/useAuthInitialize";
import { Toaster } from "react-hot-toast";

export default function App() {

  useAuthInitialize();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0B1120",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
      <AppRoutes />
    </>
  );
}