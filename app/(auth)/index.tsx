import useAuth from "@shared/hooks/useAuth";
import { useTheme } from "@shared/hooks/useTheme";
import { Text, View } from "@shared/ui/Themed";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import GoogleIcon from "@shared/assets/icons/google.svg";
import FacebookIcon from "@shared/assets/icons/facebook.svg";
import AppleIcon from "@shared/assets/icons/apple.svg";

const Login = () => {
  const { colors } = useTheme();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Text style={{ color: "#1F41BB", fontWeight: "bold", fontSize: 30 }}>
          Login here
        </Text>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome back you'have {"\n"}
          been missed!
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
        <Text style={{ color: "#1F41BB", textAlign: "right" }}>
          Forgot your password?
        </Text>
        <TouchableOpacity
          onPress={() => {
            signIn(email, password);
          }}
          style={styles.sign_in}
        >
          <Text style={styles.sign_in}>Sign in</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: colors.text }}>
          Create new account
        </Text>
      </View>
      <View
        style={[
          styles.sign_in_options_container,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text style={{ color: "#1F41BB" }}>Or continue with</Text>
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
    backgroundColor: "#1F41BB",
    padding: 14,
    borderRadius: 8,
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

export default Login;
