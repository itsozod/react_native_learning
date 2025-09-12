import { Themes } from "@entities/themeChanger";
import { MaterialIcons } from "@expo/vector-icons";

export const themes: Themes[] = [
  {
    name: "light",
    title: "Light",
    icon: <MaterialIcons name="light-mode" size={24} color="#7C3AED" />,
  },
  {
    name: "dark",
    title: "Dark",
    icon: <MaterialIcons name="dark-mode" size={24} color="#7C3AED" />,
  },
  {
    name: "system",
    title: "System",
    icon: <MaterialIcons name="brightness-6" size={24} color="#7C3AED" />,
  },
];
