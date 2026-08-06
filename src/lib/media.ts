/**
 * media.ts — Single source of truth for all production media URLs.
 *
 * HOW TO USE CLOUDINARY (optional, recommended for best performance):
 * 1. Log into cloudinary.com → Dashboard → copy your Cloud Name
 * 2. Settings → Upload → Add Upload Preset → set to Unsigned → save preset name
 * 3. Upload profile.webp and resume.pdf via Media Library
 * 4. Copy the HTTPS URLs and paste them below as CLOUDINARY_PROFILE_URL
 *    and CLOUDINARY_RESUME_URL, then set USE_CLOUDINARY = true
 *
 * IMMEDIATE FIX (no Cloudinary needed):
 * Leave USE_CLOUDINARY = false. Files in public/ are served by Vercel at /profile.webp
 * and /resume.pdf — this works on every deployment with zero extra setup.
 *
 * NEVER expose CLOUDINARY_API_SECRET in this file or anywhere in src/.
 */

// ─── Cloudinary URLs ──────────────────────────────────────────────────────────
// Replace these with your real Cloudinary HTTPS URLs after uploading.
// Example: "https://res.cloudinary.com/dxxxxxxxx/image/upload/v1234567890/jagruti-portfolio/profile.webp"
const CLOUDINARY_PROFILE_URL = "";
const CLOUDINARY_RESUME_URL  = "";

// Set to true once you have filled in real Cloudinary URLs above.
const USE_CLOUDINARY = false;

// ─── Public-folder fallbacks (always works on Vercel) ─────────────────────────
// Files live in /public/profile.webp and /public/resume.pdf
// Vercel serves public/ as static assets at the root of your domain.
const PUBLIC_PROFILE_URL = "/profile.webp";
const PUBLIC_RESUME_URL  = "/resume.pdf";

// ─── Exported URLs ────────────────────────────────────────────────────────────
export const media = {
  /** Profile photo — used in Hero and About sections */
  profilePhoto: USE_CLOUDINARY && CLOUDINARY_PROFILE_URL
    ? CLOUDINARY_PROFILE_URL
    : PUBLIC_PROFILE_URL,

  /** Resume PDF — used by the Download Resume button */
  resumeUrl: USE_CLOUDINARY && CLOUDINARY_RESUME_URL
    ? CLOUDINARY_RESUME_URL
    : PUBLIC_RESUME_URL,

  /** Fallback photo shown if the primary URL fails to load */
  profilePhotoFallback: PUBLIC_PROFILE_URL,

  /** Fallback resume URL if primary fails */
  resumeUrlFallback: PUBLIC_RESUME_URL,
} as const;
