import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Remove stored user data
      await AsyncStorage.removeItem("@user_data");
      // Optionally show a confirmation alert
      Alert.alert("Logged out", "You have been successfully logged out.");
      // Redirect to login screen
      router.replace("/login"); // Make sure your login screen path is correct
    } catch (error) {
      console.log("Error logging out:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
