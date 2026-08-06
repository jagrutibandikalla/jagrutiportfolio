// src/routes/admin.login.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FiMail, FiLock, FiArrowRight, FiAlertCircle } from "react-icons/fi";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  padding: "12px 14px 12px 42px",
  fontSize: "14px",
  color: "rgba(255,255,255,0.85)",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
  boxSizing: "border-box" as const,
  fontFamily: "'Sora', sans-serif",
};

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err.message ?? "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0a0f 0%, #0f0d1a 50%, #080c14 100%)",
        padding: "24px",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 600px 400px at 50% 40%, rgba(167,139,250,0.08), transparent)",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "40px 36px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          }}
        >
          {/* Logo / Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(167,139,250,0.2), rgba(96,165,250,0.2))",
                border: "1px solid rgba(167,139,250,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                }}
              >
                JB
              </div>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", margin: "0 0 6px 0" }}>
              Admin Login
            </h1>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", margin: 0 }}>
              Portfolio CMS · Restricted Access
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: "rgba(248,113,113,0.08)",
                border: "1px solid rgba(248,113,113,0.2)",
                marginBottom: "20px",
                fontSize: "13px",
                color: "rgb(248,113,113)",
              }}
            >
              <FiAlertCircle size={15} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "7px",
                  letterSpacing: "0.04em",
                }}
              >
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <FiMail
                  size={15}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(255,255,255,0.3)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)";
                    e.currentTarget.style.background = "rgba(167,139,250,0.06)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "7px",
                  letterSpacing: "0.04em",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <FiLock
                  size={15}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(255,255,255,0.3)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)";
                    e.currentTarget.style.background = "rgba(167,139,250,0.06)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "13px 24px",
                borderRadius: "11px",
                border: "none",
                background: loading
                  ? "rgba(167,139,250,0.4)"
                  : "linear-gradient(135deg, #a78bfa, #7c3aed)",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                letterSpacing: "0.03em",
                boxShadow: loading ? "none" : "0 4px 20px rgba(167,139,250,0.3)",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(167,139,250,0.4)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = loading
                  ? "none"
                  : "0 4px 20px rgba(167,139,250,0.3)";
              }}
            >
              {loading ? "Signing in..." : (
                <>
                  Sign In <FiArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
          <a href="/" style={{ color: "rgba(167,139,250,0.6)", textDecoration: "none" }}>
            ← Back to portfolio
          </a>
        </p>
      </div>
    </div>
  );
}
