import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

function getFirebaseApp() {
  if (!app) {
    if (!firebaseConfig.apiKey) {
      console.warn("Firebase API key not configured. Auth will not work.");
      return undefined;
    }
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

function getFirebaseAuth() {
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) return undefined;
    auth = getAuth(firebaseApp);
  }
  return auth;
}

export { getFirebaseAuth as getAuth, getFirebaseApp };
