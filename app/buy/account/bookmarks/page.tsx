"use client";
import { Search } from "lucide-react";
import AccountHeader from "../AccountHeader";
import { useGetBookmarkedListings } from "@/app/utils/hooks/useGetBookmarkedListings";
import { Listing } from "@/app/utils/interfaces";
import Link from "next/link";
import ListingCard from "../../listing/ListingCard";

export default function Bookmarks() {
  const { data } = useGetBookmarkedListings();

  return (
    <div className="font-dmsans h-[100vh] bg-white text-black px-10 md:px-[5rem]">
      <AccountHeader section="Bookmarked Listings" />
      <section className="space-y-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-5">
          {data &&
            data.data &&
            data.data.length > 0 &&
            (data.data as Listing[]).map((listing, idx) => {
              return (
                <Link
                  key={idx}
                  className="flex items-center justify-center"
                  href={`/buy/listing/${listing.id}`}
                >
                  <ListingCard data={listing} />
                </Link>
              );
            })}
        </div>
        {/* <h2 className="text-lg font-bold text-black/70">Listings</h2> */}
        {data && (!data.data || (data.data && data.data.length == 0)) && (
          <div className="w-full text-center space-y-3 mt-20">
            <div className="h-16 w-16 rounded-full border-2 mx-auto border-brand_accent flex items-center justify-center">
              <Search className="h-8 w-8 text-brand_accent mx-auto stroke-2" />
            </div>
            <p className="font-bold text-2xl text-black/30">
              No listings found
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
