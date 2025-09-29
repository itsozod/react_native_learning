import { QuizIconData } from "@entities/quiz";
import HtmlIcon from "@shared/assets/icons/html.svg";
import CssIcon from "@shared/assets/icons/css.svg";
import JsIcon from "@shared/assets/icons/js.svg";
import ReactIcon from "@shared/assets/icons/react.svg";

export const quizIcons: QuizIconData = {
  1: {
    icon: <HtmlIcon width={54} height={54} />,
  },
  2: {
    icon: <CssIcon width={54} height={54} />,
  },
  3: {
    icon: <JsIcon width={54} height={54} />,
  },
  4: {
    icon: <ReactIcon width={54} height={54} />,
  },
};
