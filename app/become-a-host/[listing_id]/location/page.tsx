"use client";
import { Navigation2 } from "lucide-react";
import Footer from "../../Footer";
import { useBecomeAHostContext } from "../../../utils/contexts/BecomeAHostContext";
import { useEffect, useState } from "react";

export default function Location() {
  const { formField, setFormField } = useBecomeAHostContext();

  // Split location into an array, handling cases where formField.location might be empty
  const initialLocationDetails = formField.location
    ? formField.location.split(",")
    : ["", ""];
  const [locationDetails, setLocationDetails] = useState<string[]>(
    initialLocationDetails
  );

  useEffect(() => {
    // Update formField only when locationDetails changes
    setFormField((prev) => ({
      ...prev,
      location: locationDetails.join(","),
    }));
  }, [locationDetails, setFormField]);

  return (
    <div className="w-full h-max my-auto px-8 md:px-[20%] xl:px-[30%]">
      <div className="space-y-10 mx-auto">
        <h1 className="text-2xl md:text-3xl font-medium">
          Where is your apartment located?
        </h1>
        <div className="border rounded-lg border-black/70">
          <div className="flex flex-col p-2">
            <label htmlFor="location" className="text-sm">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={locationDetails[0]}
              onChange={(e) => {
                setLocationDetails((prev) => {
                  const newLocationDetails = [...prev];
                  newLocationDetails[0] = e.target.value;
                  return newLocationDetails;
                });
              }}
              className="outline-none bg-transparent"
            />
          </div>
          <div className="flex flex-col border-t border-t-black/70 p-2">
            <label htmlFor="landmark" className="text-sm">
              Closest Landmark to Apartment
            </label>
            <input
              id="landmark"
              type="text"
              value={locationDetails[1]}
              onChange={(e) => {
                setLocationDetails((prev) => {
                  const newLocationDetails = [...prev];
                  newLocationDetails[1] = e.target.value;
                  return newLocationDetails;
                });
              }}
              className="outline-none bg-transparent"
            />
          </div>
        </div>
      </div>
      <Footer
        showNext={
          locationDetails.length === 2 &&
          locationDetails[0] !== "" &&
          locationDetails[1] !== ""
        }
        showPrev={true}
        nextLink="/about-this-unit"
        prevLink="/about-your-place"
      />
    </div>
  );
}
