import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { signup } from "../auth_signup_password";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEAK_PASSWORDS = ["123456", "password", "123", "azerty", "qwerty"];

export default function Inscription() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSignup = async () => {
    const errs = {};
    if (!name.trim()) errs.name = "Le nom est requis.";
    if (!EMAIL_REGEX.test(email)) errs.email = "Adresse email invalide.";
    if (password.length < 6) {
      errs.password = "Le mot de passe doit contenir au moins 6 caractères.";
    } else if (WEAK_PASSWORDS.includes(password.toLowerCase())) {
      errs.password = "Mot de passe trop faible.";
    }
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    const result = await signup(email, password);
    if (result.success) {
      showToast("Inscription réussie !");
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
        <Text style={styles.title}>Inscription</Text>

        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          onChangeText={setName}
          value={name}
          placeholder="Votre nom"
          autoCapitalize="words"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

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

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
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
  buttonText: { color: "#fff", fontWeight: "600" },
  toast: {
    position: "absolute", top: 110, left: 20, right: 20,
    padding: 14, borderRadius: 8, zIndex: 999,
  },
  toastSuccess: { backgroundColor: "#16a34a" },
  toastError: { backgroundColor: "#dc2626" },
  toastText: { color: "#fff", fontWeight: "600", textAlign: "center" },
});
