import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Home,
  User,
  Settings,
  Book,
  Layers,
  MapPin,
} from "lucide-react-native";
import { ActivityIndicator, View } from "react-native";

export default function TabsLayout() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("@user_data");
      console.log("userData@@@",userData)
      if (userData) {
        const user = JSON.parse(userData);
        console.log("user.role@@@@@@@@@@", user.role);
        setRole(user.role); // "admin" or "user"
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4f46e5",
      }}
    >
      {/* HOME - always visible */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      {/* USER TABS */}
      <Tabs.Screen
        name="booking"
        options={{
          title: "Bookings",
          href: role === "admin" ? null : undefined,
          tabBarIcon: ({ color, size }) => <Book color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          href: role === "admin" ? null : undefined,
          tabBarIcon: ({ color, size }) => <Layers color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="stations"
        options={{
          title: "Stations",
          href: role === "admin" ? null : undefined,
          tabBarIcon: ({ color, size }) => <MapPin color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          // href: role === "admin" ? undefined : null,
          // href: role === "admin" ? null : undefined,
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />

      {/* ADMIN TAB */}
      <Tabs.Screen
        name="admin"
        options={{
          title: "Admin",
          href: role === "admin" ? undefined : null,
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
