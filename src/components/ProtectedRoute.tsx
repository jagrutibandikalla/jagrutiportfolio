import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "@tanstack/react-router";

export const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};
