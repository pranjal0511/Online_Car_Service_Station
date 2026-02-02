import { Redirect } from "expo-router";
import { View, Text } from 'react-native'

// export default function Home() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>WEB OK </Text>
//     </View>
//   )
// }

export default function Index() {
  const isLoggedIn = true; // later from storage

  return isLoggedIn ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
