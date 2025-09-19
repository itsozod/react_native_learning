import useAuth from "@shared/hooks/useAuth";
import Loader from "@shared/ui/Loader";
import { View } from "@shared/ui/Themed";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

const Layout = () => {
  const { user, initializing } = useAuth();

  if (initializing)
    return (
      <View style={styles.loader_container}>
        <Loader size="large" />
      </View>
    );

  return (
    <View style={styles.layout}>
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
