"use client";
import { Dispatch, SetStateAction, useState } from "react";

interface Params {
  placeholder: string;
  type: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  setShowNext: Dispatch<SetStateAction<boolean>>;
  minLength?: number;
  maxLength?: number;
}

const FormInputField = ({
  placeholder,
  type,
  inputValue,
  setInputValue,
  setShowNext,
  minLength = 0,
  maxLength,
}: Params) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = event.target.value;
    setError(null); // Reset error on input change

    if (type === "number") {
      // Remove non-numeric characters
      newValue = newValue.replace(/\D/g, "");
      // Add commas every three digits from the right
      newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setInputValue(`N${newValue}`);

      if (inputValue.trim().length === 1) {
        setInputValue("");
      }
    } else {
      setInputValue(newValue);
    }

    if (newValue.length < minLength) {
      setShowNext(false);
      setError(`Input must be at least ${minLength} characters long.`);
    } else {
      setShowNext(true);
      setError(null);
    }
  };

  return (
    <div>
      <textarea
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        maxLength={maxLength}
        className="border h-[15rem] rounded-lg w-full bg-transparent focus:border-black/70 text-xl p-6 border-black/30 outline-none"
      />
      <div className="flex flex-col items-end mt-2">
        {error && <p className="text-red-500">{error}</p>}
        <p className={`text-sm font-semibold`}>
          <span
            className={`${
              inputValue.length < minLength ? "text-red-500" : "text-gray-500"
            }`}
          >
            {inputValue.length}
          </span>
          /{maxLength}
        </p>
      </div>
    </div>
  );
};

export default FormInputField;
