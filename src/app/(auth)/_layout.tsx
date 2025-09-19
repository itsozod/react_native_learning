import { View } from "@shared/ui/Themed";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const AuthLayout = () => {
  return (
    <View style={styles.auth_layout}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" options={{ animation: "slide_from_left" }} />
        <Stack.Screen
          name="register"
          options={{ animation: "slide_from_right" }}
        />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  auth_layout: {
    height: "100%",
  },
});

export default AuthLayout;
