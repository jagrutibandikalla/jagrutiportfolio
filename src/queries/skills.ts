// src/queries/skills.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, getDocs, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface SkillItem {
  id?: string; // Firestore doc id
  name: string;
  category: string;
  level?: string; // e.g., Beginner, Intermediate, Expert
  iconUrl?: string;
}

// Store skills in a subcollection under admin
const SKILLS_COLLECTION_REF = collection(db, "admin", "skills");

export function useSkillsData() {
  return useQuery<SkillItem[]>(["skills"], async () => {
    const snapshot = await getDocs(SKILLS_COLLECTION_REF);
    const items: SkillItem[] = [];
    snapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...(docSnap.data() as Omit<SkillItem, "id">) });
    });
    if (items.length) return items;
    // Fallback to static data if Firestore empty
    const { skills } = await import("@/lib/portfolio-data");
    return skills;
  }, { staleTime: Infinity });
}

export function useAddSkill() {
  const queryClient = useQueryClient();
  return useMutation(
    async (newSkill: Omit<SkillItem, "id">) => {
      const docRef = await addDoc(SKILLS_COLLECTION_REF, newSkill);
      return { ...newSkill, id: docRef.id } as SkillItem;
    },
    { onSuccess: () => queryClient.invalidateQueries(["skills"]) }
  );
}

export function useUpdateSkill() {
  const queryClient = useQueryClient();
  return useMutation(
    async (skill: SkillItem) => {
      if (!skill.id) throw new Error("Missing skill id");
      const docRef = doc(db, "admin", "skills", skill.id);
      await setDoc(docRef, { ...skill }, { merge: true });
    },
    { onSuccess: () => queryClient.invalidateQueries(["skills"]) }
  );
}

export function useDeleteSkill() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const docRef = doc(db, "admin", "skills", id);
      await deleteDoc(docRef);
    },
    { onSuccess: () => queryClient.invalidateQueries(["skills"]) }
  );
}
