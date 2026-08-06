// src/routes/admin/shared.tsx
// Shared styled primitives for all admin CMS pages
import React, { type ReactNode, type CSSProperties } from "react";
import { FiCheck, FiSave, FiLoader } from "react-icons/fi";

// ─── Page header ───────────────────────────────────────────────────────────

export function AdminPageHeader({
  icon,
  title,
  desc,
}: {
  icon: ReactNode;
  title: string;
  desc?: string;
}) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: "rgba(167,139,250,0.12)",
            border: "1px solid rgba(167,139,250,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a78bfa",
          }}
        >
          {icon}
        </div>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", margin: 0 }}>{title}</h1>
      </div>
      {desc && (
        <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "13px", margin: "0 0 0 50px" }}>
          {desc}
        </p>
      )}
    </div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────

export function AdminCard({
  title,
  children,
  action,
}: {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        marginBottom: "16px",
        overflow: "hidden",
      }}
    >
      {title && (
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {title}
          </span>
          {action}
        </div>
      )}
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

// ─── Item card (for list items like projects, skills, etc.) ────────────────

export function AdminItemCard({
  index,
  label,
  onDelete,
  children,
}: {
  index: number;
  label: string;
  onDelete: () => void;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
        marginBottom: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "rgba(167,139,250,0.7)",
            letterSpacing: "0.05em",
          }}
        >
          {label} #{index + 1}
        </span>
        <button
          type="button"
          onClick={onDelete}
          style={{
            background: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.15)",
            borderRadius: "7px",
            padding: "5px 10px",
            color: "rgba(248,113,113,0.8)",
            fontSize: "12px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.15)";
            (e.currentTarget as HTMLElement).style.color = "rgb(248,113,113)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.08)";
            (e.currentTarget as HTMLElement).style.color = "rgba(248,113,113,0.8)";
          }}
        >
          Remove
        </button>
      </div>
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Form fields ───────────────────────────────────────────────────────────

export function AdminLabel({ children }: { children: ReactNode }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: "12px",
        fontWeight: 500,
        color: "rgba(255,255,255,0.5)",
        marginBottom: "6px",
        letterSpacing: "0.04em",
      }}
    >
      {children}
    </label>
  );
}

const inputStyle: CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "9px",
  padding: "10px 13px",
  fontSize: "14px",
  color: "rgba(255,255,255,0.82)",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={inputStyle}
      onFocus={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.45)";
        (e.currentTarget as HTMLElement).style.background = "rgba(167,139,250,0.06)";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
        props.onBlur?.(e);
      }}
    />
  );
}

export function AdminTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      style={{
        ...inputStyle,
        minHeight: "90px",
        resize: "vertical",
        lineHeight: 1.6,
        ...(props.style ?? {}),
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.45)";
        (e.currentTarget as HTMLElement).style.background = "rgba(167,139,250,0.06)";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
        props.onBlur?.(e);
      }}
    />
  );
}

// ─── Field group ───────────────────────────────────────────────────────────

export function AdminField({
  label,
  children,
  col,
}: {
  label: string;
  children: ReactNode;
  col?: string;
}) {
  return (
    <div style={{ gridColumn: col }}>
      <AdminLabel>{label}</AdminLabel>
      {children}
    </div>
  );
}

// ─── Save button ───────────────────────────────────────────────────────────

export function AdminSaveButton({
  onClick,
  loading,
  saved,
  label = "Save Changes",
}: {
  onClick: () => void;
  loading?: boolean;
  saved?: boolean;
  label?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px", gap: "12px" }}>
      <button
        onClick={onClick}
        disabled={loading}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "11px 24px",
          borderRadius: "10px",
          border: "none",
          background: saved
            ? "linear-gradient(135deg, #34d399, #059669)"
            : "linear-gradient(135deg, #a78bfa, #7c3aed)",
          color: "#fff",
          fontSize: "13px",
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "all 0.3s ease",
          letterSpacing: "0.03em",
          boxShadow: saved
            ? "0 4px 20px rgba(52,211,153,0.3)"
            : "0 4px 20px rgba(167,139,250,0.3)",
          fontFamily: "inherit",
        }}
      >
        {loading ? (
          <FiLoader size={14} style={{ animation: "spin 1s linear infinite" }} />
        ) : saved ? (
          <FiCheck size={14} />
        ) : (
          <FiSave size={14} />
        )}
        {saved ? "Saved!" : label}
      </button>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Add button ────────────────────────────────────────────────────────────

export function AdminAddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "9px 18px",
        borderRadius: "9px",
        border: "1px solid rgba(167,139,250,0.25)",
        background: "rgba(167,139,250,0.08)",
        color: "#a78bfa",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(167,139,250,0.15)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(167,139,250,0.08)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.25)";
      }}
    >
      <span style={{ fontSize: "16px", lineHeight: 1 }}>+</span>
      {label}
    </button>
  );
}
