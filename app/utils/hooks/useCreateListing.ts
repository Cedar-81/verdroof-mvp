import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useBecomeAHostContext } from "../contexts/BecomeAHostContext";
import { ListingForm } from "../interfaces";
import { get_cookie } from "@/app/actions/get_cookie";

interface Params {
  formField: unknown;
}

const createListings = async (params: Params) => {
  const { formField } = params;
  const token = await get_cookie();

  if (token && token.trim() != "") {
    const response = await fetch("https://admin.verdroof.com/api/property", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.trim()}`,
      },
      body: JSON.stringify(formField),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Creation failed");
    }

    return data;
  } else {
    throw new Error("Couldn't retrieve token");
  }
};

export const useCreateListing = () => {
  const { setEditingId } = useBecomeAHostContext();
  return useMutation({
    mutationFn: createListings,
    onSuccess: (data) => {
      setEditingId(data.data.id);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
