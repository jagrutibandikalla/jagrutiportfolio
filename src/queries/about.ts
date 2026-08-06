// src/queries/about.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface AboutBlock {
  title: string;
  body: string;
}

const ABOUT_DOC_REF = doc(db, "admin", "about"); // collection admin, doc about

export function useAboutData() {
  return useQuery<AboutBlock[]>(["about"], async () => {
    const snap = await getDoc(ABOUT_DOC_REF);
    if (snap.exists()) {
      return (snap.data() as { blocks: AboutBlock[] }).blocks;
    }
    // Fallback to static data
    const { aboutBlocks } = await import("@/lib/portfolio-data");
    return aboutBlocks;
  }, {
    staleTime: Infinity,
  });
}

export function useUpdateAbout() {
  const queryClient = useQueryClient();
  return useMutation(
    async (blocks: AboutBlock[]) => {
      await setDoc(ABOUT_DOC_REF, { blocks }, { merge: true });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["about"]);
      },
    }
  );
}
