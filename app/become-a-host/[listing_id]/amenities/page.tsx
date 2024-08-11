"use client";
import { useEffect, useState } from "react";
import FormIconCard from "../FormIconCard";
import Footer from "../../Footer";
import { useBecomeAHostContext } from "../../../utils/contexts/BecomeAHostContext";
import { amenityOptions } from "@/app/utils/helpers";

export default function Amenities() {
  const { formField, setFormField } = useBecomeAHostContext();
  const [selectedBasicAmenities, setSelectedBasicAmenities] = useState<
    string[]
  >(formField.basic_amenities);
  const [selectedBuildingAmenities, setSelectedBuildingAmenities] = useState<
    string[]
  >(formField.building_amenities);
  const [selectedSafetyAmenities, setSelectedSafetyAmenities] = useState<
    string[]
  >(formField.safety_amenities);

  useEffect(() => {
    setFormField((prev) => {
      return {
        ...prev,
        basic_amenities: selectedBasicAmenities,
        building_amenities: selectedBuildingAmenities,
        safety_amenities: selectedSafetyAmenities,
      };
    });
  }, [
    selectedBasicAmenities,
    selectedBuildingAmenities,
    selectedSafetyAmenities,
  ]);

  const handleCheckboxChange = (
    item: string,
    selectedAmenities: string[],
    setSelectedAmenities: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const index = selectedAmenities.indexOf(item);
    if (index > -1) {
      //removing item
      const updatedAmenities = [...selectedAmenities];
      updatedAmenities.splice(index, 1);
      setSelectedAmenities(updatedAmenities);
    } else {
      //adding item
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  return (
    <div className="w-full h-max my-auto px-8 md:px-[20%] xl:px-[30%]">
      <div className="space-y-10 mx-auto">
        <h1 className="text-2xl md:text-3xl font-medium">
          Tell renters what your place has to offer
        </h1>

        <div className="grid gap-4 grid-cols-1 sm:grid-item-2 md:grid-cols-3">
          {amenityOptions.basicAmenities.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center border hover:shadow-md cursor-pointer rounded-lg ${
                selectedBasicAmenities.includes(item.type)
                  ? "border-black/70 bg-gray-100"
                  : "border-black/10"
              }`}
              onClick={() =>
                handleCheckboxChange(
                  item.type,
                  selectedBasicAmenities,
                  setSelectedBasicAmenities
                )
              }
            >
              <FormIconCard item={item} />
            </div>
          ))}
        </div>

        {/* Building Amenities */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Building Amenities</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {amenityOptions.buildingAmenities.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center border hover:shadow-md cursor-pointer rounded-lg ${
                  selectedBuildingAmenities.includes(item.type)
                    ? "border-black/70 bg-gray-100"
                    : "border-black/10"
                }`}
                onClick={() =>
                  handleCheckboxChange(
                    item.type,
                    selectedBuildingAmenities,
                    setSelectedBuildingAmenities
                  )
                }
              >
                <FormIconCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Safety Amenities */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Safety Amenities</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {amenityOptions.safetyAmenities.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center border hover:shadow-md cursor-pointer rounded-lg ${
                  selectedSafetyAmenities.includes(item.type)
                    ? "border-black/70 bg-gray-100"
                    : "border-black/10"
                }`}
                onClick={() =>
                  handleCheckboxChange(
                    item.type,
                    selectedSafetyAmenities,
                    setSelectedSafetyAmenities
                  )
                }
              >
                <FormIconCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer
        showNext={true}
        showPrev={true}
        nextLink="/listing-photos"
        prevLink="/step-two"
      />
    </div>
  );
}
