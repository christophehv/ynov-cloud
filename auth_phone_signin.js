import "./firebaseConfig";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const auth = getAuth();

export const sendOtp = (phoneNumber) => {
  const verifier = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
  return signInWithPhoneNumber(auth, phoneNumber, verifier)
    .then((confirmationResult) => {
      return { success: true, confirmationResult };
    })
    .catch((error) => {
      return { success: false, error };
    });
};

export const verifyOtp = (confirmationResult, code) => {
  return confirmationResult.confirm(code)
    .then((result) => {
      return { success: true, user: result.user };
    })
    .catch((error) => {
      return { success: false, error };
    });
};
