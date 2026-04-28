import "./firebaseConfig";
import { getAuth, signInAnonymously } from "firebase/auth";

const auth = getAuth();

export const signInAnon = () => {
  return signInAnonymously(auth)
    .then((userCredential) => {
      return { success: true, user: userCredential.user };
    })
    .catch((error) => {
      return { success: false, error };
    });
};
