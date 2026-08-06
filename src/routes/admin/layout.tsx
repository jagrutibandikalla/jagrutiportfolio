// src/routes/admin/layout.tsx
import { Outlet, Link, useLocation } from "@tanstack/react-router";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  FiHome,
  FiUser,
  FiBookOpen,
  FiCode,
  FiFolder,
  FiAward,
  FiBook,
  FiStar,
  FiMail,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiExternalLink,
} from "react-icons/fi";

const sections = [
  { name: "Dashboard", path: "/admin", icon: FiHome },
  { name: "Home", path: "/admin/home", icon: FiUser },
  { name: "About", path: "/admin/about", icon: FiBookOpen },
  { name: "Training", path: "/admin/training", icon: FiBook },
  { name: "Skills", path: "/admin/skills", icon: FiCode },
  { name: "Projects", path: "/admin/projects", icon: FiFolder },
  { name: "Certificates", path: "/admin/certificates", icon: FiAward },
  { name: "Education", path: "/admin/education", icon: FiBook },
  { name: "Achievements", path: "/admin/achievements", icon: FiStar },
  { name: "Contact", path: "/admin/contact", icon: FiMail },
  { name: "Settings", path: "/admin/settings", icon: FiSettings },
];

export default function AdminLayout() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0f 0%, #0f0d1a 50%, #080c14 100%)",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? "72px" : "260px",
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          {!collapsed && (
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Admin CMS
              </div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>
                Portfolio Manager
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "7px",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
            }}
          >
            {collapsed ? <FiMenu size={16} /> : <FiX size={16} />}
          </button>
        </div>

        {/* User badge */}
        {!collapsed && user && (
          <div
            style={{
              margin: "16px 14px 8px",
              padding: "10px 12px",
              background: "rgba(167, 139, 250, 0.08)",
              borderRadius: "10px",
              border: "1px solid rgba(167, 139, 250, 0.15)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {user.email?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user.email}
              </div>
              <div style={{ fontSize: "11px", color: "rgba(167, 139, 250, 0.7)" }}>
                Administrator
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
          {sections.map((sec) => {
            const active = isActive(sec.path);
            const Icon = sec.icon;
            return (
              <Link
                key={sec.path}
                to={sec.path}
                activeOptions={{ exact: sec.path === "/admin" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: collapsed ? "10px" : "10px 12px",
                  borderRadius: "10px",
                  marginBottom: "3px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  background: active
                    ? "linear-gradient(90deg, rgba(167,139,250,0.18), rgba(96,165,250,0.10))"
                    : "transparent",
                  border: active
                    ? "1px solid rgba(167,139,250,0.25)"
                    : "1px solid transparent",
                  color: active ? "#e2d9ff" : "rgba(255,255,255,0.45)",
                  justifyContent: collapsed ? "center" : "flex-start",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                  }
                }}
              >
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      bottom: "20%",
                      width: "3px",
                      background: "linear-gradient(180deg, #a78bfa, #60a5fa)",
                      borderRadius: "0 3px 3px 0",
                    }}
                  />
                )}
                <Icon
                  size={16}
                  style={{
                    flexShrink: 0,
                    color: active ? "#a78bfa" : "inherit",
                  }}
                />
                {!collapsed && (
                  <span style={{ fontSize: "13px", fontWeight: active ? 600 : 400 }}>
                    {sec.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: "12px 10px 20px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: collapsed ? "10px" : "10px 12px",
              borderRadius: "10px",
              textDecoration: "none",
              color: "rgba(255,255,255,0.4)",
              fontSize: "13px",
              transition: "all 0.2s",
              justifyContent: collapsed ? "center" : "flex-start",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
            }}
          >
            <FiExternalLink size={15} style={{ flexShrink: 0 }} />
            {!collapsed && <span>View Portfolio</span>}
          </a>
          <button
            onClick={logout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: collapsed ? "10px" : "10px 12px",
              borderRadius: "10px",
              border: "none",
              background: "transparent",
              color: "rgba(248, 113, 113, 0.6)",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s",
              width: "100%",
              justifyContent: collapsed ? "center" : "flex-start",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.08)";
              (e.currentTarget as HTMLElement).style.color = "rgb(248, 113, 113)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "rgba(248, 113, 113, 0.6)";
            }}
          >
            <FiLogOut size={15} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "32px",
          color: "rgba(255,255,255,0.85)",
          minWidth: 0,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
