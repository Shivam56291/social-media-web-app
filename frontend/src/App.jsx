import AppRoutes from "./routes/AppRoutes";
import useAuthInitialize from "./hooks/useAuthInitialize";

export default function App() {

  useAuthInitialize();

  return <AppRoutes />;
}