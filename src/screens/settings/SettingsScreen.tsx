import { ThemeChanger } from "@features/themeChanger";
import Profile from "./ui/Profile";
import { Text, View } from "@shared/ui/Themed";
import { StyleSheet } from "react-native";
import useAuth from "@shared/hooks/useAuth";
import { UI } from "@shared/ui";

export default function SettingsScreen() {
  const { logOut } = useAuth();
  return (
    <View style={styles.container}>
      <Profile />
      <ThemeChanger />
      <UI.Button
        style={styles.log_out}
        onPress={() => {
          logOut();
        }}
      >
        <Text style={styles.log_out_text}>SIGN OUT</Text>
      </UI.Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
    height: "100%",
  },
  log_out: {
    backgroundColor: "#EDE9FE",
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 8,
  },
  log_out_text: {
    color: "#7C3AED",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
