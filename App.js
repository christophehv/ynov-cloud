import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated } from "react-native";
import { signup } from "./auth_signup_password";
import { signin } from "./auth_signin_password";
import { signinWithGithub } from "./auth_github_signin_popup";
import { signInWithFacebook } from "./auth_facebook_signin_popup";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 6;
const WEAK_PASSWORDS = ["123456", "password", "123", "azerty", "qwerty"];

function validate(email, password) {
  const errors = {};
  if (!EMAIL_REGEX.test(email)) {
    errors.email = "Adresse email invalide.";
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères.`;
  } else if (WEAK_PASSWORDS.includes(password.toLowerCase())) {
    errors.password = "Mot de passe trop faible.";
  }
  return errors;
}

export default function App() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSignup = async () => {
    const validationErrors = validate(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const result = await signup(email, password);
    if (result.success) {
      showToast("Compte créé avec succès !", "success");
    } else {
      showToast(result.error.message, "error");
    }
  };

  const handleSignin = async () => {
    const validationErrors = validate(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const result = await signin(email, password);
    if (result.success) {
      showToast("Connexion réussie !", "success");
    } else {
      showToast(result.error.message, "error");
    }
  };

  const handleGithub = async () => {
    const result = await signinWithGithub();
    if (result.success) {
      showToast("Connexion GitHub réussie !", "success");
    } else {
      showToast(result.error.message, "error");
    }
  };

  const handleFacebook = async () => {
    const result = await signInWithFacebook();
    if (result.success) {
      showToast("Connexion Facebook réussie !", "success");
    } else {
      showToast(result.error.message, "error");
    }
  };

  return (
    <View style={styles.container}>
      {toast && (
        <View style={[styles.toast, toast.type === "error" ? styles.toastError : styles.toastSuccess]}>
          <Text style={styles.toastText}>{toast.message}</Text>
        </View>
      )}

      <Text style={styles.title}>Authentification</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, errors.email ? styles.inputError : null]}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="votre@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={[styles.input, errors.password ? styles.inputError : null]}
        onChangeText={onChangePassword}
        value={password}
        placeholder="••••••••"
        secureTextEntry={true}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleSignin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    height: 44,
    width: "100%",
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  inputError: {
    borderColor: "#e53e3e",
  },
  errorText: {
    color: "#e53e3e",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  button: {
    width: "100%",
    height: 44,
    backgroundColor: "#4F46E5",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  buttonSecondary: {
    backgroundColor: "#0ea5e9",
  },
  buttonGithub: {
    backgroundColor: "#24292e",
  },
  buttonFacebook: {
    backgroundColor: "#1877F2",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    marginHorizontal: 8,
    color: "#9ca3af",
  },
  toast: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    padding: 14,
    borderRadius: 8,
    zIndex: 999,
  },
  toastSuccess: {
    backgroundColor: "#16a34a",
  },
  toastError: {
    backgroundColor: "#dc2626",
  },
  toastText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
