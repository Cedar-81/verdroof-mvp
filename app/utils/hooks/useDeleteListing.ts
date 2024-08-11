import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { get_cookie } from "@/app/actions/get_cookie";

const deleteListing = async (id: number) => {
  const token = await get_cookie();
  if (token && token.trim() != "") {
    const response = await fetch(
      `https://admin.verdroof.com/api/property/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Creation failed");
    }

    return data;
  } else {
    throw new Error("Couldn't find token.");
  }
};

export const useDeleteListing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteListing,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user_listings"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
