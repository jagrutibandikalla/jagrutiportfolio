// src/queries/home.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface HomeData {
  name: string;
  firstName: string;
  lastName: string;
  roles: string[];
  location: string;
  email: string;
  github: string;
  linkedin: string;
  photoUrl?: string; // URL to profile photo stored in Firebase Storage
  backgroundUrl?: string; // optional hero background image URL
  resumeUrl?: string; // URL to resume PDF
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

const HOME_DOC_REF = doc(db, "admin", "home"); // collection admin, doc home

export function useHomeData() {
  return useQuery<HomeData>(["home"], async () => {
    const snap = await getDoc(HOME_DOC_REF);
    if (snap.exists()) {
      return snap.data() as HomeData;
    }
    // Fallback to static data from portfolio-data if no Firestore entry yet
    // Dynamic import is safe in the browser environment
    const { profile } = await import("@/lib/portfolio-data");
    return {
      name: profile.name,
      firstName: profile.firstName,
      lastName: profile.lastName,
      roles: profile.roles,
      location: profile.location,
      email: profile.email,
      github: profile.github,
      linkedin: profile.linkedin,
    } as HomeData;
  }, {
    staleTime: Infinity,
  });
}

export function useUpdateHome() {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: HomeData) => {
      await setDoc(HOME_DOC_REF, data, { merge: true });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["home"]);
      },
    }
  );
}
