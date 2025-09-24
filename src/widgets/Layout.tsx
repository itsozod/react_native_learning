import { useTheme } from "@shared/hooks/useTheme";
import { View } from "@shared/ui/Themed";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "@shared/hooks/useAuth";
import Loader from "@shared/ui/Loader";
import { KeyboardProvider } from "react-native-keyboard-controller";

const Layout = () => {
  const { user, initializing } = useAuth();
  const { effectiveTheme, colors } = useTheme();

  return (
    <KeyboardProvider>
      <SafeAreaView
        style={[styles.layout, { backgroundColor: colors.background }]}
        edges={["left", "right"]}
      >
        <StatusBar
          translucent={false}
          backgroundColor={effectiveTheme === "dark" ? "#000" : "#fff"}
          style={effectiveTheme === "dark" ? "light" : "dark"}
        />

        {initializing ? (
          <View style={styles.loader_container}>
            <Loader size="large" />
          </View>
        ) : (
          <Stack>
            <Stack.Protected guard={!Boolean(user)}>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Protected guard={Boolean(user)}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="quiz/[id]"
                options={{
                  presentation: "modal",
                  headerTitle: "Questions",
                  headerTintColor: colors.text,
                  headerStyle: { backgroundColor: colors.background },
                }}
              />
              <Stack.Screen
                name="settings/theme"
                options={{
                  presentation: "modal",
                  headerTitle: "Theme settings",
                }}
              />
            </Stack.Protected>
          </Stack>
        )}
      </SafeAreaView>
    </KeyboardProvider>
  );
};

const styles = StyleSheet.create({
  layout: {
    height: "100%",
  },
  loader_container: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
});

export default Layout;
