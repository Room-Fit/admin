import { Question } from "../../types/type";

export interface SurveyProps {
  initialQuestion?: Question[];
  onChange?: (question: Question[]) => void;
}
