import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "@shared/ui/Themed";
import HtmlIcon from "@shared/assets/icons/html.svg";
import CssIcon from "@shared/assets/icons/css.svg";
import JsIcon from "@shared/assets/icons/js.svg";
import ReactIcon from "@shared/assets/icons/react.svg";
import { useRouter } from "expo-router";
import { useTheme } from "@shared/hooks/useTheme";

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[styles.title_container, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome to the
        </Text>
        <Text style={[styles.sub_title, { color: colors.text }]}>
          Frontend Quiz!
        </Text>
        <Text style={{ color: colors.text }}>
          Pick up a subject to get started
        </Text>
      </View>
      <View
        style={[styles.separator, { backgroundColor: colors.separatorColor }]}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View
        style={[styles.quiz_container, { backgroundColor: colors.background }]}
      >
        {quizes.map((quiz) => {
          return (
            <TouchableOpacity
              key={quiz.id}
              style={[
                styles.button,
                {
                  backgroundColor: colors.quizBtnBg,
                },
              ]}
              onPress={() => {
                router.push(`/quiz/${quiz.id}`);
              }}
            >
              {quiz.icon}
              <Text style={{ color: colors.text }}>{quiz.name}</Text>
            </TouchableOpacity>
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
