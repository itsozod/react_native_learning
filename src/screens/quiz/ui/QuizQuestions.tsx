import { Text, View } from "@shared/ui/Themed";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useState } from "react";
import { UI } from "@shared/ui";
import { QuizId } from "@entities/quiz";
import { MaterialIcons } from "@expo/vector-icons";
import { quizIcons } from "./icons";
import useGetQuizQuestions from "@features/quiz/hooks/useGetQuizQuestions";
import ResultModal from "./ResultModal";

const QuizQuestions = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isSuccess } = useGetQuizQuestions(id);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [modalVisible, setIsModalVisible] = useState<boolean>(Boolean);
  const questionData = data?.questions;
  const typeId = id as QuizId;
  const currentQuestion = questionData?.[questionCount];

  const checkAnswer = () => {
    if (selectedAnswer === currentQuestion?.answer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const restart = () => {
    setCorrectCount(0);
    setIsSubmitted(false);
    setQuestionCount(0);
    setSelectedAnswer("");
    setIsModalVisible(!modalVisible);
  };

  const goHome = () => {
    router.push("/(tabs)/home");
    setIsModalVisible(!modalVisible);
  };

  const handleSubmit = () => {
    if (!isSubmitted) {
      setIsSubmitted(true);
      checkAnswer();
    } else {
      if (questionCount + 1 === questionData?.length) {
        setIsModalVisible(!modalVisible);
        return;
      }
      setSelectedAnswer("");
      setIsSubmitted(false);
      setQuestionCount((prev) => prev + 1);
    }
  };

  const getOptionStyle = (option: string) => {
    if (!isSubmitted) {
      return [
        styles.answer_btn,
        selectedAnswer === option && styles.button_selected,
      ];
    }

    if (option === currentQuestion?.answer) {
      return [styles.answer_btn, styles.correct_btn];
    }

    if (option === selectedAnswer && option !== currentQuestion?.answer) {
      return [styles.answer_btn, styles.wrong_btn];
    }

    return styles.answer_btn;
  };

  if (isLoading)
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (isSuccess && !data) {
    return <Text>Not found</Text>;
  }

  return (
    <>
      <ResultModal
        modalVisible={modalVisible}
        correctCount={correctCount}
        questionDataLength={questionData?.length}
        handleCloseModal={() => setIsModalVisible(!modalVisible)}
        handleGoHome={goHome}
        restart={restart}
      />

      <View style={styles.main_container}>
        <View style={styles.quiz_title_container}>
          {quizIcons?.[typeId].icon}
          <Text style={styles.quiz_title}>{data?.title}</Text>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Test your understanding with this comprehensive quiz
          </Text>
        </View>

        <View style={styles.question_container}>
          <Text style={styles.quiestion_count_text}>
            Question {questionCount + 1} of {questionData?.length}
          </Text>
          <Text style={styles.question_text}>{currentQuestion?.question}</Text>
        </View>

        <View style={styles.option_container}>
          {currentQuestion?.options?.map((option, index) => {
            return (
              <UI.Button
                key={index}
                style={getOptionStyle(option)}
                disabled={isSubmitted}
                onPress={() => setSelectedAnswer(option)}
              >
                <View style={styles.option_text_container}>
                  {option === selectedAnswer ? (
                    <MaterialIcons
                      name="radio-button-checked"
                      size={24}
                      color="#7C3AED"
                    />
                  ) : (
                    <MaterialIcons
                      name="radio-button-checked"
                      size={24}
                      color="#aaa"
                    />
                  )}
                  <Text style={styles.option_text}>{option}</Text>
                </View>
              </UI.Button>
            );
          })}
        </View>

        <UI.Button
          disabled={!selectedAnswer}
          style={[styles.submit_btn, selectedAnswer && styles.button_selected]}
          onPress={handleSubmit}
        >
          <Text>{isSubmitted ? "Next" : "Submit"}</Text>
        </UI.Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loading_container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: 40,
  },
  main_container: {
    height: "100%",
    gap: 18,
  },
  quiz_title_container: {
    gap: 7,
    alignItems: "center",
  },
  quiz_title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  question_container: {
    gap: 10,
  },
  quiestion_count_text: {
    fontSize: 16,
  },
  question_text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  option_container: {
    width: 350,
    gap: 8,
  },
  option_text: {
    flex: 1,
    flexShrink: 1,
  },
  answer_btn: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  button_selected: {
    borderWidth: 1,
    borderColor: "#7C3AED",
  },
  correct_btn: {
    borderWidth: 1,
    borderColor: "green",
  },
  wrong_btn: {
    borderWidth: 1,
    borderColor: "red",
  },
  option_text_container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  submit_btn: {
    alignItems: "center",
    marginTop: "auto",
  },
});

export default QuizQuestions;
