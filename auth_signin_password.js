import "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const signin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("signin success", user);
      return { success: true, user };
    })
    .catch((error) => {
      console.log(error);
      return { success: false, error };
    });
};
