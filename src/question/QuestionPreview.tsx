import Checkbox from "../response/Checkbox";
import Dropdown from "../response/Dropdown";
import Radio from "../response/Radio";
import SingleRange from "../response/SingleRange";
import Text from "../response/Text";
import { Question } from "../types/type";

const QuestionPreview: React.FC<{ question: Question }> = ({ question }) => {
  switch (question.type) {
    case "text":
      return <Text />;

    case "radio":
      return <Radio question={question} />;

    case "checkbox":
      return <Checkbox question={question} />;

    case "dropdown":
      return <Dropdown question={question} />;

    case "range":
      return <SingleRange />;

    default:
      return null;
  }
};

export default QuestionPreview;
