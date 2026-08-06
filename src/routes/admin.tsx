// src/routes/admin.tsx
// Layout route — wraps all /admin/* routes in auth protection + sidebar layout
import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import AdminLayout from "@/routes/admin/layout";

export const Route = createFileRoute("/admin")({
  component: AdminRoot,
});

function AdminRoot() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return <AdminLayout />;
}
