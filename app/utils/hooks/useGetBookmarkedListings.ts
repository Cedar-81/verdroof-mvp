import { get_cookie } from "@/app/actions/get_cookie";
import { useQuery } from "@tanstack/react-query";

const fetchBookmarks = async () => {
  const token = await get_cookie();
  if (token) {
    const response = await fetch("https://admin.verdroof.com/api/bookmarks", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.trim()}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } else {
    throw new Error("Couldn't retriev token");
  }
};

export const useGetBookmarkedListings = () => {
  return useQuery({ queryKey: ["bookmarks"], queryFn: fetchBookmarks });
};
