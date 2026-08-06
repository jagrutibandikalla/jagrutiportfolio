// src/routes/admin/achievements.tsx
import React, { useEffect, useState } from "react";
import {
  useAchievementsData,
  useAddAchievement,
  useUpdateAchievement,
  useDeleteAchievement,
  AchievementItem,
} from "@/queries/achievements";
import { FiStar } from "react-icons/fi";
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

export default function AdminAchievements() {
  const { data: items, isLoading } = useAchievementsData();
  const addAch = useAddAchievement();
  const updateAch = useUpdateAchievement();
  const deleteAch = useDeleteAchievement();

  const [editable, setEditable] = useState<AchievementItem[]>([]);
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

  const handleChange = (idx: number, field: keyof AchievementItem, value: string) => {
    setEditable((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value } as AchievementItem;
      return copy;
    });
  };

  const handleAdd = () =>
    setEditable((prev) => [...prev, { title: "", description: "", date: "" }]);

  const handleDelete = async (idx: number) => {
    const ach = editable[idx];
    if (ach.id) await deleteAch.mutateAsync(ach.id);
    setEditable((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSaveAll = async () => {
    for (const ach of editable) {
      if (ach.id) await updateAch.mutateAsync(ach);
      else
        await addAch.mutateAsync({
          title: ach.title,
          description: ach.description,
          date: ach.date,
        });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <AdminPageHeader
        icon={<FiStar size={20} />}
        title="Achievements Section"
        desc="Manage milestones, awards and recognitions"
      />

      <AdminCard
        title={`Achievements (${editable.length})`}
        action={<AdminAddButton onClick={handleAdd} label="Add Achievement" />}
      >
        {editable.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>
            No achievements yet.
          </p>
        )}
        {editable.map((ach, idx) => (
          <AdminItemCard key={idx} index={idx} label="Achievement" onDelete={() => handleDelete(idx)}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px" }}>
              <AdminField label="Title">
                <AdminInput
                  value={ach.title}
                  onChange={(e) => handleChange(idx, "title", e.target.value)}
                  placeholder="e.g. 8.15 CGPA"
                />
              </AdminField>
              <AdminField label="Date">
                <AdminInput
                  value={ach.date ?? ""}
                  onChange={(e) => handleChange(idx, "date", e.target.value)}
                  placeholder="e.g. 2024"
                />
              </AdminField>
            </div>
            <AdminField label="Description">
              <AdminTextarea
                value={ach.description}
                onChange={(e) => handleChange(idx, "description", e.target.value)}
                placeholder="Describe this achievement..."
              />
            </AdminField>
          </AdminItemCard>
        ))}
      </AdminCard>

      <AdminSaveButton
        onClick={handleSaveAll}
        loading={addAch.isPending || updateAch.isPending}
        saved={saved}
        label="Save All"
      />
    </div>
  );
}
