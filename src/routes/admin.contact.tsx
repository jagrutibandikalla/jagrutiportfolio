// src/routes/admin.contact.tsx
import { createFileRoute } from "@tanstack/react-router";
import AdminContact from "@/routes/admin/contact";

export const Route = createFileRoute("/admin/contact")({
  component: AdminContact,
});
