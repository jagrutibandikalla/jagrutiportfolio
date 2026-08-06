// src/queries/education.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, getDocs, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface EducationItem {
  id?: string;
  institution: string;
  degree: string;
  startYear?: string;
  endYear?: string;
  description?: string;
}

// Store education items under admin collection
const EDUCATION_COLLECTION_REF = collection(db, "admin", "education");

export function useEducationData() {
  return useQuery<EducationItem[]>(["education"], async () => {
    const snapshot = await getDocs(EDUCATION_COLLECTION_REF);
    const items: EducationItem[] = [];
    snapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...(docSnap.data() as Omit<EducationItem, "id">) });
    });
    if (items.length) return items;
    const { education } = await import("@/lib/portfolio-data");
    return education;
  }, { staleTime: Infinity });
}

export function useAddEducation() {
  const queryClient = useQueryClient();
  return useMutation(
    async (newItem: Omit<EducationItem, "id">) => {
      const docRef = await addDoc(EDUCATION_COLLECTION_REF, newItem);
      return { ...newItem, id: docRef.id } as EducationItem;
    },
    { onSuccess: () => queryClient.invalidateQueries(["education"]) }
  );
}

export function useUpdateEducation() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: EducationItem) => {
      if (!item.id) throw new Error("Missing education id");
      const docRef = doc(db, "admin", "education", item.id);
      await setDoc(docRef, { ...item }, { merge: true });
    },
    { onSuccess: () => queryClient.invalidateQueries(["education"]) }
  );
}

export function useDeleteEducation() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const docRef = doc(db, "admin", "education", id);
      await deleteDoc(docRef);
    },
    { onSuccess: () => queryClient.invalidateQueries(["education"]) }
  );
}
