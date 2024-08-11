import { useMutation } from "@tanstack/react-query";
import { useGeneralContext } from "../contexts/GeneralContext";
import { ProfileData } from "../interfaces";
import { create_cookie } from "@/app/actions/login_action";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { get_cookie } from "@/app/actions/get_cookie";

const update = async (profile: ProfileData) => {
  const token = await get_cookie();

  if (token && token.trim() != "") {
    // Make the API request
    const response = await fetch(
      "https://admin.verdroof.com/api/user/profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`,
        },
        body: JSON.stringify({
          preferred_name: profile.preferred_name,
          phone_number: profile.phone_number,
          government_id: profile.government_id,
          address: profile.address,
          emergency_contact: profile.emergency_contact,
        }),
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

export const useUpdateProfile = () => {
  const { setProfileData } = useGeneralContext();

  return useMutation({
    mutationFn: update,
    onSuccess: (data) => {
      // Save the returned data to state
      //   setLoginFormData(data);
      toast.success("Profile updated");
      const t_data = data.data as ProfileData;
      setProfileData((prev) => {
        return {
          ...prev,
          preffered_name: t_data.preferred_name,
          phone_number: t_data.phone_number,
          email: t_data.email,
          address: t_data.address,
          emergency_contact: t_data.emergency_contact,
          government_id: t_data.government_id,
        };
      });
      return data;
    },

    onError: (error) => {
      toast.error(error.message);
      return error;
    },
  });
};
