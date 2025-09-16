import { Text, View } from "@shared/ui/Themed";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "FirebaseConfig";
import { useQuery } from "@tanstack/react-query";

const getQuizzes = async (id: string | string[]) => {
  const quizRef = doc(db, "quizzes", id as string);
  const quizzes = await getDoc(quizRef);
  if (quizzes.exists()) {
    return quizzes.data();
  }
};

const QuizScreen = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => getQuizzes(id),
    
  });

  return (
    <View style={styles.quiz_container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text>Quiz: {data?.title}</Text>
      )}
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
