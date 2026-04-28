import "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("signup success", user);
      return { success: true, user };
    })
    .catch((error) => {
      console.log(error);
      return { success: false, error };
    });
};
