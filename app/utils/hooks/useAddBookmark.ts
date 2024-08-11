import { get_cookie } from "@/app/actions/get_cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const fetchAddBookmark = async (id: string) => {
  const token = await get_cookie();
  if (token) {
    const response = await fetch("https://admin.verdroof.com/api/bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.trim()}`,
      },
      body: JSON.stringify({ property_id: id }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } else {
    throw new Error("Couldn't retrieve token");
  }
};

export const useAddBookmark = () => {
  return useMutation({
    mutationFn: fetchAddBookmark,
    onSuccess: () => {
      toast.success("Listing bookmarked");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
