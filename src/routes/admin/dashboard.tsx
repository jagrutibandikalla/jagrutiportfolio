// src/routes/admin/dashboard.tsx
// Dashboard shown at /admin (index)
import React from "react";
import { Link } from "@tanstack/react-router";
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
  FiArrowRight,
} from "react-icons/fi";

const cards = [
  {
    name: "Home",
    path: "/admin/home",
    icon: FiHome,
    desc: "Name, roles, profile photo & hero background",
    color: "#a78bfa",
  },
  {
    name: "About",
    path: "/admin/about",
    icon: FiUser,
    desc: "Story blocks and personal summary sections",
    color: "#60a5fa",
  },
  {
    name: "Training",
    path: "/admin/training",
    icon: FiBook,
    desc: "Courses, workshops and learning programmes",
    color: "#34d399",
  },
  {
    name: "Skills",
    path: "/admin/skills",
    icon: FiCode,
    desc: "Technical skills with categories and levels",
    color: "#f59e0b",
  },
  {
    name: "Projects",
    path: "/admin/projects",
    icon: FiFolder,
    desc: "Portfolio projects with images and links",
    color: "#f472b6",
  },
  {
    name: "Certificates",
    path: "/admin/certificates",
    icon: FiAward,
    desc: "Earned certificates and professional badges",
    color: "#fb923c",
  },
  {
    name: "Education",
    path: "/admin/education",
    icon: FiBookOpen,
    desc: "Academic qualifications and institutions",
    color: "#818cf8",
  },
  {
    name: "Achievements",
    path: "/admin/achievements",
    icon: FiStar,
    desc: "Milestones, awards and recognitions",
    color: "#fbbf24",
  },
  {
    name: "Contact",
    path: "/admin/contact",
    icon: FiMail,
    desc: "Email, phone and social media links",
    color: "#2dd4bf",
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: FiSettings,
    desc: "Global site settings and configuration",
    color: "#94a3b8",
  },
];

export default function AdminDashboard() {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 14px",
            borderRadius: "100px",
            background: "rgba(167,139,250,0.1)",
            border: "1px solid rgba(167,139,250,0.2)",
            fontSize: "12px",
            color: "#a78bfa",
            marginBottom: "16px",
            fontWeight: 500,
            letterSpacing: "0.06em",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#a78bfa",
              boxShadow: "0 0 8px #a78bfa",
              animation: "pulse 2s infinite",
            }}
          />
          Portfolio CMS
        </div>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 8px 0",
            lineHeight: 1.2,
          }}
        >
          {greeting}, Jagruti 👋
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", margin: 0 }}>
          Manage your portfolio content from here. Select a section to get started.
        </p>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
          marginBottom: "40px",
        }}
      >
        {[
          { label: "Total Sections", value: "10", sub: "All editable" },
          { label: "Projects", value: "3", sub: "Live & in-dev" },
          { label: "Certificates", value: "8+", sub: "Earned" },
          { label: "Skills", value: "30+", sub: "Across 8 categories" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: "18px 20px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "3px" }}>
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Section cards */}
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Content Sections
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "14px",
          }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.path}
                to={card.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "18px 20px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                  transition: "all 0.22s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${card.color}10`;
                  el.style.border = `1px solid ${card.color}30`;
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = `0 8px 30px ${card.color}15`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.03)";
                  el.style.border = "1px solid rgba(255,255,255,0.06)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "11px",
                    background: `${card.color}15`,
                    border: `1px solid ${card.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} style={{ color: card.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.85)",
                      marginBottom: "3px",
                    }}
                  >
                    {card.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.38)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {card.desc}
                  </div>
                </div>
                <FiArrowRight size={14} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
