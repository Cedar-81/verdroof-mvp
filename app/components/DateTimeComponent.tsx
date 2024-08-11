"use client";
import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DateTimeComponent() {
  const [value, onChange] = useState<Value>(new Date());

  useEffect(() => {
    // Cedar pick this value and set it to your payload for the checkout call, that's if you work on this section yourself.
  }, [value]);
  return (
    <div
      className="w-[30rem] min-h-[40vh] space-y-3 shadow-lg absolute bg-white right-1 p-5 rounded-lg top-[2rem] z-[1]"
      onClick={(e) => e.stopPropagation()}
    >
      <DateTimePicker onChange={onChange} value={value} />
    </div>
  );
}
