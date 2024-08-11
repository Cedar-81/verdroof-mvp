import { Listing } from "@/app/utils/interfaces";
import { BedSingle, Leaf, UsersRound } from "lucide-react";
import Image from "next/image";

interface Params {
  data: Listing;
}

export default function ListingCard({ data }: Params) {
  return (
    <div className="text-black cursor-pointer hover:shadow-md font-dmsans w-[18.4rem] rounded-lg shadow-sm overflow-clip outline outline-black/5">
      <div className="relative h-[12rem] ">
        <Image
          src={data.cover_image}
          alt="listing"
          fill={true}
          className="absolute h-full w-full object-cover"
          // placeholder="blur"
        />
      </div>
      <div className="space-y-2 px-2 py-3">
        <div>
          <h1 className="font-bold text-lg">
            &#8358;
            {`${data.rent.trim().slice(1)}${
              data.payment_schedule.trim().toLocaleLowerCase() ==
              "yearly payment"
                ? "/yr"
                : "/mo"
            }`}
          </h1>
          <p className="truncate font-semibold text-black/70 text-sm">
            <span className="font-bold">Landmark: </span>
            {data.location.split(",")[1] || "N/A"}
          </p>
        </div>
        <div className="flex text-sm text-black/60 space-x-4">
          <div className="flex space-x-2 items-center">
            <UsersRound className="h-4" />
            <p>2</p>
          </div>
          <p className="div">|</p>
          <div className="flex space-x-2 items-center">
            <BedSingle className="h-4" />
            <p>{data.no_of_bedrooms}</p>
          </div>
          <p className="div">|</p>
          <div className="flex space-x-2 items-center">
            <Leaf className="h-4" />
            <p>3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
