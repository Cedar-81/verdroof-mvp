import { get_cookie } from "@/app/actions/get_cookie";
import { useQuery } from "@tanstack/react-query";

const fetchProfile = async () => {
  const token = await get_cookie();
  if (token && token.trim() != "") {
    const response = await fetch(
      "https://admin.verdroof.com/api/user/profile",
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
    throw new Error("Token not available");
  }
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: [`user`],
    queryFn: () => fetchProfile(),
  });
};
