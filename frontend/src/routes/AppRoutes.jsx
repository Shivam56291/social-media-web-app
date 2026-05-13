import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import AuthPage from "../pages/AuthPage";

import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  const { access } = useSelector(
    (state) => state.auth
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          access ? (
            <Navigate
              to="/dashboard"
              replace
            />
          ) : (
            <AuthPage />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}