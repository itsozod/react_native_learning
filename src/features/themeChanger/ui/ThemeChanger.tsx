import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "@shared/ui/Themed";
import { useTheme } from "@shared/hooks/useTheme";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { themes } from "./themes";
import { Theme } from "@entities/themeChanger";

const ThemeChanger = () => {
  const { theme, colors, setTheme } = useTheme();
  const [selected, setSelected] = useState<Theme>(theme);

  return (
    <View style={styles.container}>
      {themes?.map((theme) => {
        return (
          <Pressable
            key={theme.name}
            onPress={() => {
              setSelected(theme.name);
              setTheme(theme.name);
            }}
            style={[styles.button, { backgroundColor: colors.quizBtnBg }]}
          >
            <View style={styles.theme}>
              {theme.icon}
              <Text
                style={{
                  color: colors.text,
                }}
              >
                {theme.title}
              </Text>
            </View>
            {selected === theme.name ? (
              <MaterialIcons
                name="radio-button-checked"
                size={24}
                color="#7C3AED"
              />
            ) : (
              <MaterialIcons
                name="radio-button-unchecked"
                size={24}
                color="#aaa"
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  theme: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "transparent",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ThemeChanger;
