"use client";
import { ChevronRight, Copy, Plus, X } from "lucide-react";
import Link from "next/link";
import ListingsDuplicate from "./ListingsDuplicate";
import { useEffect } from "react";
import { useBecomeAHostContext } from "../utils/contexts/BecomeAHostContext";
import { useGeneralContext } from "../utils/contexts/GeneralContext";

export default function BecomeAHost() {
  const { showDuplicatePopup, setShowDuplicatePopup } = useBecomeAHostContext();
  const { userData } = useGeneralContext();
  useEffect(() => {
    localStorage.removeItem("local_current_listing");
  }, []);
  return (
    <div className="w-full h-max my-auto px-8 md:px-[20%] xl:px-[30%]">
      <div className="space-y-14 mx-auto relative pt-[5rem]">
        <h1 className="text-4xl font-medium">
          Welcome, <span className="capitalize">{userData.firstname}</span>
        </h1>

        {/* <div>
          <h2 className="text-xl font-medium">Finish your listing</h2>
        </div> */}
        <div className="space-y-8">
          <h2 className="text-xl font-medium">Start a new listing</h2>
          <div className="space-y-4">
            <Link href="/become-a-host/overview">
              <div className="flex p-4 cursor-pointer justify-between items-center">
                <div className="flex cursor-pointer space-x-4 items-center">
                  <Plus className="h-6 w-6" />{" "}
                  <p className="text-lg font-light">Create a new listing</p>
                </div>
                <ChevronRight className="h-4 w-6" />
              </div>
            </Link>

            <hr />

            <button
              onClick={() => setShowDuplicatePopup(true)}
              className="flex p-4 cursor-pointer justify-between w-full items-center"
            >
              <div className="flex cursor-pointer space-x-4 items-center">
                <Copy className="h-6 w-6" />
                <p className="text-lg font-light">
                  Duplicate an existing listing
                </p>
              </div>
              <ChevronRight className="h-4 w-6" />
            </button>
          </div>
        </div>
      </div>

      {showDuplicatePopup && (
        <div className="w-[100vw] h-[100vh] fixed top-0 right-0 flex items-center justify-center bg-black/70  z-40">
          <div className="w-[30rem] h-[70%] space-y-8 overflow-y-auto bg-white rounded-lg p-10 relative">
            <div className="flex justify-between items-center">
              <h3 className="text-lg md:text-2xl font-medium">
                Select listing to duplicate
              </h3>

              <button
                onClick={() => setShowDuplicatePopup(false)}
                className="hover_btn"
              >
                <X className="h-6 w-6 cursor-pointer font-medium" />
              </button>
            </div>

            <ListingsDuplicate />
          </div>
        </div>
      )}
    </div>
  );
}
