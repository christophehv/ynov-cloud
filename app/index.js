import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Link href="/" style={styles.navLink}>Accueil</Link>
        <Link href="/connexion" style={styles.navLink}>Connexion</Link>
        <Link href="/inscription" style={styles.navLink}>Inscription</Link>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Bienvenue sur Web Cloud Ynov</Text>
        <Text style={styles.subtitle}>
          Connectez-vous ou créez un compte pour commencer.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    flexDirection: "row",
    backgroundColor: "#4F46E5",
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: 20,
    gap: 20,
  },
  navLink: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#1e1b4b",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6b7280",
  },
});
