// src/routes/admin.projects.tsx
import { createFileRoute } from "@tanstack/react-router";
import AdminProjects from "@/routes/admin/projects";

export const Route = createFileRoute("/admin/projects")({
  component: AdminProjects,
});
