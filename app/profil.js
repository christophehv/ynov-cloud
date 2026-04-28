import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import "../firebaseConfig";

export default function Profil() {
  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.replace("/connexion");
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Link href="/" style={styles.navLink}>Accueil</Link>
        <Link href="/connexion" style={styles.navLink}>Connexion</Link>
        <Link href="/inscription" style={styles.navLink}>Inscription</Link>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Mon Profil</Text>
        <Text style={styles.subtitle}>Ici s'affichera prochainement votre profil</Text>

        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Se déconnecter</Text>
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
  content: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 26, fontWeight: "bold", color: "#1e1b4b", marginBottom: 12 },
  subtitle: { fontSize: 16, color: "#6b7280", textAlign: "center", marginBottom: 32 },
  button: {
    height: 44, backgroundColor: "#dc2626", borderRadius: 8,
    paddingHorizontal: 32, alignItems: "center", justifyContent: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
