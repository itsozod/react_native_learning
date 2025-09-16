import useAuth from "@shared/hooks/useAuth";
import { View } from "@shared/ui/Themed";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

const Layout = () => {
  const { user, initializing } = useAuth();

  if (initializing)
    return (
      <View
        style={{
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <Stack>
      <Stack.Protected guard={Boolean(user)}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="quiz/[id]"
          options={{
            presentation: "transparentModal",
            headerTitle: "Questions",
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!Boolean(user)}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
};

export default Layout;
