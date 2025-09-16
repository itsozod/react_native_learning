import useAuth from "@shared/hooks/useAuth";
import { useTheme } from "@shared/hooks/useTheme";
import { Text, View } from "@shared/ui/Themed";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import GoogleIcon from "@shared/assets/icons/google.svg";
import FacebookIcon from "@shared/assets/icons/facebook.svg";
import AppleIcon from "@shared/assets/icons/apple.svg";
import { useMutation } from "@tanstack/react-query";
import { Link } from "expo-router";

const SignUp = () => {
  const { colors } = useTheme();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInMutate, isPending } = useMutation({
    mutationFn: signIn,
  });

  return (
    <View
      style={[
        styles.login_container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View
        style={[
          styles.title_container,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text style={{ color: "#669bbc", fontWeight: "bold", fontSize: 30 }}>
          Create new account
        </Text>
        <Text style={[styles.title, { color: colors.text }]}>
          Create an account to enjoy quizzes!
        </Text>
      </View>
      <View
        style={[
          styles.input_container,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Email"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          disabled={isPending}
          onPress={() => {
            signInMutate({ email, password });
          }}
          style={styles.sign_in}
        >
          {isPending && <ActivityIndicator />}
          <Text style={styles.sign_in_text}>Sign in</Text>
        </TouchableOpacity>
        <Link
          href="/(auth)"
          style={{ textAlign: "center", color: colors.text }}
        >
          Already have an account
        </Link>
      </View>
      <View
        style={[
          styles.sign_in_options_container,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text style={{ color: "#669bbc" }}>Or continue with</Text>
        <View
          style={[
            styles.options_container,
            {
              backgroundColor: colors.background,
            },
          ]}
        >
          <GoogleIcon />
          <FacebookIcon />
          <AppleIcon />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login_container: {
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 40,
  },
  title_container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 26,
  },
  title: {
    fontWeight: "semibold",
    fontSize: 20,
    textAlign: "center",
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
  sign_in: {
    backgroundColor: "#669bbc",
    padding: 14,
    borderRadius: 8,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    width: "100%",
  },
  sign_in_text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "semibold",
    color: "#fff",
  },
  sign_in_options_container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  options_container: {
    flexDirection: "row",
    gap: 10,
  },
});
export default SignUp;
