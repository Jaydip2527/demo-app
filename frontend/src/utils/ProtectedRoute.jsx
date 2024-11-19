import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const isToken = localStorage.getItem("token");
  if (isToken || isToken !== null) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
}
