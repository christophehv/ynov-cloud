import { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { signin } from "../auth_signin_password";
import { signinWithGithub } from "../auth_github_signin_popup";
import { signInWithFacebook } from "../auth_facebook_signin_popup";
import { signInAnon } from "../auth_anonymous_signin";
import { sendOtp, verifyOtp } from "../auth_phone_signin";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showOtpStep, setShowOtpStep] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSignin = async () => {
    const errs = {};
    if (!EMAIL_REGEX.test(email)) errs.email = "Adresse email invalide.";
    if (password.length < 6) errs.password = "Le mot de passe doit contenir au moins 6 caractères.";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    const result = await signin(email, password);
    if (result.success) {
      showToast("Connexion réussie !");
      setTimeout(() => router.replace("/profil"), 1000);
    } else {
      showToast(result.error.message, "error");
    }
  };

  const handleGithub = async () => {
    const result = await signinWithGithub();
    if (result.success) {
      showToast("Connexion réussie !");
      setTimeout(() => router.replace("/profil"), 1000);
    } else {
      showToast(result.error.message, "error");
    }
  };

  const handleFacebook = async () => {
    const result = await signInWithFacebook();
    if (result.success) {
      showToast("Connexion réussie !");
      setTimeout(() => router.replace("/profil"), 1000);
    } else {
      showToast(result.error.message, "error");
    }
  };

  const handleAnonymous = async () => {
    const result = await signInAnon();
    if (result.success) {
      showToast("Connexion anonyme réussie !");
      setTimeout(() => router.replace("/profil"), 1000);
    } else {
      showToast(result.error.message, "error");
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber) { showToast("Entrez un numéro de téléphone.", "error"); return; }
    const result = await sendOtp(phoneNumber);
    if (result.success) {
      setConfirmationResult(result.confirmationResult);
      setShowOtpStep(true);
      showToast("Code OTP envoyé !");
    } else {
      showToast(result.error.message, "error");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode) { showToast("Entrez le code OTP.", "error"); return; }
    const result = await verifyOtp(confirmationResult, otpCode);
    if (result.success) {
      showToast("Connexion réussie !");
      setTimeout(() => router.replace("/profil"), 1000);
    } else {
      showToast(result.error.message, "error");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Link href="/" style={styles.navLink}>Accueil</Link>
        <Link href="/connexion" style={styles.navLink}>Connexion</Link>
        <Link href="/inscription" style={styles.navLink}>Inscription</Link>
      </View>

      {toast && (
        <View style={[styles.toast, toast.type === "error" ? styles.toastError : styles.toastSuccess]}>
          <Text style={styles.toastText}>{toast.message}</Text>
        </View>
      )}

      <View style={styles.form}>
        <Text style={styles.title}>Connexion</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          onChangeText={setEmail}
          value={email}
          placeholder="votre@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          onChangeText={setPassword}
          value={password}
          placeholder="••••••••"
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSignin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <Text style={styles.label}>Téléphone (OTP)</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="+33612345678"
          keyboardType="phone-pad"
        />
        {!showOtpStep ? (
          <TouchableOpacity style={[styles.button, styles.buttonPhone]} onPress={handleSendOtp}>
            <Text style={styles.buttonText}>Envoyer le code OTP</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TextInput
              style={[styles.input, { marginTop: 8 }]}
              onChangeText={setOtpCode}
              value={otpCode}
              placeholder="Code OTP"
              keyboardType="number-pad"
            />
            <TouchableOpacity style={[styles.button, styles.buttonPhone]} onPress={handleVerifyOtp}>
              <Text style={styles.buttonText}>Vérifier le code</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={[styles.button, styles.buttonGithub]} onPress={handleGithub}>
          <Text style={styles.buttonText}>Continuer avec GitHub</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonFacebook]} onPress={handleFacebook}>
          <Text style={styles.buttonText}>Continuer avec Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonAnon]} onPress={handleAnonymous}>
          <Text style={styles.buttonText}>Continuer anonymement</Text>
        </TouchableOpacity>
      </View>

      <div id="recaptcha-container" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  navbar: {
    flexDirection: "row",
    backgroundColor: "#4F46E5",
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: 20,
    gap: 20,
  },
  navLink: { color: "#fff", fontWeight: "600", fontSize: 15 },
  form: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
  label: { marginBottom: 4, fontWeight: "500" },
  input: {
    height: 44, borderWidth: 1, borderColor: "#ccc",
    borderRadius: 8, padding: 10, marginBottom: 4,
  },
  inputError: { borderColor: "#e53e3e" },
  errorText: { color: "#e53e3e", fontSize: 12, marginBottom: 8 },
  button: {
    height: 44, backgroundColor: "#4F46E5", borderRadius: 8,
    alignItems: "center", justifyContent: "center", marginTop: 12,
  },
  buttonGithub: { backgroundColor: "#24292e" },
  buttonFacebook: { backgroundColor: "#1877F2" },
  buttonPhone: { backgroundColor: "#0891b2" },
  buttonAnon: { backgroundColor: "#6b7280" },
  buttonText: { color: "#fff", fontWeight: "600" },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#e5e7eb" },
  dividerText: { marginHorizontal: 8, color: "#9ca3af" },
  toast: {
    position: "absolute", top: 110, left: 20, right: 20,
    padding: 14, borderRadius: 8, zIndex: 999,
  },
  toastSuccess: { backgroundColor: "#16a34a" },
  toastError: { backgroundColor: "#dc2626" },
  toastText: { color: "#fff", fontWeight: "600", textAlign: "center" },
});
