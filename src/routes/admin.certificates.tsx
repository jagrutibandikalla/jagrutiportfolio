// src/routes/admin.certificates.tsx
import { createFileRoute } from "@tanstack/react-router";
import AdminCertificates from "@/routes/admin/certificates";

export const Route = createFileRoute("/admin/certificates")({
  component: AdminCertificates,
});
