// src/routes/admin.training.tsx
import { createFileRoute } from "@tanstack/react-router";
import AdminTraining from "@/routes/admin/training";

export const Route = createFileRoute("/admin/training")({
  component: AdminTraining,
});
