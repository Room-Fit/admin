import { Question, QUESTION_TYPE_LABELS } from "../types/type";

interface QuestionEditorProps {
  question: Question;
  onQuestionChange: (question: Question) => void;
  onDeleteQuestion: (questionId: string) => void;
}

const QuestionEditor = ({
  question,
  onQuestionChange,
  onDeleteQuestion,
}: QuestionEditorProps) => {
  const handleOptionChange = (index: number, value: string) => {
    if (!question.options) return;

    const newOptions = [...question.options];
    newOptions[index] = value;

    onQuestionChange({
      ...question,
      options: newOptions,
    });
  };

  const handleAddOption = () => {
    if (!question.options) return;

    onQuestionChange({
      ...question,
      options: [...question.options, `옵션 ${question.options.length + 1}`],
    });
  };

  const handleDeleteOption = (index: number) => {
    if (!question.options) return;

    onQuestionChange({
      ...question,
      options: question.options.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="p-6 bg-white border-l border-gray-200 w-80">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">질문 편집</h2>
        <button
          onClick={() => onDeleteQuestion(question.id)}
          className="text-sm text-red-500 hover:text-red-700"
        >
          삭제
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            질문 유형
          </label>
          <div className="text-gray-600">
            {QUESTION_TYPE_LABELS[question.type]}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            질문
          </label>
          <input
            type="text"
            value={question.question}
            onChange={(e) =>
              onQuestionChange({ ...question, question: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="질문을 입력하세요"
          />
        </div>

        {question.options && question.type !== "range" && (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              옵션
            </label>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {question.options!.length > 1 && (
                    <button
                      onClick={() => handleDeleteOption(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddOption}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                + 옵션 추가
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="required"
            checked={question.required}
            onChange={(e) =>
              onQuestionChange({ ...question, required: e.target.checked })
            }
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="required" className="ml-2 text-sm text-gray-700">
            필수 응답
          </label>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
