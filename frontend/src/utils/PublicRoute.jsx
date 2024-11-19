import { Navigate, Outlet } from "react-router-dom";
import { LIST } from "../routes";

export function PublicRoute() {
  const isToken = localStorage.getItem("token");
  if (!isToken || isToken === null || isToken === undefined) {
    return <Outlet />;
  } else {
    return <Navigate to={LIST} replace />;
  }
}
