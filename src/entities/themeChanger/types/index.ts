import Colors from "@shared/constants/Colors";
import { ReactNode } from "react";

export type Theme = "dark" | "light" | "system";

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export interface ThemeProviderState {
  theme: Theme;
  effectiveTheme: "light" | "dark";
  colors: typeof Colors.light;
  setTheme: (theme: Theme) => void;
}

export interface Themes {
  name: Theme;
  title: Capitalize<Theme>;
  icon: ReactNode;
}
