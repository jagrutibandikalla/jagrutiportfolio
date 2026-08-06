// src/routes/admin/education.tsx
import React, { useEffect, useState } from "react";
import {
  useEducationData,
  useAddEducation,
  useUpdateEducation,
  useDeleteEducation,
  EducationItem,
} from "@/queries/education";
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

export default function AdminEducation() {
  const { data: items, isLoading } = useEducationData();
  const addEdu = useAddEducation();
  const updateEdu = useUpdateEducation();
  const deleteEdu = useDeleteEducation();

  const [editable, setEditable] = useState<EducationItem[]>([]);
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

  const handleChange = (idx: number, field: keyof EducationItem, value: string) => {
    setEditable((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value } as EducationItem;
      return copy;
    });
  };

  const handleAdd = () =>
    setEditable((prev) => [
      ...prev,
      { institution: "", degree: "", startYear: "", endYear: "", description: "" },
    ]);

  const handleDelete = async (idx: number) => {
    const edu = editable[idx];
    if (edu.id) await deleteEdu.mutateAsync(edu.id);
    setEditable((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSaveAll = async () => {
    for (const edu of editable) {
      if (edu.id) await updateEdu.mutateAsync(edu);
      else
        await addEdu.mutateAsync({
          institution: edu.institution,
          degree: edu.degree,
          startYear: edu.startYear,
          endYear: edu.endYear,
          description: edu.description,
        });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <AdminPageHeader
        icon={<FiBookOpen size={20} />}
        title="Education Section"
        desc="Manage academic qualifications and institutions"
      />

      <AdminCard
        title={`Education (${editable.length})`}
        action={<AdminAddButton onClick={handleAdd} label="Add Education" />}
      >
        {editable.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>
            No education entries yet.
          </p>
        )}
        {editable.map((edu, idx) => (
          <AdminItemCard key={idx} index={idx} label="Education" onDelete={() => handleDelete(idx)}>
            <AdminField label="Institution">
              <AdminInput
                value={edu.institution}
                onChange={(e) => handleChange(idx, "institution", e.target.value)}
                placeholder="e.g. Godavari Institute of Engineering and Technology"
              />
            </AdminField>
            <AdminField label="Degree">
              <AdminInput
                value={edu.degree}
                onChange={(e) => handleChange(idx, "degree", e.target.value)}
                placeholder="e.g. B.Tech — Computer Science and Engineering"
              />
            </AdminField>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <AdminField label="Start Year">
                <AdminInput
                  value={edu.startYear ?? ""}
                  onChange={(e) => handleChange(idx, "startYear", e.target.value)}
                  placeholder="e.g. 2023"
                />
              </AdminField>
              <AdminField label="End Year">
                <AdminInput
                  value={edu.endYear ?? ""}
                  onChange={(e) => handleChange(idx, "endYear", e.target.value)}
                  placeholder="e.g. 2027"
                />
              </AdminField>
            </div>
            <AdminField label="Notes / Description">
              <AdminTextarea
                value={edu.description ?? ""}
                onChange={(e) => handleChange(idx, "description", e.target.value)}
                placeholder="CGPA, notable achievements, etc."
              />
            </AdminField>
          </AdminItemCard>
        ))}
      </AdminCard>

      <AdminSaveButton
        onClick={handleSaveAll}
        loading={addEdu.isPending || updateEdu.isPending}
        saved={saved}
        label="Save All"
      />
    </div>
  );
}
