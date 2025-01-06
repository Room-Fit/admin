import { Question } from "../types/type";
import QuestionPreview from "../question/QuestionPreview";

interface SurveyPreviewProps {
  metadata: {
    title: string;
    description: string;
  };
  questions: Question[];
}

const SurveyPreview = ({ metadata, questions }: SurveyPreviewProps) => {
  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold">{metadata.title}</h1>
        {metadata.description && (
          <p className="text-gray-600 whitespace-pre-line">
            {metadata.description}
          </p>
        )}
      </div>

      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="pb-6 border-b">
            <div className="flex items-start mb-4">
              <span className="mr-2 text-gray-500">{index + 1}.</span>
              <div>
                <div className="mb-2 font-medium">
                  {question.question}
                  {question.required && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </div>
                <QuestionPreview question={question} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled
        >
          만들기
        </button>
      </div>
    </div>
  );
};

export default SurveyPreview;
