import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Question, QUESTION_TYPE_LABELS } from "../types/type";

interface QuestionItemProps {
  question: Question;
  isSelected: boolean;
  isMultiSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const QuestionItem = ({
  question,
  isSelected,
  onClick,
  isMultiSelected,
}: QuestionItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(e);
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`question-item relative
        p-4 rounded-lg border-2 cursor-pointer
        ${
          isMultiSelected
            ? "border-purple-500 bg-purple-50"
            : isSelected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-gray-300"
        }
      `}
      {...attributes}
      {...listeners}
    >
      <div className="pr-8 cursor-pointer" onClick={handleClick}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-1 text-sm text-gray-500">
              {QUESTION_TYPE_LABELS[question.type]}
            </div>
            <div className="font-medium">
              {question.question || "(질문을 입력하세요)"}
            </div>
            <div className="my-1 text-xs text-gray-600">
              {question.description || "(설명을 입력하세요)"}
            </div>
            {question.options && (
              <div className="mt-2 text-sm text-gray-600">
                {question.options.map((option) => (
                  <div key={question.id} className="flex items-center mt-1">
                    {question.type === "radio" && (
                      <div className="w-4 h-4 mr-2 border border-gray-300 rounded-full" />
                    )}
                    {question.type === "checkbox" && (
                      <div className="w-4 h-4 mr-2 border border-gray-300 rounded" />
                    )}
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          {question.required && (
            <div className="text-sm text-red-500">*필수</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
