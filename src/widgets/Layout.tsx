import useAuth from "@shared/hooks/useAuth";
import { useTheme } from "@shared/hooks/useTheme";
import { View } from "@shared/ui/Themed";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

const Layout = () => {
  const { user, initializing } = useAuth();
  const { colors } = useTheme();

  if (initializing)
    return (
      <View
        style={{
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: colors.background,
      }}
    >
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
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </View>
  );
};

export default Layout;
