import "./firebaseConfig";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { provider } from "./auth_facebook_provider_create";

const auth = getAuth();

export const signInWithFacebook = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log("success signin with facebook", user);
      return { success: true, user, accessToken };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(error);
      return { success: false, error };
    });
};
