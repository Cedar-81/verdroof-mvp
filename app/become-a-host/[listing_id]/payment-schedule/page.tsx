"use client";
import { Calendar, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import FormIconCard from "../FormIconCard";
import Footer from "../../Footer";
import { useBecomeAHostContext } from "../../../utils/contexts/BecomeAHostContext";

const schedule = [
  { type: "Monthly Payment", icon: CalendarDays },
  { type: "Yearly Payment", icon: Calendar },
];

export default function PaymentSchedule() {
  const { formField, setFormField } = useBecomeAHostContext();
  const [selectedScheduleType, setSelectedScheduleType] = useState(
    formField.payment_schedule
  );

  useEffect(() => {
    setFormField((prev) => {
      return {
        ...prev,
        payment_schedule: selectedScheduleType,
      };
    });
  }, [selectedScheduleType]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedScheduleType(event.target.value);
  };
  return (
    <div className="w-full h-max my-auto px-8 md:px-[20%] xl:px-[30%]">
      <div className="space-y-10 mx-auto relative">
        <h1 className="text-2xl md:text-3xl font-medium">
          What payment schedule do you prefer?
        </h1>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 ">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center border hover:shadow-md cursor-pointer rounded-lg ${
                selectedScheduleType === item.type
                  ? "border-black/70 bg-gray-100"
                  : "border-black/10"
              }`}
              onClick={() => setSelectedScheduleType(item.type)}
            >
              <input
                type="radio"
                value={item.type}
                checked={selectedScheduleType === item.type}
                onChange={handleRadioChange}
                className="hidden"
              />
              <FormIconCard key={idx} item={item} />
            </div>
          ))}
        </div>
      </div>
      <Footer
        showNext={formField.payment_schedule.trim() != ""}
        showPrev={true}
        nextLink="/rent"
        prevLink="/step-three"
      />
    </div>
  );
}
