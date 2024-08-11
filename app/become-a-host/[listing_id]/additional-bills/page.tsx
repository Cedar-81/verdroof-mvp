"use client";
import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import { useBecomeAHostContext } from "../../../utils/contexts/BecomeAHostContext";

const bills = [
  { type: "Utility deposit", placeholder: "N50,000" },
  { type: "Security deposit", placeholder: "N50,000" },
];

export default function AdditionalBills() {
  const { formField, setFormField } = useBecomeAHostContext();
  const [billValues, setBillValues] = useState<{ [key: string]: string }>({
    "Utility deposit": formField.utility_deposit,
    "Security deposit": formField.security_deposit,
  });

  useEffect(() => {
    setFormField((prev) => {
      return {
        ...prev,
        utility_deposit: billValues["Utility deposit"],
        security_deposit: billValues["Security deposit"],
      };
    });
  }, [billValues]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    billType: string
  ) => {
    let newValue = event.target.value;
    // Remove non-numeric characters
    newValue = newValue.replace(/\D/g, "");
    // Add commas every three digits from the right
    newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedValue = newValue ? `N${newValue}` : "";

    setBillValues((prevValues) => ({
      ...prevValues,
      [billType]: formattedValue,
    }));
  };

  return (
    <div className="w-full h-max my-auto px-8 md:px-[20%] xl:px-[30%]">
      <div className="space-y-10 mx-auto relative ">
        <div>
          <h1 className="text-2xl md:text-3xl font-medium">
            Enter additional bills
          </h1>
          <p className="font-medium text-black/70">
            Fill fields that apply only
          </p>
        </div>

        <div className="space-y-10">
          {bills.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-lg">{item.type}</h4>
              <input
                placeholder={item.placeholder}
                value={billValues[item.type]}
                onChange={(e) => handleChange(e, item.type)}
                className="border-b h-[5rem] w-full bg-transparent focus:border-b-black/70 text-xl p-6 border-b-black/30 outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <Footer
        showNext={true}
        showPrev={true}
        nextLink="/publish"
        prevLink="/rent"
      />
    </div>
  );
}
