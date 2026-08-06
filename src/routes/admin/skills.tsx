// src/routes/admin/skills.tsx
import React, { useEffect, useState } from "react";
import {
  useSkillsData,
  useAddSkill,
  useUpdateSkill,
  useDeleteSkill,
  SkillItem,
} from "@/queries/skills";
import ImageUploader from "@/components/ImageUploader";
import { FiCode } from "react-icons/fi";
import {
  AdminCard,
  AdminItemCard,
  AdminField,
  AdminInput,
  AdminSaveButton,
  AdminAddButton,
  AdminPageHeader,
} from "@/routes/admin/shared";

export default function AdminSkills() {
  const { data: items, isLoading } = useSkillsData();
  const addSkill = useAddSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();

  const [editableItems, setEditableItems] = useState<SkillItem[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (items) setEditableItems(items.map((i) => ({ ...i })));
  }, [items]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px" }}>Loading...</div>
      </div>
    );
  }

  const handleChange = (index: number, field: keyof SkillItem, value: string) => {
    setEditableItems((prev) => {
      const ni = [...prev];
      ni[index] = { ...ni[index], [field]: value } as SkillItem;
      return ni;
    });
  };

  const handleAdd = () =>
    setEditableItems((prev) => [...prev, { name: "", category: "", level: "", iconUrl: "" }]);

  const handleDelete = async (index: number) => {
    const item = editableItems[index];
    if (item.id) await deleteSkill.mutateAsync(item.id);
    setEditableItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    for (const item of editableItems) {
      if (item.id) {
        await updateSkill.mutateAsync(item);
      } else {
        await addSkill.mutateAsync({
          name: item.name,
          category: item.category,
          level: item.level,
          iconUrl: item.iconUrl,
        });
      }
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <AdminPageHeader
        icon={<FiCode size={20} />}
        title="Skills Section"
        desc="Manage technical skills with categories and proficiency levels"
      />

      <AdminCard
        title={`Skills (${editableItems.length})`}
        action={<AdminAddButton onClick={handleAdd} label="Add Skill" />}
      >
        {editableItems.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>
            No skills yet.
          </p>
        )}
        {editableItems.map((item, idx) => (
          <AdminItemCard key={idx} index={idx} label="Skill" onDelete={() => handleDelete(idx)}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <AdminField label="Skill Name">
                <AdminInput
                  value={item.name}
                  onChange={(e) => handleChange(idx, "name", e.target.value)}
                  placeholder="e.g. Java"
                />
              </AdminField>
              <AdminField label="Category">
                <AdminInput
                  value={item.category}
                  onChange={(e) => handleChange(idx, "category", e.target.value)}
                  placeholder="e.g. Backend"
                />
              </AdminField>
              <AdminField label="Level" col="1 / -1">
                <AdminInput
                  value={item.level ?? ""}
                  onChange={(e) => handleChange(idx, "level", e.target.value)}
                  placeholder="e.g. Working, Proficient, Basic"
                />
              </AdminField>
            </div>
            <AdminField label="Skill Icon">
              <ImageUploader
                folder="skills"
                currentUrl={item.iconUrl ?? ""}
                onUpload={(url) => handleChange(idx, "iconUrl", url)}
              />
            </AdminField>
          </AdminItemCard>
        ))}
      </AdminCard>

      <AdminSaveButton
        onClick={handleSaveAll}
        loading={addSkill.isPending || updateSkill.isPending}
        saved={saved}
        label="Save All"
      />
    </div>
  );
}
