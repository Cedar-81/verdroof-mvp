"use client";
import { useEffect, useState } from "react";
import FormIconCard from "../FormIconCard";
import Footer from "../../Footer";
import { useBecomeAHostContext } from "../../../utils/contexts/BecomeAHostContext";
import { houseRules } from "@/app/utils/helpers";

export default function Amenities() {
  const { formField, setFormField } = useBecomeAHostContext();
  const [selectedHouseRules, setSelectedHouseRules] = useState<string[]>(
    formField.house_rules
  );

  useEffect(() => {
    setFormField((prev) => {
      return {
        ...prev,
        house_rules: selectedHouseRules,
      };
    });
  }, [selectedHouseRules]);

  const handleCheckboxChange = (
    item: string,
    selectedHouseRules: string[],
    setSelectedHouseRules: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const index = selectedHouseRules.indexOf(item);
    if (index > -1) {
      //removing item
      const updatedHouseRules = [...selectedHouseRules];
      updatedHouseRules.splice(index, 1);
      setSelectedHouseRules(updatedHouseRules);
    } else {
      //adding item
      setSelectedHouseRules([...selectedHouseRules, item]);
    }
  };

  return (
    <div className="w-full h-max my-auto px-8 md:px-[20%] xl:px-[30%]">
      <div className="space-y-10 mx-auto">
        <h1 className="text-2xl md:text-3xl font-medium">
          What are your house rules?
        </h1>

        {/* Safety Amenities */}
        <div className="space-y-6">
          {/* <h2 className="text-lg font-medium">Safety Amenities</h2> */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {houseRules.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center border hover:shadow-md cursor-pointer rounded-lg ${
                  selectedHouseRules.includes(item.type)
                    ? "border-black/70 bg-gray-100"
                    : "border-black/10"
                }`}
                onClick={() =>
                  handleCheckboxChange(
                    item.type,
                    selectedHouseRules,
                    setSelectedHouseRules
                  )
                }
              >
                <FormIconCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer
        showNext={true}
        showPrev={true}
        nextLink="/step-three"
        prevLink="/description"
      />
    </div>
  );
}
