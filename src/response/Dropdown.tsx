import { Question } from "../types/type";

const Dropdown: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <select className="w-full p-2 border border-gray-300 rounded-md" disabled>
      <option value="">선택하세요</option>
      {question.options?.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
