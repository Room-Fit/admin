import { useState } from "react";
import type { Question } from "../types/type";
import SurveyPreview from "./SurveyPreview";
import { SurveyProps } from "./types/type";
import SurveyView from "./SurveyView";

const ServeyContainer = ({ initialQuestion, onChange }: SurveyProps) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestion || []);
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
  });

  const [isPreview, setIsPreview] = useState(false);

  const handleQuestionChange = (newQuestion: Question[]) => {
    setQuestions(newQuestion);
    onChange?.(newQuestion);
  };

  return (
    <div className="min-h-screen bg-purple-100">
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b">
        <h1 className="text-xl font-semibold">설문 제작</h1>
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2"
        >
          {isPreview ? "편집하기" : "미리보기"}
        </button>
      </div>

      {isPreview ? (
        <div className="p-6">
          <SurveyPreview metadata={metadata} questions={questions} />
        </div>
      ) : (
        <div className="p-6">
          <SurveyView
            questions={questions}
            selectedQuestionId={selectedQuestionId}
            metadata={metadata}
            onMetadataChange={setMetadata}
            onQuestionChange={handleQuestionChange}
            onSelectQuestion={setSelectedQuestionId}
          />
        </div>
      )}
    </div>
  );
};

export default ServeyContainer;
