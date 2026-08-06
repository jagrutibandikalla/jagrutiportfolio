// src/queries/certificates.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, getDocs, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface CertificateItem {
  id?: string;
  title: string;
  issuer: string;
  date?: string;
  url?: string; // link to certificate image or verification page
}

// Store certificates in a subcollection under admin
const CERTIFICATES_COLLECTION_REF = collection(db, "admin", "certificates");

export function useCertificatesData() {
  return useQuery<CertificateItem[]>(["certificates"], async () => {
    const snapshot = await getDocs(CERTIFICATES_COLLECTION_REF);
    const items: CertificateItem[] = [];
    snapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...(docSnap.data() as Omit<CertificateItem, "id">) });
    });
    if (items.length) return items;
    const { certificates } = await import("@/lib/portfolio-data");
    return certificates;
  }, { staleTime: Infinity });
}

export function useAddCertificate() {
  const queryClient = useQueryClient();
  return useMutation(
    async (newCert: Omit<CertificateItem, "id">) => {
      const docRef = await addDoc(CERTIFICATES_COLLECTION_REF, newCert);
      return { ...newCert, id: docRef.id } as CertificateItem;
    },
    { onSuccess: () => queryClient.invalidateQueries(["certificates"]) }
  );
}

export function useUpdateCertificate() {
  const queryClient = useQueryClient();
  return useMutation(
    async (cert: CertificateItem) => {
      if (!cert.id) throw new Error("Missing certificate id");
      const docRef = doc(db, "admin", "certificates", cert.id);
      await setDoc(docRef, { ...cert }, { merge: true });
    },
    { onSuccess: () => queryClient.invalidateQueries(["certificates"]) }
  );
}

export function useDeleteCertificate() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const docRef = doc(db, "admin", "certificates", id);
      await deleteDoc(docRef);
    },
    { onSuccess: () => queryClient.invalidateQueries(["certificates"]) }
  );
}
