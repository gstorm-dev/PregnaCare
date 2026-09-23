import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  setDoc
} from "firebase/firestore";

import { auth } from "./auth";
import { db } from "./config";

export const registerUser = async (name, email, password, role) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    role,
    createdAt: new Date()
  });

  return user;
};