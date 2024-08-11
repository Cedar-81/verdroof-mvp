"use client";
import { get_cookie } from "@/app/actions/get_cookie";
import { useGeneralContext } from "@/app/utils/contexts/GeneralContext";
import { amenityOptions, houseRules } from "@/app/utils/helpers";
import { useAddBookmark } from "@/app/utils/hooks/useAddBookmark";
import useOutOfView from "@/app/utils/hooks/useOutOfView";
import { useRemoveBookmark } from "@/app/utils/hooks/useRemoveBookmark";
import { useSingleListing } from "@/app/utils/hooks/useSingleListing";
import { ListingForm } from "@/app/utils/interfaces";
import {
  BedSingle,
  Blinds,
  Bookmark,
  Info,
  Leaf,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ListingIconCard from "./ListingIconCard";

export default function Listing() {
  const { listing_id } = useParams<{ listing_id: string }>();
  const { mutate: addBookmark } = useAddBookmark();
  const { mutate: removeBookmark } = useRemoveBookmark();
  const { data, isError, error } = useSingleListing(listing_id);
  const { setShowLogin } = useGeneralContext();
  const [isOutOfView, observerRef] = useOutOfView();

  const [isBookmarked, setIsBookmarked] = useState(false);

  let new_data: ListingForm = data && data.data;

  isError && toast.error(error.message);

  const router = useRouter();

  // useEffect(() => {
  //   // Check if the listing is bookmarked
  //   // Assuming `data.isBookmarked` tells whether the listing is bookmarked
  //   if (new_data) {
  //     setIsBookmarked(new_data.isBookmarked);
  //   }
  // }, [new_data]);

  const handleRent = async () => {
    const token = await get_cookie();
    if (token && token.trim() != "") {
      router.push(`/buy/listing/${listing_id}/checkout`);
      return;
    }

    toast.info("Login to continue to checkout");
    setShowLogin(true);
  };

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      removeBookmark(listing_id, {
        onSuccess: () => {
          toast.success("Listing bookmark removed");
          setIsBookmarked(false);
        },
        onError: (error: any) => {
          toast.error(error.message);
        },
      });
    } else {
      addBookmark(listing_id, {
        onSuccess: () => {
          toast.success("Listing bookmarked");
          setIsBookmarked(true);
        },
        onError: (error: any) => {
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <>
      {new_data && (
        <div className="h-[100vh] font-dmsans bg-white text-black md:px-[5rem]">
          <h1 className="text-lg font-semibold py-6 px-4 md:px-0">
            <span className="font-bold">Landmark: </span>
            {new_data.location.split(",")[1] || "N/A"}
          </h1>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="h-[40vh] w-full bg-gray-300 md:rounded-lg overflow-clip relative">
              <Image
                fill={true}
                alt={"Listing"}
                src={new_data.cover_image}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 w-full md:w-[40%] gap-2">
              <div className="w-full h-[calc(20vh-0.5rem)] rounded-lg overflow-clip bg-gray-300 relative">
                <Image
                  fill={true}
                  alt={"Listing"}
                  src={new_data.other_images[0]}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-full h-[calc(20vh-0.5rem)] rounded-lg overflow-clip bg-gray-300 relative">
                <Image
                  fill={true}
                  alt={"Listing"}
                  src={new_data.other_images[1]}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-full h-[calc(20vh-0.5rem)] rounded-lg overflow-clip bg-gray-300 relative">
                <Image
                  fill={true}
                  alt={"Listing"}
                  src={new_data.other_images[2]}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-full h-[calc(20vh-0.5rem)] rounded-lg overflow-clip bg-gray-300 relative">
                <Image
                  fill={true}
                  alt={"Listing"}
                  src={new_data.other_images[3]}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:justify-between md:flex-row md:space-x-20 space-y-10 md:space-y-0 py-14 px-8 md:px-0">
            <div className="space-y-12 w-full">
              <section className="flex flex-col md:flex-row md:justify-between md:items-center space-y-8 md:space-y-0">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="font-bold text-xs md:text-sm text-black/60">
                      <span className=" p-1 rounded text-brand_accent bg-brand_accent/25">
                        Type:
                      </span>{" "}
                      {new_data.apartment_type}
                    </p>
                    <h2 className="font-bold text-3xl pt-2">
                      &#8358;
                      {`${new_data.rent.trim().slice(1)}${
                        new_data.payment_schedule.trim().toLocaleLowerCase() ==
                        "yearly payment"
                          ? "/yr"
                          : "/mo"
                      }`}
                    </h2>
                    <p className="font-semibold text-sm md:text-base text-black/70">
                      <span className="font-bold">Landmark: </span>
                      {new_data.location.split(",")[1] || "N/A"}
                    </p>
                  </div>
                  <div className="flex text-sm text-black/60 space-x-4">
                    <div className="flex space-x-2 items-center text-xs md:text-base">
                      <UsersRound className="h-3 md:h-4" />
                      <p>3</p>
                    </div>
                    <p className="div">|</p>
                    <div className="flex space-x-2 items-center text-xs md:text-base">
                      <BedSingle className="h-3 md:h-4" />
                      <p>{new_data.no_of_bedrooms}</p>
                    </div>
                    <p className="div">|</p>
                    <div className="flex space-x-2 items-center text-xs md:text-base">
                      <Leaf className="h-3 md:h-4" />
                      <p>3kv</p>
                    </div>
                  </div>
                </div>
                <div
                  ref={observerRef}
                  className="flex items-center space-x-3 relative z-20"
                >
                  <button
                    onClick={handleBookmarkToggle}
                    className={`rounded-full border border-brand_primary h-10 w-10 flex items-center justify-center ${
                      isBookmarked ? "text-brand-accent" : "text-brand_primary"
                    }`}
                  >
                    <Bookmark className="h-4" />
                  </button>
                  <button onClick={handleRent} className="btn">
                    Rent
                  </button>
                </div>
              </section>
              <section className="space-y-2 md:space-y-3">
                <h3 className="text-lg md:text-xl flex items-center py-2 bg font-semibold">
                  <Blinds className="h-4 md:h-5 mr-2 md:mr-4" /> About this
                  listing
                </h3>
                <p className="text-base">{new_data.description}</p>
              </section>
              <section className="space-y-4 md:space-y-3 font-semibold">
                <h4 className="text-lg">Amenities</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {new_data.basic_amenities.map((item, index) => {
                    let amenity = amenityOptions.basicAmenities.find(
                      (amenity) => amenity.type == item.trim()
                    );
                    if (amenity) {
                      return (
                        <div key={index} className="border rounded-lg">
                          <ListingIconCard item={amenity} />
                        </div>
                      );
                    }
                  })}
                  {new_data.building_amenities.map((item, index) => {
                    let amenity = amenityOptions.buildingAmenities.find(
                      (amenity) => amenity.type == item.trim()
                    );
                    if (amenity) {
                      return (
                        <div key={index} className="border rounded-lg">
                          <ListingIconCard item={amenity} />
                        </div>
                      );
                    }
                  })}
                  {new_data.safety_amenities.map((item, index) => {
                    let amenity = amenityOptions.safetyAmenities.find(
                      (amenity) => amenity.type == item.trim()
                    );
                    if (amenity) {
                      return (
                        <div key={index} className="border rounded-lg">
                          <ListingIconCard item={amenity} />
                        </div>
                      );
                    }
                  })}
                </div>
              </section>
              <section className="space-y-4 md:space-y-3 font-semibold">
                <h4 className="text-lg">House Rules</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {new_data.house_rules.map((item, index) => {
                    let rule = houseRules.find(
                      (rule) => rule.type == item.trim()
                    );
                    if (rule) {
                      return (
                        <div key={index} className="border rounded-lg">
                          <ListingIconCard item={rule} />
                        </div>
                      );
                    }
                  })}
                </div>
              </section>
            </div>

            <div className="maps h-max w-full md:max-w-[30rem] rounded-lg col-span-1">
              <div className="md:sticky max-h-min md:t op-[8rem] w-full border  border-black/30 rounded-lg p-5 space-y-6">
                <div className="flex min-[4rem] max-h-max space-x-3 overflow-clip">
                  <div
                    className={
                      "min-h-full min-w-[8rem] rounded-lg relative inline-block overflow-hidden m-0"
                    }
                  >
                    <Image
                      fill={true}
                      alt="building"
                      src={new_data.cover_image}
                      className="h-full w-full object-cover absolute"
                    />
                  </div>

                  <div className="space-y-3 py-2">
                    <div className="space-y-2">
                      <h1 className="font-bold text-lg">
                        &#8358;
                        {`${new_data.rent.trim().slice(1)}${
                          new_data.payment_schedule
                            .trim()
                            .toLocaleLowerCase() == "yearly payment"
                            ? "/yr"
                            : "/mo"
                        }`}
                      </h1>
                      <p className="truncate w-[60%] font-bold text-black/70 text-sm">
                        {new_data.location.split(",")[1] || "N/A"}
                      </p>
                    </div>
                    <div className="flex text-sm text-black/60 space-x-4">
                      <div className="flex space-x-2 items-center">
                        <UsersRound className="h-4" />
                        <p>3</p>
                      </div>
                      <p className="div">|</p>
                      <div className="flex space-x-2 items-center">
                        <BedSingle className="h-4" />
                        <p>{new_data.no_of_bedrooms}</p>
                      </div>
                      <p className="div">|</p>
                      <div className="flex space-x-2 items-center">
                        <UsersRound className="h-4" />
                        <p>3</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="space-y-5">
                  <h2 className="text-xl font-semibold">Price details</h2>
                  <ul className="w-full text-sm space-y-3 font-light">
                    <li className="flex justify-between">
                      <div className="flex space-x-2 items-center">
                        <Info className="h-3 w-3 cursor-pointer" />{" "}
                        <p>
                          Rent{" "}
                          {new_data.payment_schedule
                            .trim()
                            .toLocaleLowerCase() == "yearly payment"
                            ? "per year"
                            : "per month"}
                        </p>
                      </div>
                      <p>
                        &#8358;
                        {`${new_data.rent.trim().slice(1)}${
                          new_data.payment_schedule
                            .trim()
                            .toLocaleLowerCase() == "yearly payment"
                            ? "/yr"
                            : "/mo"
                        }`}
                      </p>
                    </li>
                    <li className="flex justify-between">
                      <div className="flex space-x-2 items-center">
                        <Info className="h-3 w-3 cursor-pointer" />{" "}
                        <p>Security bill</p>
                      </div>
                      <p>
                        &#8358;
                        {`${new_data.security_deposit.trim().slice(1)}` ||
                          " N/A"}
                      </p>
                    </li>
                    <li className="flex justify-between">
                      <div className="flex space-x-2 items-center">
                        <Info className="h-3 w-3 cursor-pointer" />{" "}
                        <p>Utility bill</p>
                      </div>
                      <p>
                        &#8358;
                        {`${new_data.utility_deposit.trim().slice(1)}` ||
                          " N/A"}
                      </p>
                    </li>
                    <li className="flex justify-between">
                      <div className="flex space-x-2 items-center">
                        <Info className="h-3 w-3 cursor-pointer" />{" "}
                        <p>Enviromental fee</p>
                      </div>
                      <p>&#8358;200.00</p>
                    </li>
                    <li className="flex justify-between">
                      <div className="flex space-x-2 items-center">
                        <Info className="h-3 w-3 cursor-pointer" />{" "}
                        <p>Verdrooof service fee</p>
                      </div>
                      <p>&#8358;5000.00</p>
                    </li>
                    <li className="flex justify-between">
                      <div className="flex space-x-2 items-center">
                        <Info className="h-3 w-3 cursor-pointer" />{" "}
                        <p>Verdroof special offer</p>
                      </div>
                      <p>save 20%</p>
                    </li>
                  </ul>
                </div>

                <hr />

                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold"></h2>
                  <button onClick={handleRent} className="btn">
                    Rent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
