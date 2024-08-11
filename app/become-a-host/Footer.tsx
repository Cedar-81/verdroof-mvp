"use client";
import { useParams, useRouter } from "next/navigation";
import { useFormSave } from "../utils/hooks/useFormSave";
import { useBecomeAHostContext } from "../utils/contexts/BecomeAHostContext";
import { useSingleListing } from "../utils/hooks/useSingleListing";
import { useEffect } from "react";
import { listingFormSchema } from "../utils/interfaces";

interface Params {
  showPrev: boolean;
  showNext: boolean;
  nextLink: string;
  prevLink: string;
}

export default function Footer({
  showPrev,
  showNext,
  nextLink,
  prevLink,
}: Params) {
  const router = useRouter();
  const { listing_id } = useParams<{ listing_id: string }>();
  const link = `/become-a-host/${listing_id}`;

  const { setFormField } = useBecomeAHostContext();
  const { data, isPending: listingIsPending } = useSingleListing(listing_id);
  const [handleSave, isSaving, isPending] = useFormSave();

  useEffect(() => {
    if (data) {
      setFormField(listingFormSchema.parse(data.data));
    }
  }, [data]);
  return (
    <div className=" w-full fixed bottom-0 right-0 border-2 flex justify-between px-8 md:px-[5rem] items-center bg-white h-[6rem] z-20">
      <button
        disabled={!showPrev || isPending || isSaving}
        onClick={() => {
          handleSave({ exit: false, publish: false });
          !isPending && !isSaving && router.push(link + prevLink);
        }}
        className={`btn !bg-transparent ${
          !showPrev ? "!text-gray-100" : "!text-black"
        } outline-none border-0 underline !text-lg font-medium hover:bg-gray-50`}
      >
        Back
      </button>
      <button
        // disabled={index == listingRoutes.length - 1}
        className="btn"
        disabled={!showNext || isSaving || isPending}
        onClick={() => {
          handleSave({ exit: false, publish: false });
          !isPending && !isSaving && router.push(link + nextLink);
        }}
      >
        Next
      </button>
    </div>
  );
}
