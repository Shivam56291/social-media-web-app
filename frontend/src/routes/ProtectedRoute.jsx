import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function ProtectedRoute({
  children,
}) {
  const { access } = useSelector(
    (state) => state.auth
  );

  if (!access) {
    return <Navigate to="/" replace />;
  }

  return children;
}