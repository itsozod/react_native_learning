import useAuth from "@shared/hooks/useAuth";
import { useTheme } from "@shared/hooks/useTheme";
import { Text, View } from "@shared/ui/Themed";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  LayoutChangeEvent,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import PencilIcon from "@shared/assets/icons/pencil-part-2-svgrepo-com.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
const v1v2 = "v1";

const SignUp = () => {
  const { colors } = useTheme();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signUpMutate, isPending } = useMutation({
    mutationFn: signUp,
  });

  const { bottom } = useSafeAreaInsets();

  const [footerHeight, setFooterHeight] = useState(0);

  const handleLayout = useCallback((evt: LayoutChangeEvent) => {
    setFooterHeight(evt.nativeEvent.layout.height);
  }, []);
  const offset = useMemo(
    () => ({ closed: 0, opened: v1v2 ? 0 : bottom }),
    [bottom]
  );

  return (
    <View
      style={{ height: "100%", paddingHorizontal: 20, paddingVertical: 40 }}
    >
      <KeyboardAwareScrollView
        bottomOffset={(v1v2 ? footerHeight : 0) + 50}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.login_container]}>
          <View style={[styles.title_container]}>
            <MaterialIcons
              onPress={() => router.replace("/(auth)")}
              name="arrow-back"
              size={24}
              color={colors.text}
            />
            <View style={styles.titleRow}>
              <Text style={[styles.title]}>Create an account</Text>
              <PencilIcon width={24} height={24} />
            </View>
            <Text style={{ fontSize: 18 }}>
              Please enter your email and password
            </Text>
          </View>
          <View style={[styles.input_container]}>
            <View>
              <Text style={[styles.label]}>Email</Text>
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
            <View style={{ backgroundColor: "transparent" }}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={password}
                style={{ color: colors.text }}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <View style={styles.separator} />
            </View>
            <Text style={styles.forgot_password}>Forgot Password?</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={offset}>
        <View style={styles.sign_in_container} onLayout={handleLayout}>
          <View style={[styles.btn_separator]} />
          <TouchableOpacity
            disabled={isPending}
            onPress={() => {
              signUpMutate({ email, password });
            }}
            style={styles.sign_in}
          >
            {isPending && <ActivityIndicator />}
            <Text style={styles.sign_in_text}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardStickyView>
    </View>
  );
};

const styles = StyleSheet.create({
  login_container: {
    height: "100%",
    gap: 40,
  },
  btn_separator: {
    width: "100%",
    marginTop: "auto",
    height: 1,
  },
  separator: {
    width: "100%",
    height: 1,
    marginVertical: 5,
    backgroundColor: "#7C3AED",
  },
  title_container: {
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 30,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  input_container: {
    width: "100%",
    gap: 30,
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
  input: {
    width: "100%",
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#F1F4FF",
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
export default SignUp;
