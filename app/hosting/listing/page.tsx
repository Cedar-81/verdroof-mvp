import { useUserListings } from "@/app/utils/hooks/useUserListings";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import Listings from "./Listings";

export default function Listing() {
  return (
    <div className="h-[100vh] px-8 md:px-[5rem]">
      <div className="flex justify-between items-center py-10 md:p-10">
        <h1 className="text-2xl md:text-3xl">Your Listings</h1>
        <div className="flex space-x-3">
          <button className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/become-a-host">
            <button className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full">
              <Plus className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>

      <Listings />
    </div>
  );
}
