// src/routes/admin/training.tsx
import React, { useEffect, useState } from "react";
import {
  useTrainingData,
  useAddTraining,
  useUpdateTraining,
  useDeleteTraining,
  TrainingItem,
} from "@/queries/training";
import ImageUploader from "@/components/ImageUploader";
import { FiBook } from "react-icons/fi";
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

export default function AdminTraining() {
  const { data: items, isLoading } = useTrainingData();
  const addTraining = useAddTraining();
  const updateTraining = useUpdateTraining();
  const deleteTraining = useDeleteTraining();

  const [editableItems, setEditableItems] = useState<TrainingItem[]>([]);
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

  const handleChange = (index: number, field: keyof TrainingItem, value: string) => {
    setEditableItems((prev) => {
      const ni = [...prev];
      ni[index] = { ...ni[index], [field]: value } as TrainingItem;
      return ni;
    });
  };

  const handleAdd = () =>
    setEditableItems((prev) => [
      ...prev,
      { organization: "", title: "", duration: "", description: "" },
    ]);

  const handleDelete = async (index: number) => {
    const item = editableItems[index];
    if (item.id) await deleteTraining.mutateAsync(item.id);
    setEditableItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    for (const item of editableItems) {
      if (item.id) {
        await updateTraining.mutateAsync(item);
      } else {
        await addTraining.mutateAsync({
          organization: item.organization,
          title: item.title,
          duration: item.duration,
          description: item.description,
          certificateUrl: item.certificateUrl,
        });
      }
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <AdminPageHeader
        icon={<FiBook size={20} />}
        title="Training Section"
        desc="Manage courses, workshops and learning programmes"
      />

      <AdminCard
        title={`Training Items (${editableItems.length})`}
        action={<AdminAddButton onClick={handleAdd} label="Add Training" />}
      >
        {editableItems.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>
            No training items yet.
          </p>
        )}
        {editableItems.map((item, idx) => (
          <AdminItemCard key={idx} index={idx} label="Training" onDelete={() => handleDelete(idx)}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <AdminField label="Organization">
                <AdminInput
                  value={item.organization}
                  onChange={(e) => handleChange(idx, "organization", e.target.value)}
                  placeholder="e.g. Techwing"
                />
              </AdminField>
              <AdminField label="Duration">
                <AdminInput
                  value={item.duration}
                  onChange={(e) => handleChange(idx, "duration", e.target.value)}
                  placeholder="e.g. Completed"
                />
              </AdminField>
              <AdminField label="Title" col="1 / -1">
                <AdminInput
                  value={item.title}
                  onChange={(e) => handleChange(idx, "title", e.target.value)}
                  placeholder="e.g. Java Full Stack Training"
                />
              </AdminField>
              <AdminField label="Description" col="1 / -1">
                <AdminTextarea
                  value={item.description}
                  onChange={(e) => handleChange(idx, "description", e.target.value)}
                  placeholder="Describe what was covered..."
                />
              </AdminField>
            </div>
            <AdminField label="Certificate Image">
              <ImageUploader
                folder="training"
                currentUrl={item.certificateUrl ?? ""}
                onUpload={(url) => handleChange(idx, "certificateUrl", url)}
              />
            </AdminField>
          </AdminItemCard>
        ))}
      </AdminCard>

      <AdminSaveButton
        onClick={handleSaveAll}
        loading={addTraining.isPending || updateTraining.isPending}
        saved={saved}
        label="Save All"
      />
    </div>
  );
}
