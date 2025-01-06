import { useState } from "react";

const SingleRange = () => {
  const [value, setValue] = useState(0);

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };
  return (
    <div className="space-y-2">
      <input
        type="range"
        min={0}
        max={24}
        step={1}
        value={value}
        onChange={handleValue}
        className="w-full"
        disabled
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>{0}</span>
        <span>{value}</span>
        <span>{24}</span>
      </div>
    </div>
  );
};

export default SingleRange;
