// src/routes/admin.settings.tsx
import { createFileRoute } from "@tanstack/react-router";
import AdminSettings from "@/routes/admin/settings";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});
