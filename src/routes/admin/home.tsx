// src/routes/admin/home.tsx
import React, { useEffect, useState } from "react";
import { useHomeData, useUpdateHome, HomeData } from "@/queries/home";
import ImageUploader from "@/components/ImageUploader";
import { FiSave, FiUser } from "react-icons/fi";
import { AdminCard, AdminInput, AdminLabel, AdminSaveButton, AdminPageHeader } from "@/routes/admin/shared";

export default function AdminHome() {
  const { data: home, isLoading } = useHomeData();
  const updateHome = useUpdateHome();
  const [form, setForm] = useState<HomeData | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (home) setForm(home);
  }, [home]);

  if (isLoading || !form) {
    return <AdminLoadingState />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => prev && { ...prev, [name]: value } as HomeData);
  };

  const handleSave = async () => {
    if (form) {
      await updateHome.mutateAsync(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <AdminPageHeader
        icon={<FiUser size={20} />}
        title="Home Section"
        desc="Edit your name, contact info, and hero images"
      />

      <AdminCard title="Personal Details">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <AdminLabel>First Name</AdminLabel>
            <AdminInput name="firstName" value={form.firstName} onChange={handleChange} />
          </div>
          <div>
            <AdminLabel>Last Name</AdminLabel>
            <AdminInput name="lastName" value={form.lastName} onChange={handleChange} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <AdminLabel>Location</AdminLabel>
            <AdminInput name="location" value={form.location} onChange={handleChange} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <AdminLabel>Email</AdminLabel>
            <AdminInput name="email" value={form.email} onChange={handleChange} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <AdminLabel>GitHub URL</AdminLabel>
            <AdminInput name="github" value={form.github} onChange={handleChange} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <AdminLabel>LinkedIn URL</AdminLabel>
            <AdminInput name="linkedin" value={form.linkedin} onChange={handleChange} />
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Profile Photo">
        <ImageUploader
          folder="home"
          currentUrl={form.photoUrl}
          onUpload={(url) => setForm((prev) => prev && { ...prev, photoUrl: url })}
        />
      </AdminCard>

      <AdminCard title="Hero Background Image">
        <ImageUploader
          folder="home"
          currentUrl={form.backgroundUrl}
          onUpload={(url) => setForm((prev) => prev && { ...prev, backgroundUrl: url })}
        />
      </AdminCard>

      <AdminSaveButton onClick={handleSave} loading={updateHome.isPending} saved={saved} />
    </div>
  );
}

function AdminLoadingState() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px" }}>Loading...</div>
    </div>
  );
}
