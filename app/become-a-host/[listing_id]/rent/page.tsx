"use client";
import { useEffect, useState } from "react";
import FormInputField from "../FormInputField";
import { useBecomeAHostContext } from "../../../utils/contexts/BecomeAHostContext";
import Footer from "../../Footer";

export default function Rent() {
  const { formField, setFormField } = useBecomeAHostContext();
  const [inputValue, setInputValue] = useState<string>(formField.rent);

  useEffect(() => {
    setFormField((prev) => {
      return {
        ...prev,
        rent: inputValue,
      };
    });
  }, [inputValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    // Remove non-numeric characters
    newValue = newValue.replace(/\D/g, "");
    // Add commas every three digits from the right
    newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setInputValue(`N${newValue}`);
  };
  return (
    <div className="mx-auto h-full px-8 md:px-[20%] xl:px-[30%]">
      <div className="space-y-10 mx-auto relative top-[50%] -translate-y-[70%] xl:-translate-y-[80%] ">
        <h1 className="text-xl md:text-3xl text-black/70 font-medium w-full">
          Now, set your rent
        </h1>

        <div className="w-full flex justify-center">
          <div className="flex items-center">
            {/* <p className="text-8xl">N</p> */}
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="$40,000"
              className="outline-none bg-transparent w-min text-center max-w-full text-4xl md:text-8xl border-none"
            />
          </div>
        </div>
      </div>
      <Footer
        showNext={
          formField.rent.trim() != "" &&
          formField.rent.trim() != "N" &&
          formField.rent.trim() != "N0" &&
          formField.rent.trim() != "0"
        }
        showPrev={true}
        nextLink="/additional-bills"
        prevLink="/payment-schedule"
      />
    </div>
  );
}
