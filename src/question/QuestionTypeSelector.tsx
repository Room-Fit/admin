import { QuestionType, QUESTION_TYPE_LABELS } from "../types/type";

interface QuestionTypeSelectorProps {
  onSelectType: (type: QuestionType) => void;
}

const QuestionTypeSelector = ({ onSelectType }: QuestionTypeSelectorProps) => {
  return (
    <div className="w-64 p-4 bg-white border-r border-gray-200">
      <h2 className="mb-4 text-lg font-semibold">질문 유형</h2>
      <div className="space-y-2">
        {(Object.entries(QUESTION_TYPE_LABELS) as [QuestionType, string][]).map(
          ([type, label]) => (
            <button
              key={type}
              onClick={() => onSelectType(type)}
              className="w-full px-4 py-2 text-sm text-left text-gray-700 transition-colors duration-150 ease-in-out rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="font-medium">{label}</div>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default QuestionTypeSelector;
