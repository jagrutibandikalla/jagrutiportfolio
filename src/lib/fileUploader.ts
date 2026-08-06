// src/lib/fileUploader.ts
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export interface UploadOptions {
  onProgress?: (progress: number) => void;
  maxSizeMB?: number;
  allowedTypes?: string[];
}

const DEFAULT_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
];

const DEFAULT_MAX_SIZE_MB = 10;

/**
 * Validate image file type and size.
 */
export function validateImageFile(file: File, options?: UploadOptions): string | null {
  const allowedTypes = options?.allowedTypes ?? DEFAULT_ALLOWED_TYPES;
  const maxSizeMB = options?.maxSizeMB ?? DEFAULT_MAX_SIZE_MB;

  if (!file.type || !allowedTypes.includes(file.type.toLowerCase())) {
    return `Invalid file type (${file.type || "unknown"}). Allowed formats: JPG, PNG, WEBP, GIF, SVG, AVIF.`;
  }

  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return `File size exceeds the ${maxSizeMB}MB limit (selected: ${(file.size / (1024 * 1024)).toFixed(2)}MB).`;
  }

  return null;
}

/**
 * Upload an image file to Cloudinary (or fallback to Firebase Storage).
 * Returns a Promise that resolves with the secure HTTPS image URL.
 */
export async function uploadFile(
  file: File,
  folder: string = "portfolio",
  options?: UploadOptions
): Promise<string> {
  // 1. Validate file
  const error = validateImageFile(file, options);
  if (error) {
    throw new Error(error);
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // If Cloudinary credentials are missing or set to defaults without a valid preset, fallback to Firebase Storage
  if (cloudName && uploadPreset && uploadPreset !== "portfolio_preset") {
    return uploadToCloudinary(file, folder, cloudName, uploadPreset, options?.onProgress);
  }

  // Fallback to Cloudinary or Firebase Storage if configured
  if (cloudName && uploadPreset) {
    try {
      return await uploadToCloudinary(file, folder, cloudName, uploadPreset, options?.onProgress);
    } catch (err: any) {
      console.warn("Cloudinary upload failed, falling back to Firebase Storage:", err.message);
    }
  }

  return uploadToFirebaseStorage(file, folder, options?.onProgress);
}

/**
 * Perform unsigned upload to Cloudinary using XMLHttpRequest for progress tracking.
 */
function uploadToCloudinary(
  file: File,
  folder: string,
  cloudName: string,
  uploadPreset: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", `jagruti-portfolio/${folder}`);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", url);

    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.secure_url) {
            resolve(response.secure_url);
          } else {
            reject(new Error("Cloudinary response missing secure_url"));
          }
        } catch (e) {
          reject(new Error("Failed to parse Cloudinary response"));
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText);
          reject(new Error(errRes.error?.message || `Cloudinary upload error (${xhr.status})`));
        } catch {
          reject(new Error(`Cloudinary upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error during Cloudinary image upload. Check internet connection."));
    };

    xhr.send(formData);
  });
}

/**
 * Fallback uploader to Firebase Storage.
 */
function uploadToFirebaseStorage(
  file: File,
  folder: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (onProgress && snapshot.totalBytes > 0) {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          onProgress(percent);
        }
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
}
