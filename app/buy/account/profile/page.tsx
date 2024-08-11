"use client";
import { useEffect, useState } from "react";
import ProfileFormCard from "./ProfileFormCard";
import AccountHeader from "../AccountHeader";
import { ProfileData } from "@/app/utils/interfaces";
import { useGetProfile } from "@/app/utils/hooks/useGetProfile";
import { useGeneralContext } from "@/app/utils/contexts/GeneralContext";
import { useUpdateProfile } from "@/app/utils/hooks/useUpdateProfile";

export default function Profile() {
  const { profileData, setProfileData } = useGeneralContext();

  const { data } = useGetProfile();

  useEffect(() => {
    if (data) {
      const t_data = data.data as ProfileData;
      setProfileData({
        ...profileData,
        preferred_name: t_data.preferred_name,
        phone_number: t_data.phone_number,
        address: t_data.address,
        emergency_contact: t_data.emergency_contact,
        government_id: t_data.government_id,
      });
    }
  }, [data]);

  const handleProfileChange = (key: keyof ProfileData, value: string) => {
    setProfileData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <div className="h-[100vh] bg-white text-black px-10 md:px-[5rem] font-dmsans">
      <AccountHeader section={"Personal Info"} />
      <section className="md:w-[60%] space-y-5">
        {Object.keys(profileData).map((key) => (
          <div key={key} className="space-y-5">
            <ProfileFormCard
              label={key.replace("_", " ")}
              value={profileData[key as keyof ProfileData]}
              onChange={(value) =>
                handleProfileChange(key as keyof ProfileData, value)
              }
            />
            <hr />
          </div>
        ))}
      </section>
    </div>
  );
}
