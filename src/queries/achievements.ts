// src/queries/achievements.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, getDocs, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface AchievementItem {
  id?: string;
  title: string;
  description: string;
  date?: string;
}

const ACHIEVEMENTS_COLLECTION_REF = collection(db, "admin", "achievements");

export function useAchievementsData() {
  return useQuery<AchievementItem[]>(["achievements"], async () => {
    const snapshot = await getDocs(ACHIEVEMENTS_COLLECTION_REF);
    const items: AchievementItem[] = [];
    snapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...(docSnap.data() as Omit<AchievementItem, "id">) });
    });
    if (items.length) return items;
    const { achievements } = await import("@/lib/portfolio-data");
    return achievements;
  }, { staleTime: Infinity });
}

export function useAddAchievement() {
  const queryClient = useQueryClient();
  return useMutation(
    async (newItem: Omit<AchievementItem, "id">) => {
      const docRef = await addDoc(ACHIEVEMENTS_COLLECTION_REF, newItem);
      return { ...newItem, id: docRef.id } as AchievementItem;
    },
    { onSuccess: () => queryClient.invalidateQueries(["achievements"]) }
  );
}

export function useUpdateAchievement() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: AchievementItem) => {
      if (!item.id) throw new Error("Missing achievement id");
      const docRef = doc(db, "admin", "achievements", item.id);
      await setDoc(docRef, { ...item }, { merge: true });
    },
    { onSuccess: () => queryClient.invalidateQueries(["achievements"]) }
  );
}

export function useDeleteAchievement() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const docRef = doc(db, "admin", "achievements", id);
      await deleteDoc(docRef);
    },
    { onSuccess: () => queryClient.invalidateQueries(["achievements"]) }
  );
}
