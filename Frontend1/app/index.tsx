import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = true; // later from storage

  return isLoggedIn ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
