import { Question } from "../types/type";

const Radio: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <div className="space-y-2">
      {question.options?.map((option, index) => (
        <label key={index} className="flex items-center">
          <input
            type="radio"
            name={`question-${question.id}`}
            className="mr-2"
            disabled
          />
          {option}
        </label>
      ))}
    </div>
  );
};
export default Radio;
