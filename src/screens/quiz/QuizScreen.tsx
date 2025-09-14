import { Text, View } from "@shared/ui/Themed";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "FirebaseConfig";

const QuizScreen = () => {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState("");

  const getQuizzes = async () => {
    const quizRef = doc(db, "quizzes", String(id));
    const quizzes = await getDoc(quizRef);
    if (quizzes.exists()) {
      setTitle(quizzes.data().title);
    }
  };

  useEffect(() => {
    if (id) {
      getQuizzes();
    }
  }, [id]);

  return (
    <View style={styles.quiz_container}>
      <Text>Quiz: {title}</Text>
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
