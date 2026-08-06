// src/routes/admin/projects.tsx
import React, { useEffect, useState } from "react";
import {
  useProjectsData,
  useAddProject,
  useUpdateProject,
  useDeleteProject,
  ProjectItem,
} from "@/queries/projects";
import ImageUploader from "@/components/ImageUploader";
import { FiFolder } from "react-icons/fi";
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

export default function AdminProjects() {
  const { data: items, isLoading } = useProjectsData();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [editableItems, setEditableItems] = useState<ProjectItem[]>([]);
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

  const handleChange = (index: number, field: keyof ProjectItem, value: string) => {
    setEditableItems((prev) => {
      const ni = [...prev];
      ni[index] = { ...ni[index], [field]: value } as ProjectItem;
      return ni;
    });
  };

  const handleAdd = () =>
    setEditableItems((prev) => [
      ...prev,
      { title: "", description: "", githubUrl: "", liveUrl: "", imageUrl: "" },
    ]);

  const handleDelete = async (index: number) => {
    const item = editableItems[index];
    if (item.id) await deleteProject.mutateAsync(item.id);
    setEditableItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    for (const item of editableItems) {
      if (item.id) {
        await updateProject.mutateAsync(item);
      } else {
        await addProject.mutateAsync({
          title: item.title,
          description: item.description,
          githubUrl: item.githubUrl,
          liveUrl: item.liveUrl,
          imageUrl: item.imageUrl,
        });
      }
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <AdminPageHeader
        icon={<FiFolderOpen size={20} />}
        title="Projects Section"
        desc="Manage portfolio projects with images, descriptions and links"
      />

      <AdminCard
        title={`Projects (${editableItems.length})`}
        action={<AdminAddButton onClick={handleAdd} label="Add Project" />}
      >
        {editableItems.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>
            No projects yet.
          </p>
        )}
        {editableItems.map((item, idx) => (
          <AdminItemCard key={idx} index={idx} label="Project" onDelete={() => handleDelete(idx)}>
            <AdminField label="Title">
              <AdminInput
                value={item.title}
                onChange={(e) => handleChange(idx, "title", e.target.value)}
                placeholder="e.g. Finance Tracker"
              />
            </AdminField>
            <AdminField label="Description">
              <AdminTextarea
                value={item.description}
                onChange={(e) => handleChange(idx, "description", e.target.value)}
                placeholder="Describe what this project does..."
              />
            </AdminField>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <AdminField label="GitHub URL">
                <AdminInput
                  value={item.githubUrl ?? ""}
                  onChange={(e) => handleChange(idx, "githubUrl", e.target.value)}
                  placeholder="https://github.com/..."
                />
              </AdminField>
              <AdminField label="Live URL">
                <AdminInput
                  value={item.liveUrl ?? ""}
                  onChange={(e) => handleChange(idx, "liveUrl", e.target.value)}
                  placeholder="https://..."
                />
              </AdminField>
            </div>
            <AdminField label="Project Image">
              <ImageUploader
                folder="projects"
                currentUrl={item.imageUrl ?? ""}
                onUpload={(url) => handleChange(idx, "imageUrl", url)}
              />
            </AdminField>
          </AdminItemCard>
        ))}
      </AdminCard>

      <AdminSaveButton
        onClick={handleSaveAll}
        loading={addProject.isPending || updateProject.isPending}
        saved={saved}
        label="Save All"
      />
    </div>
  );
}
