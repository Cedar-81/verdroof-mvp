import { IconCardItemType } from "@/app/utils/interfaces";
import { LucideProps } from "lucide-react";

interface Params {
  item: IconCardItemType;
}

export default function FormIconCard({ item }: Params) {
  return (
    <div className="flex items-center md:items-start space-x-8 md:space-x-0 md:flex-col md:space-y-4 p-4 h-full w-[15rem]">
      <item.icon className="h-8 w-8" />
      <h3 className="font-medium">{item.type}</h3>
    </div>
  );
}
