"use client";
import Image from "next/image";
import Link from "next/link";
import { useBecomeAHostContext } from "../../utils/contexts/BecomeAHostContext";
import { useEffect } from "react";
import { useCreateListing } from "@/app/utils/hooks/useCreateListing";
import { useRouter } from "next/navigation";

export default function Overview() {
  const { setNavContent, formField, editingId } = useBecomeAHostContext();
  const { mutate: createListing, isPending } = useCreateListing();
  const router = useRouter();

  // const token = await get_cookie();
  useEffect(() => {
    setNavContent((prev) => {
      return {
        ...prev,
        button_string: "exit",
      };
    });
  }, []);

  useEffect(() => {
    if (editingId) {
      router.push(`/become-a-host/${editingId}/step-one`);
    }
  }, [editingId]);

  const createLisiting = () => {
    const formFieldData = {
      ...formField,
      cover_image: "",
      other_images: [],
      current_link: "/become-a-host/overview",
    };

    createListing({
      formField: formFieldData,
    });
  };

  return (
    <div className="px-8 md:px-[5rem] h-[calc(100vh-11rem)] overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 md:gap-y-0 md:gap-x-10 min-h-full py-[4rem] xl:py-0 ">
        <h1 className="text-2xl md:text-4xl xl:text-5xl font-medium my-auto ">
          Let&apos;s get you started on Verdroof, it&apos;s quick and easy
        </h1>
        <div className="space-y-10 my-auto">
          <div className="flex gap-x-6 ">
            <p className="text-xl font-medium">1</p>
            <div className="space-y-1">
              <h2 className="text-lg md:text-xl font-medium">
                Tell us about your place
              </h2>
              <p className="text-sm md:text-base text-black/70 font-light">
                Share some basic info, like where it is and how it looks like.
              </p>
            </div>
            <div className="h-[5rem] w-[10rem] relative overflow-clip">
              <Image
                fill={true}
                alt="building"
                src="/images/step1.png"
                className="h-full w-full object-cover absolute"
              />
            </div>
          </div>

          <hr />

          <div className="flex gap-x-6 ">
            <p className="text-xl font-medium">2</p>
            <div className="space-y-1">
              <h2 className="text-lg md:text-xl font-medium">
                Make it stand out
              </h2>
              <p className="text-sm md:text-base text-black/70 font-light">
                Add 5 or more photos plus a title and description—we&apos;ll
                help you out.
              </p>
            </div>
            <div className="h-[5rem] w-[10rem] relative overflow-clip">
              <Image
                fill={true}
                alt="building"
                src="/images/step2.png"
                className="h-full w-full object-cover absolute"
              />
            </div>
          </div>

          <hr />

          <div className="flex gap-x-6 ">
            <p className="text-xl font-medium">3</p>
            <div className="space-y-1">
              <h2 className="text-lg md:text-xl font-medium">
                Finish up and publish
              </h2>
              <p className="text-sm md:text-base text-black/70 font-light">
                Choose if you&apos;d like to start with an experienced guest,
                set a starting price, and publish your listing.
              </p>
            </div>
            <div className="h-[5rem] w-[10rem] relative overflow-clip">
              <Image
                fill={true}
                alt="building"
                src="/images/step3.png"
                className="h-full w-full object-cover absolute"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed w-full bottom-0 border-2 right-0 flex justify-end px-8 md:px-[5rem] items-center bg-white h-[6rem] z-20">
        {/* <Link href="/become-a-host/132432/step-one"> */}
        <button onClick={createLisiting} className="btn">
          {isPending ? "Wait a sec..." : "Get started"}
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
