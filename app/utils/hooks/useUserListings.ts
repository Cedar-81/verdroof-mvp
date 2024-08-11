import { get_cookie } from "@/app/actions/get_cookie";
import { useQuery } from "@tanstack/react-query";

const fetchUserListings = async () => {
  let token = await get_cookie();

  if (token) {
    const response = await fetch(
      "https://admin.verdroof.com/api/user/properties/all",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } else {
    throw new Error("Couldn't retrieve token");
  }
};

export const useUserListings = () => {
  return useQuery({
    queryKey: ["user_listings"],
    queryFn: fetchUserListings,
  });
};
