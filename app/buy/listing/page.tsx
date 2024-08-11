"use client";
import { Search, X } from "lucide-react";
import Image from "next/image";
import ListingCard from "./ListingCard";
import Link from "next/link";
import { useListings } from "@/app/utils/hooks/useListings";
import { Listing } from "@/app/utils/interfaces";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useGeneralContext } from "@/app/utils/contexts/GeneralContext";
import { useSearch } from "@/app/utils/hooks/useSearch";
import { toast } from "react-toastify";

export default function Houses() {
  const { data, error } = useListings();
  const [filteredData, setFilteredData] = useState<Listing[]>([]);
  const [filteredSearchData, setFilteredSearchData] = useState<Listing[]>([]);
  const {
    setSearchParams,
    searchParams,
    shouldSearch,
    setShouldSearch,
  } = useGeneralContext();
  const [showSearch, setShowSearch] = useState(false);
  const {
    data: searchData,
    error: searchError,
    isLoading,
    refetch,
  } = useSearch(shouldSearch);

  const checkSection = useRef(null);

  useEffect(() => {
    if (searchError) {
      setShouldSearch(false);
      toast.error(searchError.message);
    }

    if (searchData) {
      setShouldSearch(false);
      setFilteredSearchData(
        (searchData.data as Listing[]).filter((val) => val.published == 1)
      );
      toast.info("Search not found");
    }
  }, [searchError, searchData, setShouldSearch]);

  useEffect(() => {
    if (data && data.data && data.data.length > 0) {
      setFilteredData(
        (data.data as Listing[]).filter((val) => val.published == 1)
      );
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShouldSearch(true);
    refetch(); // Trigger a new search
  };

  return (
    <div className="font-dmsans bg-white">
      <div className="relative h-[50vh]">
        <div className="h-full z-10 w-full bg-black/50 absolute top-0 right-0"></div>
        <div className="h-full absolute  w-full">
          <Image
            src="/images/city.jpg"
            alt="ariel city view"
            height="3631"
            width="5450"
            className="absolute h-full w-full object-cover"
          />
        </div>
        <div className="relative z-20 space-y-8 top-[50%] -translate-y-[55%]">
          <h1 className="text-white text-center text-4xl md:text-5xl xl:text-7xl mx-auto w-[90%] md:w-[80%]">
            Search and Rent the <br className="hidden md:flex" />
            right property for you
          </h1>
          <form
            onSubmit={handleSubmit}
            onClick={() => checkSection != null && setShowSearch(true)}
            className="flex h-[3.5rem] shadow-lg bg-white text-black items-center pl-3 space-x-0 w-[90%] lg:w-max mx-auto rounded-lg overflow-clip"
          >
            <div className="hidden md:flex">
              <div className="flex flex-col font-medium p-2">
                <label htmlFor="rent" className="text-sm">
                  Rent
                </label>
                <input
                  id="rent"
                  type="number"
                  value={searchParams.rent}
                  placeholder="20,000"
                  onChange={(e) =>
                    setSearchParams((prev) => {
                      return {
                        ...prev,
                        rent: e.target.value.toString(),
                      };
                    })
                  }
                  className="outline-none bg-transparent"
                />
              </div>
              <div className="flex flex-col border-l border-l-black/70 font-medium p-2">
                <label htmlFor="unit" className="text-sm">
                  Unit type
                </label>
                <input
                  id="unit"
                  type="text"
                  placeholder="2 Bedrooms"
                  value={searchParams.unit}
                  onChange={(e) =>
                    setSearchParams((prev) => {
                      return {
                        ...prev,
                        unit: e.target.value,
                      };
                    })
                  }
                  className="outline-none bg-transparent"
                />
              </div>
              <div className="flex flex-col border-l border-l-black/70 font-medium p-2">
                <label htmlFor="location" className="text-sm">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="Abuja"
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams((prev) => {
                      return {
                        ...prev,
                        location: e.target.value,
                      };
                    })
                  }
                  className="outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="w-full flex justify-end h-full md:block">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-brand_primary text-white h-full text-sm md:text-base px-6 font-bold"
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSearch && (
        <section
          ref={checkSection}
          className="fixed md:hidden h-[100vh] w-[100vw] top-0 right-0 flex items-center justify-center bg-black/70 z-40"
        >
          <form
            onSubmit={handleSubmit}
            className="shadow-lg bg-white p-5 text-black items-center w-[90%] space-y-6 mx-auto rounded-lg overflow-clip"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-xl">Search</h1>{" "}
              <button onClick={() => setShowSearch(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col border border-black/70 rounded-lg">
              <div className="flex flex-col p-2">
                <label htmlFor="rent" className="text-sm">
                  Rent
                </label>
                <input
                  id="rent"
                  type="number"
                  value={searchParams.rent}
                  onChange={(e) =>
                    setSearchParams((prev) => {
                      return {
                        ...prev,
                        rent: e.target.value.toString(),
                      };
                    })
                  }
                  className="outline-none bg-transparent"
                />
              </div>
              <div className="flex flex-col border-t border-t-black/70 p-2">
                <label htmlFor="unit" className="text-sm">
                  Unit type
                </label>
                <input
                  id="unit"
                  type="text"
                  value={searchParams.unit}
                  onChange={(e) =>
                    setSearchParams((prev) => {
                      return {
                        ...prev,
                        unit: e.target.value,
                      };
                    })
                  }
                  className="outline-none bg-transparent"
                />
              </div>
              <div className="flex flex-col border-t border-t-black/70 p-2">
                <label htmlFor="location" className="text-sm">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams((prev) => {
                      return {
                        ...prev,
                        location: e.target.value,
                      };
                    })
                  }
                  className="outline-none bg-transparent"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-brand_primary text-white h-full w-full btn text-sm md:text-base px-6 font-bold"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>
        </section>
      )}

      <section className="px-8 md:px-[5rem] text-black p-20 space-y-8">
        <h2 className="lg:text-2xl text-black/70 font-bold">
          {filteredSearchData.length > 0 ? "Searched Listings" : "Listings"}
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-5">
          {filteredSearchData.length > 0
            ? filteredSearchData.map((listing, idx) => (
                <Link
                  key={idx}
                  className="flex items-center justify-center"
                  href={`/buy/listing/${listing.id}`}
                >
                  <ListingCard data={listing} />
                </Link>
              ))
            : filteredData.map((listing, idx) => (
                <Link
                  key={idx}
                  className="flex items-center justify-center"
                  href={`/buy/listing/${listing.id}`}
                >
                  <ListingCard data={listing} />
                </Link>
              ))}
        </div>

        {filteredSearchData.length === 0 && filteredData.length === 0 && (
          <div className="w-full text-center space-y-3 mt-20">
            <div className="h-16 w-16 rounded-full border-2 mx-auto border-brand_accent flex items-center justify-center">
              <Search className="h-8 w-8 text-brand_accent mx-auto stroke-2" />
            </div>
            <p className="font-bold text-2xl text-black/30">
              There are currently no listings available
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
