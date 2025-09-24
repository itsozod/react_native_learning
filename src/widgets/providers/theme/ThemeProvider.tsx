import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@shared/constants/Colors";
import {
  Theme,
  ThemeProviderProps,
  ThemeProviderState,
} from "@entities/themeChanger";
import { useQuery } from "@tanstack/react-query";

const initialState: ThemeProviderState = {
  theme: "light",
  effectiveTheme: "light",
  colors: Colors.light,
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export default function ThemeProvider({
  children,
  defaultTheme = "light",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeApp] = useState<Theme>(defaultTheme);
  const systemTheme = useColorScheme();

  const effectiveTheme =
    theme === "system" ? (systemTheme === "dark" ? "dark" : "light") : theme;

  const colors = effectiveTheme === "dark" ? Colors.dark : Colors.light;

  useQuery({
    queryKey: ["theme"],
    queryFn: async () => {
      try {
        const value = await AsyncStorage.getItem("theme");
        if (value === "dark" || value === "light" || value === "system") {
          setThemeApp(value);
          return value;
        }
      } catch (e) {
        console.log("Error loading theme", e);
      }
    },
  });

  useEffect(() => {
    if (theme === "system" && systemTheme) {
      setThemeApp("system");
    }
  }, [systemTheme]);

  const value = {
    theme,
    colors,
    effectiveTheme,
    setTheme: async (newTheme: Theme) => {
      try {
        await AsyncStorage.setItem("theme", newTheme);
        setThemeApp(newTheme);
      } catch (e) {
        console.log("Error saving theme", e);
      }
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
