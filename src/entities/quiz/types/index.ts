import { ReactElement } from "react";

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};
export type QuizId = "1" | "2" | "3" | "4";

export type QuizData = {
  title: string;
  questions: Question[];
};
export type QuizIconData = {
  [key in QuizId]: {
    icon: ReactElement;
  };
};
