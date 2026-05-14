import { Routes, Route, Navigate } from "react-router-dom";
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

import { isProfileComplete } from "../utils/userStatus";

export default function AppRoutes() {
  const { access, user } = useSelector((state) => state.auth);

  const profileDone = isProfileComplete(user);

  return (
    <Routes>
      {/* AUTH */}
      <Route
        path="/"
        element={
          access ? (
            <Navigate
              to={profileDone ? "/dashboard/feed" : "/dashboard/profile"}
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
        <Route
          index
          element={
            <Navigate
              to={profileDone ? "feed" : "profile"}
              replace
            />
          }
        />

        <Route
          path="feed"
          element={
            profileDone ? <FeedPage /> : <Navigate to="/dashboard/profile" replace />
          }
        />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="saved" element={<SavedPage />} />
      </Route>
    </Routes>
  );
}