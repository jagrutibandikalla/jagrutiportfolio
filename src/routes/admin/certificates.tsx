// src/routes/admin/certificates.tsx
import React, { useEffect, useState } from "react";
import {
  useCertificatesData,
  useAddCertificate,
  useUpdateCertificate,
  useDeleteCertificate,
  CertificateItem,
} from "@/queries/certificates";
import ImageUploader from "@/components/ImageUploader";
import { FiAward } from "react-icons/fi";
import {
  AdminCard,
  AdminItemCard,
  AdminField,
  AdminInput,
  AdminSaveButton,
  AdminAddButton,
  AdminPageHeader,
} from "@/routes/admin/shared";

export default function AdminCertificates() {
  const { data: items, isLoading } = useCertificatesData();
  const addCert = useAddCertificate();
  const updateCert = useUpdateCertificate();
  const deleteCert = useDeleteCertificate();

  const [editable, setEditable] = useState<CertificateItem[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (items) setEditable(items.map((i) => ({ ...i })));
  }, [items]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px" }}>Loading...</div>
      </div>
    );
  }

  const handleChange = (idx: number, field: keyof CertificateItem, value: string) => {
    setEditable((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value } as CertificateItem;
      return copy;
    });
  };

  const handleAdd = () =>
    setEditable((prev) => [...prev, { title: "", issuer: "", date: "", url: "" }]);

  const handleDelete = async (idx: number) => {
    const cert = editable[idx];
    if (cert.id) await deleteCert.mutateAsync(cert.id);
    setEditable((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSaveAll = async () => {
    for (const cert of editable) {
      if (cert.id) await updateCert.mutateAsync(cert);
      else
        await addCert.mutateAsync({
          title: cert.title,
          issuer: cert.issuer,
          date: cert.date,
          url: cert.url,
        });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <AdminPageHeader
        icon={<FiAward size={20} />}
        title="Certificates Section"
        desc="Manage earned certificates and professional badges"
      />

      <AdminCard
        title={`Certificates (${editable.length})`}
        action={<AdminAddButton onClick={handleAdd} label="Add Certificate" />}
      >
        {editable.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>
            No certificates yet.
          </p>
        )}
        {editable.map((cert, idx) => (
          <AdminItemCard key={idx} index={idx} label="Certificate" onDelete={() => handleDelete(idx)}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <AdminField label="Title" col="1 / -1">
                <AdminInput
                  value={cert.title}
                  onChange={(e) => handleChange(idx, "title", e.target.value)}
                  placeholder="e.g. Python Essentials 1"
                />
              </AdminField>
              <AdminField label="Issuer">
                <AdminInput
                  value={cert.issuer}
                  onChange={(e) => handleChange(idx, "issuer", e.target.value)}
                  placeholder="e.g. Cisco"
                />
              </AdminField>
              <AdminField label="Date">
                <AdminInput
                  value={cert.date ?? ""}
                  onChange={(e) => handleChange(idx, "date", e.target.value)}
                  placeholder="e.g. 2024"
                />
              </AdminField>
            </div>
            <AdminField label="Certificate Image / Badge">
              <ImageUploader
                folder="certificates"
                currentUrl={cert.url ?? ""}
                onUpload={(url) => handleChange(idx, "url", url)}
              />
            </AdminField>
          </AdminItemCard>
        ))}
      </AdminCard>

      <AdminSaveButton
        onClick={handleSaveAll}
        loading={addCert.isPending || updateCert.isPending}
        saved={saved}
        label="Save All"
      />
    </div>
  );
}
