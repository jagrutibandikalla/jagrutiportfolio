// src/routes/admin/about.tsx
import React, { useState, useEffect } from "react";
import { useAboutData, useUpdateAbout, AboutBlock } from "@/queries/about";
import { FiBookOpen } from "react-icons/fi";
import {
  AdminCard,
  AdminItemCard,
  AdminField,
  AdminInput,
  AdminTextarea,
  AdminSaveButton,
  AdminAddButton,
  AdminPageHeader,
} from "@/routes/admin/shared";

export default function AdminAbout() {
  const { data: blocks, isLoading } = useAboutData();
  const updateAbout = useUpdateAbout();
  const [editableBlocks, setEditableBlocks] = useState<AboutBlock[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (blocks) setEditableBlocks([...blocks]);
  }, [blocks]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px" }}>Loading...</div>
      </div>
    );
  }

  const handleChange = (index: number, field: keyof AboutBlock, value: string) => {
    setEditableBlocks((prev) => {
      const nb = [...prev];
      nb[index] = { ...nb[index], [field]: value };
      return nb;
    });
  };

  const handleAdd = () =>
    setEditableBlocks((prev) => [...prev, { title: "", body: "" }]);

  const handleDelete = (index: number) =>
    setEditableBlocks((prev) => prev.filter((_, i) => i !== index));

  const handleSave = async () => {
    await updateAbout.mutateAsync(editableBlocks);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <AdminPageHeader
        icon={<FiBookOpen size={20} />}
        title="About Section"
        desc="Manage the story blocks shown in your About section"
      />

      <AdminCard
        title={`Story Blocks (${editableBlocks.length})`}
        action={<AdminAddButton onClick={handleAdd} label="Add Block" />}
      >
        {editableBlocks.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>
            No blocks yet. Click "Add Block" to get started.
          </p>
        )}
        {editableBlocks.map((block, idx) => (
          <AdminItemCard key={idx} index={idx} label="Block" onDelete={() => handleDelete(idx)}>
            <AdminField label="Title">
              <AdminInput
                value={block.title}
                onChange={(e) => handleChange(idx, "title", e.target.value)}
                placeholder="e.g. The Beginning"
              />
            </AdminField>
            <AdminField label="Body">
              <AdminTextarea
                value={block.body}
                onChange={(e) => handleChange(idx, "body", e.target.value)}
                placeholder="Write your story block content here..."
              />
            </AdminField>
          </AdminItemCard>
        ))}
      </AdminCard>

      <AdminSaveButton onClick={handleSave} loading={updateAbout.isPending} saved={saved} />
    </div>
  );
}
