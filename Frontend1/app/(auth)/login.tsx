import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logo = require("../../assets/images/BMW-Contactless-Service-app.webp");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

const handleLogin = async () => {
  if (!email || !password) {
    setError("Please enter email and password");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const response = await fetch(
      "http://10.0.2.2:5000/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    console.log("LOGIN RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Invalid credentials");
    }

    if (!data?.data) {
      throw new Error("Invalid response from server");
    }

    await AsyncStorage.setItem(
      "@user_data",
      JSON.stringify(data.data)
    );

    router.replace("/(tabs)/home");
  } catch (err: any) {
    setError(err.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#E0F7FA", "#FFFFFF"]} style={styles.background} />

      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>CAR SERVICES</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon size={20} color="#9CA3AF" />
              ) : (
                <EyeIcon size={20} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          </View>

          {/* Error */}
          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={["#0055A4", "#003366"]}
              style={styles.loginGradient}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginText}>Login</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.link}>Sign up?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#003366",
  },
  subtitle: {
    fontSize: 16,
    color: "#4B5563",
  },
  caption: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  form: {
    width: "100%",
    maxWidth: 360,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 24,
  },
  passwordInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingRight: 48,
    backgroundColor: "#FFFFFF",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 14,
  },
  loginButton: {
    height: 48,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 8,
  },
  loginGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  biometricButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    height: 48,
    marginTop: 16,
  },
  biometricText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
  },
  link: {
    color: "#3B82F6",
    textAlign: "center",
    marginTop: 16,
    fontWeight: "500",
  },
  infoBox: {
    backgroundColor: "#E3F2FD",
    borderColor: "#BBDEFB",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 32,
    maxWidth: 360,
  },
  infoText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  error: {
    color: "#DC2626",
  }
});
