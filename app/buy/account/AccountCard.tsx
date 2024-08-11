import { AccountCards } from "@/app/utils/interfaces";

interface Params {
  details: AccountCards;
}

export default function AccountCard({ details }: Params) {
  return (
    <div className="rounded-lg p-5 cursor-pointer shadow-lg h-full space-y-5 outline outline-black/5">
      <details.icon className="h-8 w-8 text-black/80" />
      <div className="space-y-2">
        <h2 className="font-bold">{details.title}</h2>
        <p className="text-sm text-black/70">{details.info}</p>
      </div>
    </div>
  );
}
