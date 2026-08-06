// src/routes/admin/contact.tsx
import React, { useEffect, useState } from "react";
import { useContactData, useUpdateContact, ContactInfo } from "@/queries/contact";
import { FiMail } from "react-icons/fi";
import {
  AdminCard,
  AdminField,
  AdminInput,
  AdminSaveButton,
  AdminPageHeader,
} from "@/routes/admin/shared";

export default function AdminContact() {
  const { data: contact, isLoading } = useContactData();
  const updateContact = useUpdateContact();

  const [form, setForm] = useState<ContactInfo>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (contact) setForm(contact);
  }, [contact]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px" }}>Loading...</div>
      </div>
    );
  }

  const handleChange = (field: keyof ContactInfo, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    await updateContact.mutateAsync(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <AdminPageHeader
        icon={<FiMail size={20} />}
        title="Contact Information"
        desc="Update your publicly displayed contact details and social links"
      />

      <AdminCard title="Contact Details">
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <AdminField label="Email Address">
            <AdminInput
              type="email"
              value={form.email ?? ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="your@email.com"
            />
          </AdminField>
          <AdminField label="Phone">
            <AdminInput
              value={form.phone ?? ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+91 XXXXX XXXXX"
            />
          </AdminField>
          <AdminField label="Address / Location">
            <AdminInput
              value={form.address ?? ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="e.g. Chirala, Andhra Pradesh, India"
            />
          </AdminField>
        </div>
      </AdminCard>

      <AdminCard title="Social Links">
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <AdminField label="LinkedIn URL">
            <AdminInput
              value={form.linkedin ?? ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/..."
            />
          </AdminField>
          <AdminField label="GitHub URL">
            <AdminInput
              value={form.github ?? ""}
              onChange={(e) => handleChange("github", e.target.value)}
              placeholder="https://github.com/..."
            />
          </AdminField>
        </div>
      </AdminCard>

      <AdminSaveButton onClick={handleSave} loading={updateContact.isPending} saved={saved} />
    </div>
  );
}
