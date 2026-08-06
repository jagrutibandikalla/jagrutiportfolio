// src/queries/projects.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, getDocs, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ProjectItem {
  id?: string; // Firestore document ID
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

// Projects stored under admin collection
const PROJECTS_COLLECTION_REF = collection(db, "admin", "projects");

export function useProjectsData() {
  return useQuery<ProjectItem[]>(["projects"], async () => {
    const snapshot = await getDocs(PROJECTS_COLLECTION_REF);
    const items: ProjectItem[] = [];
    snapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...(docSnap.data() as Omit<ProjectItem, "id">) });
    });
    if (items.length) return items;
    // Fallback to static data if Firestore empty
    const { projects } = await import("@/lib/portfolio-data");
    return projects;
  }, { staleTime: Infinity });
}

export function useAddProject() {
  const queryClient = useQueryClient();
  return useMutation(
    async (newProject: Omit<ProjectItem, "id">) => {
      const docRef = await addDoc(PROJECTS_COLLECTION_REF, newProject);
      return { ...newProject, id: docRef.id } as ProjectItem;
    },
    { onSuccess: () => queryClient.invalidateQueries(["projects"]) }
  );
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation(
    async (project: ProjectItem) => {
      if (!project.id) throw new Error("Missing project id");
      const docRef = doc(db, "admin", "projects", project.id);
      await setDoc(docRef, { ...project }, { merge: true });
    },
    { onSuccess: () => queryClient.invalidateQueries(["projects"]) }
  );
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const docRef = doc(db, "admin", "projects", id);
      await deleteDoc(docRef);
    },
    { onSuccess: () => queryClient.invalidateQueries(["projects"]) }
  );
}
