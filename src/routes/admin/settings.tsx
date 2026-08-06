// src/routes/admin/settings.tsx
import React from "react";
import { FiSettings, FiSliders } from "react-icons/fi";
import { AdminCard, AdminPageHeader } from "@/routes/admin/shared";

export default function AdminSettings() {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <AdminPageHeader
        icon={<FiSettings size={20} />}
        title="Settings"
        desc="Global site configuration and preferences"
      />

      <AdminCard title="Coming Soon">
        <div style={{ padding: "24px 0", textAlign: "center" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(148,163,184,0.08)",
              border: "1px solid rgba(148,163,184,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <FiSliders size={24} style={{ color: "rgba(148,163,184,0.5)" }} />
          </div>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", margin: "0 0 8px 0" }}>
            Site-wide settings
          </p>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", margin: 0, maxWidth: "360px", marginInline: "auto" }}>
            Global configuration options like SEO metadata, theme preferences, and site-wide toggles will appear here in a future update.
          </p>
        </div>
      </AdminCard>
    </div>
  );
}
