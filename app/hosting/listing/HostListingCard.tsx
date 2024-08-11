import { formatDateTime } from "@/app/utils/helpers";
import { Listing } from "@/app/utils/interfaces";
import Image from "next/image";

interface Params {
  data: Listing;
}

export default function HostListingCard({ data }: Params) {
  return (
    <div className="text-black cursor-pointer space-y-4 relative">
      <p
        className={`bg-white px-4 py-2 absolute rounded-full z-10 text-sm font-semibold text-black/70 left-4 top-4 ${
          data.published == 1 && "border border-brand_secondary"
        }`}
      >
        {data.published == 0 ? "In Progress" : "Published"}
      </p>
      <div className="relative h-[24rem] w-full rounded-lg overflow-clip">
        <Image
          src={
            data && data?.cover_image.trim() != ""
              ? data.cover_image
              : "/images/placeholder.jpeg"
          }
          alt="listing"
          fill={true}
          className="absolute h-full w-full object-cover"
          // placeholder="blur"
        />
      </div>
      <h1 className="text-lg px-2">
        {data.unit_type.trim() !== ""
          ? data.unit_type
          : `Last updated at ${formatDateTime(data.updated_at)}`}
      </h1>
    </div>
  );
}
