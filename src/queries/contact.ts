// src/queries/contact.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  github?: string;
}

const CONTACT_DOC_REF = doc(db, "admin", "contact");

export function useContactData() {
  return useQuery<ContactInfo>(["contact"], async () => {
    const snap = await getDoc(CONTACT_DOC_REF);
    if (snap.exists()) {
      return snap.data() as ContactInfo;
    }
    // fallback static data
    const { contact } = await import("@/lib/portfolio-data");
    return contact;
  }, { staleTime: Infinity });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: ContactInfo) => {
      await setDoc(CONTACT_DOC_REF, data, { merge: true });
    },
    { onSuccess: () => queryClient.invalidateQueries(["contact"]) }
  );
}
