import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="register"
        options={{ animation: "slide_from_right" }}
      />
    </Stack>
  );
};

export default AuthLayout;
