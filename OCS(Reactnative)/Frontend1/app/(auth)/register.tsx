import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { Eye, EyeOff, ChevronDown } from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function OnboardingScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !phone) {
      Alert.alert("Missing Fields", "Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      console.log("JSON.stringify", JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phone,
        }))
      // const res = await fetch("http://10.0.2.2:5000/api/auth/register", {
      const res = await fetch("http://10.0.2.2:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phone,
        }),
      });

      const data = await res.json();

      console.log("data@@@",data)

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      Alert.alert("Success", "Account created successfully");
      router.replace("/login");
    } catch (err: any) {
      Alert.alert("Errorxx", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#E6F7FF", "#F5FBFF"]} style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Image
            source={require("../../assets/images/BMW-Contactless-Service-app.webp")}
            style={styles.logo}
          />

          <Text style={styles.title}>CAR SERVICES</Text>
          {/* <Text style={styles.subtitle}>Employee Onboarding</Text> */}

          <View style={styles.form}>
            {/* First Name */}
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="Enter first name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />

            {/* Last Name */}
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              placeholder="Enter last name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />

            {/* Phone */}
            <Text style={styles.label}>Phone</Text>
            <TextInput
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
            />

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordBox}>
              <TextInput
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.passwordInput}
              />
              <Pressable
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </Pressable>
            </View>


            {/* Submit */}
            <Pressable
              style={[styles.button, loading && { opacity: 0.7 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              <LinearGradient
                colors={["#0055A4", "#003366"]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Creating..." : "Create Account"}
                </Text>
              </LinearGradient>
            </Pressable>

            <Text style={styles.footerText}>
              Already completed setup?{" "}
              <Text
                style={styles.loginLink}
                onPress={() => router.push("/login")}
              >
                Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1D4ED8",
  },
  subtitle: {
    fontSize: 18,
    color: "#374151",
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginVertical: 16,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  passwordBox: {
    position: "relative",
    marginBottom: 16,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    paddingRight: 44,
    backgroundColor: "#FFFFFF",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
  },
  currencyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  currencyText: {
    color: "#374151",
  },
  button: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 24,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  infoBox: {
    backgroundColor: "#FEFCE8",
    borderColor: "#FACC15",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontWeight: "700",
    color: "#92400E",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: "#92400E",
  },
  footerText: {
    textAlign: "center",
    color: "#4B5563",
  },
  loginLink: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
