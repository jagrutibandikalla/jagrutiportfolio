// src/routes/admin.education.tsx
import { createFileRoute } from "@tanstack/react-router";
import AdminEducation from "@/routes/admin/education";

export const Route = createFileRoute("/admin/education")({
  component: AdminEducation,
});
