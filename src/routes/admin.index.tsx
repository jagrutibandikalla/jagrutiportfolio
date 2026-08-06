// src/routes/admin.index.tsx
// This is the index route for /admin — shown when visiting /admin directly
import { createFileRoute } from "@tanstack/react-router";
import AdminDashboard from "@/routes/admin/dashboard";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});
