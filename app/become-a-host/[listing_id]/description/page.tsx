"use client";
import { useEffect, useState } from "react";
import Footer from "../../Footer";
import FormInputField from "../FormInputField";
import { useBecomeAHostContext } from "../../../utils/contexts/BecomeAHostContext";

export default function Description() {
  const { formField, setFormField } = useBecomeAHostContext();
  const [inputValue, setInputValue] = useState<string>("");
  const [showNext, setShowNext] = useState<boolean>(false);

  useEffect(() => {
    setFormField((prev) => {
      return {
        ...prev,
        description: inputValue,
      };
    });
  }, [inputValue, setFormField]);

  useEffect(() => {
    if (inputValue.trim() == "") {
      setInputValue(formField.description);
      setShowNext(formField.description.length > 200);
    }
  }, [formField.description]);

  return (
    <div className="w-full h-max my-auto px-8 md:px-[20%] xl:px-[30%]">
      <div className="space-y-10 mx-auto relative">
        <h1 className="text-2xl md:text-3xl font-medium">
          Give a little description about your place
        </h1>

        <FormInputField
          placeholder=""
          inputValue={inputValue}
          setInputValue={setInputValue}
          setShowNext={setShowNext}
          minLength={200}
          maxLength={400}
          type="string"
        />
      </div>
      <Footer
        showNext={formField.description.trim() !== "" && showNext}
        showPrev={true}
        nextLink="/house-rules"
        prevLink="/listing-photos"
      />
    </div>
  );
}
