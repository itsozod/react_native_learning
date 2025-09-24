import { StyleSheet } from "react-native";
import { View, Text } from "@shared/ui/Themed";
import HtmlIcon from "@shared/assets/icons/html.svg";
import CssIcon from "@shared/assets/icons/css.svg";
import JsIcon from "@shared/assets/icons/js.svg";
import ReactIcon from "@shared/assets/icons/react.svg";
import { useRouter } from "expo-router";
import { useTheme } from "@shared/hooks/useTheme";
import { UI } from "@shared/ui";

const quizes = [
  {
    id: 1,
    name: "HTML",
    icon: <HtmlIcon width={24} height={24} />,
  },
  {
    id: 2,
    name: "CSS",
    icon: <CssIcon width={24} height={24} />,
  },
  {
    id: 3,
    name: "JavaScript",
    icon: <JsIcon width={24} height={24} />,
  },
  {
    id: 4,
    name: "React JS",
    icon: <ReactIcon width={24} height={24} />,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.title}>Welcome to the</Text>
        <Text style={styles.sub_title}>Frontend Quiz!</Text>
        <Text>Pick up a subject to get started</Text>
      </View>
      <View
        style={[styles.separator, { backgroundColor: colors.separatorColor }]}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.quiz_container}>
        {quizes.map((quiz) => {
          return (
            <UI.Button
              key={quiz.id}
              style={styles.button}
              onPress={() => {
                router.push(`/quiz/${quiz.id}`);
              }}
            >
              {quiz.icon}
              <Text>{quiz.name}</Text>
            </UI.Button>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    padding: 20,
  },
  title_container: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  title: {
    fontSize: 22,
  },
  sub_title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  quiz_container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 5,
    width: "100%",
    height: "100%",
    maxWidth: 500,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  inputs_container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
});
