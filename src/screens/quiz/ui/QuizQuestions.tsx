import { Text, View } from "@shared/ui/Themed";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Modal, StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "FirebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UI } from "@shared/ui";
import { QuizData, QuizIconData, QuizId } from "@entities/quiz";
import HtmlIcon from "@shared/assets/icons/html.svg";
import CssIcon from "@shared/assets/icons/css.svg";
import JsIcon from "@shared/assets/icons/js.svg";
import ReactIcon from "@shared/assets/icons/react.svg";
import { MaterialIcons } from "@expo/vector-icons";

const quizIcons: QuizIconData = {
  1: {
    icon: <HtmlIcon width={24} height={24} />,
  },
  2: {
    icon: <CssIcon width={24} height={24} />,
  },
  3: {
    icon: <JsIcon width={24} height={24} />,
  },
  4: {
    icon: <ReactIcon width={24} height={24} />,
  },
};

const getQuizzes = async (id: string | string[]): Promise<QuizData | null> => {
  const quizRef = doc(db, "quizzes", id as string);
  const quizzes = await getDoc(quizRef);
  if (quizzes.exists()) {
    return quizzes.data() as QuizData;
  } else {
    return null;
  }
};

const QuizQuestions = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [id],
    queryFn: async () => getQuizzes(id),
  });

  const questionData = data?.questions;
  const typeId = id as QuizId;
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [modalVisible, setIsModalVisible] = useState<boolean>(Boolean);

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
      <View style={styles.quiz_container}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (isSuccess && !data) {
    return <Text>Not found</Text>;
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setIsModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal_view}>
          <View style={styles.modal_container}>
            <Text>
              You solved {correctCount} out of {questionData?.length} questions
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <UI.Button onPress={goHome}>
                <Text>Home</Text>
              </UI.Button>
              <UI.Button onPress={restart}>
                <Text>Start again</Text>
              </UI.Button>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: "row", gap: 7, alignItems: "center" }}>
          {quizIcons?.[typeId].icon}
          <Text>{data?.title}</Text>
        </View>

        <View style={{ gap: 7 }}>
          <Text>
            Quiz {questionCount + 1} of {questionData?.length}
          </Text>
          <Text>{currentQuestion?.question}</Text>
        </View>

        <View style={{ gap: 8, width: 350 }}>
          {currentQuestion?.options?.map((option, index) => {
            return (
              <UI.Button
                key={index}
                style={getOptionStyle(option)}
                disabled={isSubmitted}
                onPress={() => setSelectedAnswer(option)}
              >
                <View
                  style={{
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <Text style={{ flex: 1, flexShrink: 1 }}>{option}</Text>
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
                </View>
              </UI.Button>
            );
          })}

          <UI.Button
            disabled={!selectedAnswer}
            style={[
              { alignItems: "center" },
              selectedAnswer && styles.button_selected,
            ]}
            onPress={handleSubmit}
          >
            <Text>{isSubmitted ? "Next" : "Submit"}</Text>
          </UI.Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modal_view: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal_container: {
    width: "100%",
    maxWidth: 350,
    borderRadius: 12,
    gap: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  quiz_container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: 40,
  },
  answer_btn: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  button_selected: {
    borderWidth: 1,
    borderColor: "#007bff",
  },
  correct_btn: {
    borderWidth: 1,
    borderColor: "green",
  },
  wrong_btn: {
    borderWidth: 1,
    borderColor: "red",
  },
});

export default QuizQuestions;
