"use client";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useBecomeAHostContext } from "../../utils/contexts/BecomeAHostContext";
import { NumberCardItemType } from "@/app/utils/interfaces";
import { UnitSpecsQuestions } from "@/app/utils/helpers";

interface Params {
  item: NumberCardItemType;
}

export default function FormNumberCard({ item }: Params) {
  const [number, setNumber] = useState(item.min);
  const { formField, setFormField } = useBecomeAHostContext();

  useEffect(() => {
    switch (item.question) {
      case UnitSpecsQuestions[0].question:
        setFormField((prev) => {
          return {
            ...prev,
            unit_size: number.toString(),
          };
        });
        break;
      case UnitSpecsQuestions[1].question:
        setFormField((prev) => {
          return {
            ...prev,
            unit_floor: number.toString(),
          };
        });
        break;
      case UnitSpecsQuestions[2].question:
        setFormField((prev) => {
          return {
            ...prev,
            no_of_bedrooms: number.toString(),
          };
        });
        break;
      case UnitSpecsQuestions[3].question:
        setFormField((prev) => {
          return {
            ...prev,
            no_of_bathrooms: number.toString(),
          };
        });
        break;
    }
  }, [number]);

  const incrementNumber = () => {
    setNumber(number + 1);
  };

  const decrementNumber = () => {
    if (number > item.min) {
      setNumber(number - 1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setNumber(value);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <h3>
        {item.question == UnitSpecsQuestions[0].question
          ? item.question + ` (sqft)`
          : item.question}
      </h3>
      <div className="flex space-x-5 items-center">
        <button
          className={`h-8 w-8 rounded-full border flex items-center justify-center ${
            number == item.min
              ? "border-black/15 text-black/15"
              : "border-black/60 text-black/60"
          }`}
          onClick={decrementNumber}
          disabled={number == item.min}
        >
          <Minus className="h-5 w-4" />
        </button>
        <input
          type="number"
          value={number}
          onChange={handleChange}
          className="w-8 text-center outline-none flex justify-center bg-transparent"
          min={item.min}
        />
        <button
          className="h-8 w-8 rounded-full border border-black/60 flex items-center justify-center"
          onClick={incrementNumber}
        >
          <Plus className="h-4 w-4 text-black/60" />
        </button>
      </div>
    </div>
  );
}
