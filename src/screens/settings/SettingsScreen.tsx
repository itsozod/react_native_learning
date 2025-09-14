import { ThemeChanger } from "@features/themeChanger";
import Profile from "./ui/Profile";
import { Text, View } from "@shared/ui/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@shared/hooks/useTheme";
import { auth } from "FirebaseConfig";
import { signOut } from "@firebase/auth";

export default function SettingsScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Profile />
      <ThemeChanger />
      <TouchableOpacity
        style={styles.log_out}
        onPress={() => {
          signOut(auth);
        }}
      >
        <Text style={styles.log_out_text}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
    height: "100%",
    // alignItems: "center",
  },
  log_out: {
    backgroundColor: "red",
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 8,
  },
  log_out_text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
