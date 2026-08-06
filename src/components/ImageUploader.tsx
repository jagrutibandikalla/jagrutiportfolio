// src/components/ImageUploader.tsx
import React, { useState, useRef, useEffect } from "react";
import { uploadFile, validateImageFile } from "@/lib/fileUploader";
import { FiUpload, FiTrash2, FiRefreshCw, FiAlertCircle, FiCheck, FiImage } from "react-icons/fi";

interface ImageUploaderProps {
  folder: string; // Cloudinary/Storage folder, e.g., "home", "projects", "certificates"
  currentUrl?: string; // existing image URL
  onUpload: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  maxSizeMB?: number;
}

export default function ImageUploader({
  folder,
  currentUrl,
  onUpload,
  onRemove,
  label,
  maxSizeMB = 10,
}: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(currentUrl);
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(currentUrl);
  }, [currentUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setError(null);
    setSuccessMsg(null);

    if (selected) {
      const valError = validateImageFile(selected, { maxSizeMB });
      if (valError) {
        setError(valError);
        setFile(null);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }

      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setError(null);
    setSuccessMsg(null);

    try {
      const url = await uploadFile(file, folder, {
        maxSizeMB,
        onProgress: (p) => setProgress(p),
      });
      setPreview(url);
      onUpload(url);
      setFile(null);
      setSuccessMsg("Image uploaded successfully to Cloudinary!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(undefined);
    setError(null);
    setSuccessMsg(null);
    if (inputRef.current) inputRef.current.value = "";
    if (onRemove) {
      onRemove();
    } else {
      onUpload("");
    }
  };

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "12px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {label && (
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {label}
        </span>
      )}

      {/* Image Preview Box */}
      {preview ? (
        <div
          style={{
            position: "relative",
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            background: "#0d0b14",
            maxHeight: "220px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={preview}
            alt="Upload Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "220px",
              objectFit: "contain",
              display: "block",
            }}
          />
          {/* Action overlay */}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              display: "flex",
              gap: "8px",
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(8px)",
              padding: "6px 10px",
              borderRadius: "8px",
            }}
          >
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              style={{
                background: "transparent",
                border: "none",
                color: "#a78bfa",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
                fontWeight: 500,
              }}
              title="Replace image"
            >
              <FiRefreshCw size={13} /> Replace
            </button>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              style={{
                background: "transparent",
                border: "none",
                color: "#f87171",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
                fontWeight: 500,
              }}
              title="Remove image"
            >
              <FiTrash2 size={13} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          style={{
            border: "2px dashed rgba(255, 255, 255, 0.15)",
            borderRadius: "10px",
            padding: "28px 16px",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            background: "rgba(255,255,255,0.01)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(167, 139, 250, 0.5)";
            (e.currentTarget as HTMLElement).style.background = "rgba(167, 139, 250, 0.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.15)";
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.01)";
          }}
        >
          <FiImage size={28} style={{ color: "rgba(167, 139, 250, 0.6)", marginBottom: "8px" }} />
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
            Click to select an image
          </div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
            PNG, JPG, WEBP, GIF, SVG up to {maxSizeMB}MB
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      {/* Selected File Details & Upload Button */}
      {file && !uploading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(167, 139, 250, 0.08)",
            border: "1px solid rgba(167, 139, 250, 0.2)",
            borderRadius: "8px",
            padding: "8px 12px",
          }}
        >
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            Ready: <strong style={{ color: "#a78bfa" }}>{file.name}</strong> ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </div>
          <button
            type="button"
            onClick={handleUpload}
            style={{
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              border: "none",
              borderRadius: "6px",
              padding: "6px 14px",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
            }}
          >
            <FiUpload size={14} /> Upload to Cloudinary
          </button>
        </div>
      )}

      {/* Uploading Progress Bar */}
      {uploading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#a78bfa" }}>
            <span>Uploading image...</span>
            <span>{progress}%</span>
          </div>
          <div
            style={{
              height: "6px",
              width: "100%",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
                transition: "width 0.2s ease",
              }}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(248, 113, 113, 0.1)",
            border: "1px solid rgba(248, 113, 113, 0.25)",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "12px",
            color: "#f87171",
          }}
        >
          <FiAlertCircle size={15} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(52, 211, 153, 0.1)",
            border: "1px solid rgba(52, 211, 153, 0.25)",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "12px",
            color: "#34d399",
          }}
        >
          <FiCheck size={15} style={{ flexShrink: 0 }} />
          <span>{successMsg}</span>
        </div>
      )}
    </div>
  );
}
