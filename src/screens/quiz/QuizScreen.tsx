import { View } from "@shared/ui/Themed";
import { StyleSheet } from "react-native";
import QuizQuestions from "./ui/QuizQuestions";

const QuizScreen = () => {
  return (
    <View style={styles.quiz_container}>
      <QuizQuestions />
    </View>
  );
};

const styles = StyleSheet.create({
  quiz_container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: 40,
  },
});

export default QuizScreen;
