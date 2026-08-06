// src/routes/admin.skills.tsx
import { createFileRoute } from "@tanstack/react-router";
import AdminSkills from "@/routes/admin/skills";

export const Route = createFileRoute("/admin/skills")({
  component: AdminSkills,
});
