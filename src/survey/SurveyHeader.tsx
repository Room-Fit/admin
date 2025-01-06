interface SurveyMetaData {
  title: string;
  description: string;
}

interface SurveyHeaderProps {
  metadata: SurveyMetaData;
  onMetadataChange: (metadata: SurveyMetaData) => void;
}

const SurveyHeader = ({ metadata, onMetadataChange }: SurveyHeaderProps) => {
  return (
    <div className="p-6 mb-4 bg-white rounded-lg shadow">
      <input
        type="text"
        value={metadata.title}
        onChange={(e) =>
          onMetadataChange({ ...metadata, title: e.target.value })
        }
        className="w-full px-3 py-2 mb-4 text-2xl font-bold border-b border-transparent hover:border-gray-200 focus:border-blue-500 focus:outline-none"
        placeholder="설문 제목을 입력하세요"
      />
      <textarea
        value={metadata.description}
        onChange={(e) =>
          onMetadataChange({ ...metadata, description: e.target.value })
        }
        className="w-full px-3 py-2 text-gray-600 border-b border-transparent resize-none hover:border-gray-200 focus:border-blue-500 focus:outline-none"
        placeholder="설문에 대한 설명을 입력하세요"
        rows={2}
      />
    </div>
  );
};

export default SurveyHeader;
