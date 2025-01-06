import QuestionEditor from "../question/QuestionEditor";
import QuestionList from "../question/QuestionList";
import QuestionTypeSelector from "../question/QuestionTypeSelector";
import SurveyHeader from "./SurveyHeader";
import { QuestionType, Question } from "../types/type";

interface SurveyViewProps {
  questions: Question[];
  selectedQuestionId: string;
  metadata: {
    title: string;
    description: string;
  };
  onQuestionChange: (questions: Question[]) => void;
  onMetadataChange: (metadata: { title: string; description: string }) => void;
  onSelectQuestion: (questionId: string) => void;
}

const SurveyView = ({
  questions,
  selectedQuestionId,
  metadata,
  onMetadataChange,
  onQuestionChange,
  onSelectQuestion,
}: SurveyViewProps) => {
  const handleAddQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: `question=${questions.length + 1}`,
      type,
      question: "",
      required: false,
      order: questions.length,
      ...(type != "text" ? { options: ["옵션 1"] } : {}),
    };
    onQuestionChange([...questions, newQuestion]);
  };

  return (
    <>
      <SurveyHeader metadata={metadata} onMetadataChange={onMetadataChange} />
      <div className="flex gap-6">
        <QuestionTypeSelector onSelectType={handleAddQuestion} />
        <div className="flex-1">
          <QuestionList
            questions={questions}
            selectedQuestionId={selectedQuestionId}
            onQuestionsChange={onQuestionChange}
            onSelectQuestion={onSelectQuestion}
          />
        </div>
        {selectedQuestionId && (
          <QuestionEditor
            question={questions.find((q) => q.id === selectedQuestionId)!}
            onQuestionChange={(updatedQuestion) => {
              onQuestionChange(
                questions.map((q) =>
                  q.id === selectedQuestionId ? updatedQuestion : q
                )
              );
            }}
            onDeleteQuestion={(questionId) => {
              onQuestionChange(questions.filter((q) => q.id !== questionId));
              onSelectQuestion("");
            }}
          />
        )}
      </div>
    </>
  );
};

export default SurveyView;
