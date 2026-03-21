import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getAuth } from "@/lib/firebase";

export async function signIn(email: string, password: string) {
  const auth = getAuth();
  if (!auth) throw new Error("Firebase is not configured");
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
  const auth = getAuth();
  if (!auth) return;
  return firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  const auth = getAuth();
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
