import { useMutation } from "@tanstack/react-query";
import { ListingForm, listingFormSchema, listingSchema } from "../interfaces";
import { toast } from "react-toastify";
import { get_cookie } from "@/app/actions/get_cookie";
import { useBecomeAHostContext } from "../contexts/BecomeAHostContext";
import { z } from "zod";

const a = listingSchema.omit({ id: true });

interface Params {
  id: string;
  form_data: z.infer<typeof a>;
}

const update = async (params: Params) => {
  const { form_data, id } = params;
  const token = await get_cookie();

  if (token && token.trim() != "") {
    // Make the API request
    const response = await fetch(
      `https://admin.verdroof.com/api/user/property/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`,
        },
        body: JSON.stringify(form_data),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Profile update failed");
    }

    return data;
  } else {
    throw new Error("Token not available");
  }
};

export const useUpdateListing = () => {
  const { formField, setFormField } = useBecomeAHostContext();

  return useMutation({
    mutationFn: update,
    onSuccess: (data) => {
      // Save the returned data to state
      //   setLoginFormData(data);
      // toast.success("Listing updated");
      setFormField({ ...data.data });
      return data;
    },

    onError: (error) => {
      toast.error(error.message);
      return error;
    },
  });
};
