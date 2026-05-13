// src/routes/AppRoutes.jsx

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import AuthPage from "../pages/AuthPage";

import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";

import FeedPage from "../pages/Dashboard/FeedPage";

import ProfilePage from "../pages/Dashboard/ProfilePage";

import MessagesPage from "../pages/Dashboard/MessagesPage";

import ExplorePage from "../pages/Dashboard/ExplorePage";

import NotificationsPage from "../pages/Dashboard/NotificationsPage";

import SavedPage from "../pages/Dashboard/SavedPage";

export default function AppRoutes() {
  const { access } = useSelector(
    (state) => state.auth
  );

  return (
    <Routes>
      {/* AUTH PAGE */}
      <Route
        path="/"
        element={
          access ? (
            <Navigate
              to="/dashboard/feed"
              replace
            />
          ) : (
            <AuthPage />
          )
        }
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* DEFAULT PAGE */}
        <Route
          index
          element={
            <Navigate
              to="feed"
              replace
            />
          }
        />

        {/* FEED */}
        <Route
          path="feed"
          element={<FeedPage />}
        />

        {/* PROFILE */}
        <Route
          path="profile"
          element={<ProfilePage />}
        />

        {/* MESSAGES */}
        <Route
          path="messages"
          element={<MessagesPage />}
        />

        {/* EXPLORE */}
        <Route
          path="explore"
          element={<ExplorePage />}
        />

        {/* NOTIFICATIONS */}
        <Route
          path="notifications"
          element={<NotificationsPage />}
        />

        {/* SAVED */}
        <Route
          path="saved"
          element={<SavedPage />}
        />
      </Route>
    </Routes>
  );
}