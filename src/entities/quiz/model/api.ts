import { doc, getDoc } from "firebase/firestore";
import { QuizData } from "./types";
import { db } from "FirebaseConfig";

export const getQuizzes = async (
  id: string | string[]
): Promise<QuizData | null> => {
  const quizRef = doc(db, "quizzes", id as string);
  const quizzes = await getDoc(quizRef);
  if (quizzes.exists()) {
    return quizzes.data() as QuizData;
  } else {
    return null;
  }
};
