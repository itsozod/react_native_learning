import useAuth from "@shared/hooks/useAuth";
import { useTheme } from "@shared/hooks/useTheme";
import { Text, View } from "@shared/ui/Themed";
import { StyleSheet } from "react-native";

const Profile = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.welcome_text, { color: colors.text }]}>
        Welcome {user?.email}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome_text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Profile;
