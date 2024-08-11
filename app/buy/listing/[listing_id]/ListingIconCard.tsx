import { IconCardItemType } from "@/app/utils/interfaces";
import { LucideProps } from "lucide-react";

interface Params {
  item: IconCardItemType;
}

export default function ListingIconCard({ item }: Params) {
  return (
    <div className="flex items-center space-x-8 p-4 h-full w-[15rem]">
      <item.icon className="h-8 w-8" />
      <h3 className="font-medium">{item.type}</h3>
    </div>
  );
}
