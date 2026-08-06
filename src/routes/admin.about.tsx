// src/routes/admin.about.tsx
import { createFileRoute } from "@tanstack/react-router";
import AdminAbout from "@/routes/admin/about";

export const Route = createFileRoute("/admin/about")({
  component: AdminAbout,
});
