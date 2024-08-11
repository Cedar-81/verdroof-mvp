"use client";
import { BedSingle, UsersRound } from "lucide-react";
import Image from "next/image";
import { useUserListings } from "../utils/hooks/useUserListings";
import { Listing } from "../utils/interfaces";
import { formatDateTime } from "../utils/helpers";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBecomeAHostContext } from "../utils/contexts/BecomeAHostContext";
import { useCreateListing } from "../utils/hooks/useCreateListing";

export default function ListingsDuplicate() {
  const { data } = useUserListings();
  const router = useRouter();
  const { editingId, setFormField } = useBecomeAHostContext();
  const { mutate: createListing, isPending } = useCreateListing();
  const createLisiting = (listing: Listing) => {
    const formFieldData = {
      ...listing,
      current_link: `/become-a-host/overview`,
    };

    createListing({
      formField: formFieldData,
    });
  };

  useEffect(() => {
    if (editingId) {
      router.push(`/become-a-host/${editingId}/step-one`);
    }
  }, [editingId]);
  return (
    <div className="space-y-6">
      {data &&
        data.data.length > 0 &&
        (data.data as Listing[]).map((listing, idx) => (
          <div
            key={idx}
            onClick={() => {
              setFormField(listing);
              createLisiting(listing);
            }}
            className="flex min-h-[6rem] cursor-pointer max-h-max space-x-3 rounded-lg outline outline-black/30 p-3 overflow-clip"
          >
            <div
              className={
                "min-h-full min-w-[8rem] rounded-lg relative inline-block overflow-hidden m-0"
              }
            >
              <Image
                fill={true}
                alt="building"
                src={
                  listing?.cover_image.trim() != ""
                    ? listing.cover_image
                    : "/images/placeholder.jpeg"
                }
                className="h-full w-full object-cover absolute"
              />
            </div>

            <div>
              <h1 className="text-lg">
                {listing.unit_type.trim() !== ""
                  ? listing.unit_type
                  : `Last updated at ${formatDateTime(listing.updated_at)}`}
              </h1>
              <p>{listing.location}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
