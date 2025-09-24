import { useTheme } from "@shared/hooks/useTheme";
import { ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

type ButtonProps = PressableProps & {
  children: ReactNode;
};

const Button = (props: ButtonProps) => {
  const { style, children, ...otherProps } = props;
  const { colors } = useTheme();
  return (
    <Pressable
      style={(state) => {
        const { pressed } = state;

        const defaultStyles: StyleProp<ViewStyle> = [
          styles.base,
          pressed && styles.pressed,
          { backgroundColor: colors.quizBtnBg },
        ];

        // merge with user styles
        if (typeof style === "function") {
          return [defaultStyles, style(state)];
        }
        return [defaultStyles, style];
      }}
      {...otherProps}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 4,
  },
  pressed: {
    opacity: 0.4,
  },
});

export default Button;
