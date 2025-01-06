export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  description?: string;
  options?: string[];
  required: boolean;
  order: number;
}

export type QuestionType = "text" | "radio" | "checkbox" | "dropdown" | "range";

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  text: "텍스트 입력",
  radio: "단일 선택",
  checkbox: "다중 선택",
  dropdown: "드롭 다운",
  range: "범위",
};
