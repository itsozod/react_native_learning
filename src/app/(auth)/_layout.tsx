import { useTheme } from "@shared/hooks/useTheme";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[styles.auth_layout, { backgroundColor: colors.background }]}
      edges={["top", "left", "right", "bottom"]}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ animation: "none" }} />
        <Stack.Screen name="login" options={{ animation: "slide_from_left" }} />
        <Stack.Screen
          name="register"
          options={{ animation: "slide_from_right" }}
        />
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  auth_layout: {
    height: "100%",
  },
});

export default AuthLayout;
