import { Question } from "../types/type";

const Checkbox: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <div className="space-y-2">
      {question.options?.map((option, index) => (
        <label key={index} className="flex items-center">
          <input type="checkbox" className="mr-2" disabled />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
