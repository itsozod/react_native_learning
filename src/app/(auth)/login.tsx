import useAuth from "@shared/hooks/useAuth";
import { useTheme } from "@shared/hooks/useTheme";
import { Text, View } from "@shared/ui/Themed";
import { MaterialIcons } from "@expo/vector-icons";

import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

const SignIn = () => {
  const { colors } = useTheme();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInMutate, isPending } = useMutation({
    mutationFn: signIn,
  });

  return (
    <View style={[styles.login_container]}>
      <View style={[styles.title_container]}>
        <MaterialIcons
          onPress={() => router.replace("/(auth)")}
          name="arrow-back"
          size={24}
          color={colors.text}
        />
        <Text style={[styles.title]}>Hello there</Text>
      </View>
      <View style={[styles.input_container]}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={{ color: colors.text }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.separator} />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={{ color: colors.text }}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <View style={styles.separator} />
        </View>
        <Text style={styles.forgot_password}>Forgot Password?</Text>
      </View>
      <View style={styles.sign_in_container}>
        <View style={[styles.btn_separator]} />
        <TouchableOpacity
          disabled={isPending}
          onPress={() => {
            signInMutate({ email, password });
          }}
          style={styles.sign_in}
        >
          {isPending && <ActivityIndicator />}
          <Text style={styles.sign_in_text}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login_container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    height: "100%",
    gap: 40,
  },
  separator: {
    width: "100%",
    height: 1,
    marginVertical: 5,
    backgroundColor: "#7C3AED",
  },
  btn_separator: {
    width: "100%",
    marginTop: "auto",
    height: 1,
  },
  title_container: {
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  input_container: {
    width: "100%",
    gap: 30,
  },
  input: {
    width: "100%",
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#F1F4FF",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  forgot_password: {
    color: "#7C3AED",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  sign_in_container: {
    backgroundColor: "transparent",
    marginTop: "auto",
    gap: 10,
  },
  sign_in: {
    backgroundColor: "#7C3AED",
    padding: 14,
    borderRadius: 50,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    width: "100%",
  },
  sign_in_text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "semibold",
    color: "#fff",
  },
});

export default SignIn;
