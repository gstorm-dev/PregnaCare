import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const usersCollection = "users";

const withoutSecrets = (user) => {
  if (!user) return null;
  const safe = { ...user };
  delete safe.password;
  delete safe.createdAt;
  delete safe.updatedAt;
  return safe;
};

const definedFields = (record) =>
  Object.fromEntries(
    Object.entries(record).filter(([, value]) => value !== undefined),
  );

export const cacheSession = (user) => {
  const safe = withoutSecrets(user);
  sessionStorage.setItem("loggedInUser", JSON.stringify(safe));
  if (safe?.role) {
    localStorage.setItem(`${safe.role}User`, JSON.stringify(safe));
  }
  return safe;
};

export const registerUser = async ({ email, password, profile }) => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );
  const uid = credential.user.uid;

  if (profile?.name) {
    await updateProfile(credential.user, { displayName: profile.name });
  }

  const record = definedFields({
    ...withoutSecrets(profile),
    email: email.trim(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await setDoc(doc(db, usersCollection, uid), record);

  return {
    uid,
    ...withoutSecrets(profile),
    email: email.trim(),
  };
};

export const loginUser = async ({ email, password, role }) => {
  const credential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );
  const snapshot = await getDoc(doc(db, usersCollection, credential.user.uid));

  if (!snapshot.exists()) {
    await signOut(auth);
    throw new Error("No PregnaCare profile was found for this account.");
  }

  const profile = snapshot.data();
  if (role && profile.role !== role) {
    await signOut(auth);
    throw new Error(
      `This account is registered as a ${profile.role}. Use the ${profile.role} sign-in page.`,
    );
  }

  return cacheSession({
    uid: credential.user.uid,
    ...withoutSecrets(profile),
    email: profile.email || credential.user.email,
  });
};

export const persistLoggedInUser = async (user) => {
  const safe = cacheSession(user);
  if (!safe?.uid) return safe;

  const { uid, ...fields } = safe;
  await setDoc(
    doc(db, usersCollection, uid),
    definedFields({
      ...fields,
      updatedAt: serverTimestamp(),
    }),
    { merge: true },
  );
  return safe;
};

export const ensureSession = async (firebaseUser) => {
  if (!firebaseUser) return null;

  try {
    const existing = JSON.parse(sessionStorage.getItem("loggedInUser") || "null");
    if (existing?.uid === firebaseUser.uid) return existing;
  } catch {
    sessionStorage.removeItem("loggedInUser");
  }

  const snapshot = await getDoc(doc(db, usersCollection, firebaseUser.uid));
  if (!snapshot.exists()) return null;

  return cacheSession({
    uid: firebaseUser.uid,
    ...withoutSecrets(snapshot.data()),
    email: snapshot.data().email || firebaseUser.email,
  });
};

export const signOutUser = async () => {
  sessionStorage.removeItem("loggedInUser");
  await signOut(auth);
};
