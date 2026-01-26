import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import local image
import BackgroundImage from "../../assets/images/BMW-Contactless-Service-app.webp";

export default function Home() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("@user_data");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserName(userData.name || "User");
        }
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <ImageBackground
      source={BackgroundImage} // using local image
      style={styles.background}
      resizeMode="cover"
    >
      {/* Semi-transparent overlay */}
      <View style={styles.overlay}>
        <Text style={styles.projectName}>🚗 Car Services</Text>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        <Text style={styles.subtitle}>Manage your bookings easily</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // dark overlay for readability
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  projectName: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
  },
});
