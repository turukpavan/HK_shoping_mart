import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { auth, db, googleProvider } from "../utils/firebase/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// EMAIL LOGIN
export const loginWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// GOOGLE LOGIN
export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

// REGISTER USER
export const registerUser = async ({ name, email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    uid: user.uid,
  });

  return user;
};
