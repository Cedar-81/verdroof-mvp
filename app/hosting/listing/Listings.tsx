"use client";
import { useUserListings } from "@/app/utils/hooks/useUserListings";
import { Listing } from "@/app/utils/interfaces";
import { Delete, Search, X } from "lucide-react";
import { useState } from "react";
import HostListingCard from "./HostListingCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDeleteListing } from "@/app/utils/hooks/useDeleteListing";
import { toast } from "react-toastify";
import useImageDelete from "@/app/utils/hooks/useDeleteImage";

export default function Listings() {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentListing, setCurrentListing] = useState<Listing | null>(null);
  const { data, refetch } = useUserListings();
  const { mutate: delListing } = useDeleteListing();
  const { deleteImages, loading, error: deleteErr } = useImageDelete();

  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      // Collect image URLs to be deleted
      const img_urls: string[] = [];
      const cover_url = currentListing?.cover_image;

      if (cover_url) {
        img_urls.push(cover_url);
      }

      if (currentListing?.other_images) {
        currentListing.other_images.forEach((image_url) => {
          if (image_url) {
            img_urls.push(image_url);
          }
        });
      }

      // Attempt to delete images from storage
      if (img_urls.length > 0) {
        await deleteImages(img_urls);

        if (deleteErr) {
          console.error("Error deleting images from storage:");
          toast.error("Error deleting images");
          return;
        }

        // If images deleted successfully, delete the listing
        delListing(id, {
          onSuccess: () => {
            toast.success("Listing deleted successfully");
            refetch(); // Ensure the data is refetched after deletion
          },
          onError: (error: any) => {
            console.error("Error deleting listing:", error.message);
            toast.error(error.message);
          },
        });

        return;
      }

      // If no images to delete, just delete the listing
      delListing(id, {
        onSuccess: () => {
          toast.success("Listing deleted successfully");
          refetch(); // Ensure the data is refetched after deletion
        },
        onError: (error: any) => {
          console.error("Error deleting listing:", error.message);
          toast.error(error.message);
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred");
    }
  };

  return (
    <div className="pb-8 md:px-10">
      {data && data.data.length > 0 && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5">
          {(data.data as Listing[]).map((listing, idx) => (
            <div
              key={idx}
              onClick={() => {
                setShowEditPopup(true);
                setCurrentListing(listing);
              }}
            >
              <HostListingCard data={listing} />
            </div>
          ))}
        </div>
      )}
      {data && data.data.length === 0 && (
        <div className="w-full text-center space-y-3 mt-20">
          <div className="h-16 w-16 rounded-full border-2 mx-auto border-brand_accent flex items-center justify-center">
            <Search className="h-8 w-8 text-brand_accent mx-auto stroke-2" />
          </div>
          <p className="font-bold text-2xl text-black/30">
            You don&apos;t have any listings currently
          </p>
        </div>
      )}

      {showEditPopup && currentListing && (
        <div className="w-[100vw] fixed top-0 right-0 h-[100vh] flex items-center justify-center shadow-lg bg-black/80 z-40">
          <div className="min-h-[25rem] w-[25rem] bg-white rounded-lg relative p-8 px-4">
            <X
              onClick={() => setShowEditPopup(false)}
              className="h-5 w-5 absolute cursor-pointer"
            />
            <div className="space-y-8 flex flex-col justify-between min-h-[20rem]">
              <div className="space-y-4">
                <div className="min-h-[8rem] mt-8 w-[8rem] bg-gray-100 overflow-clip relative rounded-lg mx-auto">
                  <Image
                    src={
                      currentListing.cover_image.trim() !== ""
                        ? currentListing.cover_image
                        : "/images/placeholder.jpeg"
                    }
                    alt="listing"
                    fill={true}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-center">{currentListing.unit_type}</h1>
                  <h2 className="text-center text-sm">
                    {currentListing.location}
                  </h2>
                </div>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "local_current_listing",
                      JSON.stringify(currentListing)
                    );
                    currentListing.current_link &&
                      router.push(currentListing.current_link);
                  }}
                  className="btn !w-full"
                >
                  Edit listing
                </button>
                <button
                  onClick={() => {
                    handleDelete(currentListing.id);
                    setShowEditPopup(false);
                  }}
                  className="hover_btn !rounded-lg hover:text-red-400 !w-full justify-center flex items-center"
                >
                  <Delete className="h-4 w-4 mr-2" /> Delete listing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
