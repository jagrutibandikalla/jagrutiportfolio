// src/routes/admin.achievements.tsx
import { createFileRoute } from "@tanstack/react-router";
import AdminAchievements from "@/routes/admin/achievements";

export const Route = createFileRoute("/admin/achievements")({
  component: AdminAchievements,
});
