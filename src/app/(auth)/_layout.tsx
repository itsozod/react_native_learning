import { useTheme } from "@shared/hooks/useTheme";
import { View } from "@shared/ui/Themed";
import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: colors.background,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ animation: "slide_from_left" }} />
        <Stack.Screen
          name="register"
          options={{ animation: "slide_from_right" }}
        />
      </Stack>
    </View>
  );
};

export default AuthLayout;
