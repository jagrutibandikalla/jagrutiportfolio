// src/queries/training.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, getDocs, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface TrainingItem {
  id?: string; // Firestore doc id
  organization: string;
  title: string;
  duration: string;
  description: string;
  certificateUrl?: string;
}

// Store training items in a subcollection under admin
const TRAINING_COLLECTION_REF = collection(db, "admin", "training");

export function useTrainingData() {
  return useQuery<TrainingItem[]>(["training"], async () => {
    const snapshot = await getDocs(TRAINING_COLLECTION_REF);
    const items: TrainingItem[] = [];
    snapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...(docSnap.data() as Omit<TrainingItem, "id">) });
    });
    if (items.length) return items;
    // Fallback to static data if Firestore empty
    const { training } = await import("@/lib/portfolio-data");
    return training;
  }, { staleTime: Infinity });
}

export function useAddTraining() {
  const queryClient = useQueryClient();
  return useMutation(
    async (newItem: Omit<TrainingItem, "id">) => {
      const docRef = await addDoc(TRAINING_COLLECTION_REF, newItem);
      return { ...newItem, id: docRef.id };
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["training"]),
    }
  );
}

export function useUpdateTraining() {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: TrainingItem) => {
      if (!item.id) throw new Error("Missing training id");
      const docRef = doc(db, "admin", "training", item.id);
      await setDoc(docRef, { ...item }, { merge: true });
    },
    { onSuccess: () => queryClient.invalidateQueries(["training"]) }
  );
}

export function useDeleteTraining() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const docRef = doc(db, "admin", "training", id);
      await deleteDoc(docRef);
    },
    { onSuccess: () => queryClient.invalidateQueries(["training"]) }
  );
}
