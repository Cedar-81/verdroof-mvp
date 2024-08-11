"use client";
import { useEffect, useState } from "react";
import { useBecomeAHostContext } from "../../../utils/contexts/BecomeAHostContext";
import Footer from "../../Footer";
import FormNumberCard from "../FormNumberCard";
import { UnitSpecsQuestions } from "@/app/utils/helpers";

export default function AboutThisUnit() {
  const { formField } = useBecomeAHostContext();
  const [showNext, setShowNext] = useState(false);

  // const checkNext = () =>
  //   formField.no_of_bathrooms.trim() != "" &&
  //   formField.no_of_bedrooms.trim() != "" &&
  //   formField.unit_size.trim() != "" &&
  //   formField.unit_floor.trim() != "";

  // useEffect(() => {
  //   setShowNext(checkNext);
  // }, [formField]);

  return (
    <div className="w-full h-max my-auto px-8 md:px-[20%] xl:px-[30%]">
      <div className="space-y-10 mx-auto">
        <h1 className="text-2xl md:text-3xl font-medium">
          What makes up this unit?
        </h1>

        <div className="space-y-8">
          {UnitSpecsQuestions.map((item, idx) => (
            <div key={idx}>
              <FormNumberCard item={item} />
              {idx != UnitSpecsQuestions.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </div>

      <div className="h-[6rem]">
        <Footer
          showNext={true}
          showPrev={true}
          nextLink="/step-two"
          prevLink="/location"
        />
      </div>
    </div>
  );
}
