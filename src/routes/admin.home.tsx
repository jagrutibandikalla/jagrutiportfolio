// src/routes/admin.home.tsx
import { createFileRoute } from "@tanstack/react-router";
import AdminHome from "@/routes/admin/home";

export const Route = createFileRoute("/admin/home")({
  component: AdminHome,
});
