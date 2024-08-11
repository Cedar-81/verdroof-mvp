"use client";
import {
  Building,
  Home,
  BrickWall,
  Warehouse,
  Paintbrush,
  Bed,
  Armchair,
  TreePine,
  DoorClosed,
  ArrowDownCircle,
  BedDouble,
  Building2,
  School,
  LucideProps,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import FormIconCard from "../FormIconCard";
import {
  FormContext,
  useFormContext,
} from "../../../utils/contexts/FormContext";
import { useBecomeAHostContext } from "../../../utils/contexts/BecomeAHostContext";
import Footer from "../../Footer";
import { RentalOptions } from "@/app/utils/interfaces";

const rentalOptions: RentalOptions = {
  propertyTypes: [
    { type: "Apartment Building", icon: Building },
    { type: "House", icon: Home },
    { type: "Condominium", icon: BrickWall },
    { type: "Townhouse", icon: Warehouse },
    { type: "Duplex/Triplex", icon: School },
    { type: "Loft Building", icon: Warehouse },
    { type: "Bungalow", icon: Home },
    { type: "Studio", icon: Paintbrush },
  ],
  unitTypes: [
    { type: "Studio Apartment", icon: Paintbrush },
    { type: "1-Bedroom Apartment", icon: Bed },
    { type: "2-Bedroom Apartment", icon: BedDouble },
    { type: "Penthouse", icon: Building2 },
    { type: "Loft Apartment", icon: Warehouse },
    { type: "Duplex Unit", icon: School },
    { type: "Basement Apartment", icon: ArrowDownCircle },
    { type: "Garden Apartment", icon: TreePine },
    { type: "Townhouse Unit", icon: Warehouse },
    { type: "Self Contain", icon: DoorClosed },
    { type: "Single Room", icon: Armchair },
  ],
};

export default function AboutYourPlace() {
  const { formField, setFormField } = useBecomeAHostContext();

  return (
    <div className="w-full h-max px-8 md:px-[20%] xl:px-[30%]">
      <div className="space-y-10 mx-auto">
        <h1 className="text-2xl md:text-3xl font-medium">
          Which of these best describes your apartment?
        </h1>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {rentalOptions.propertyTypes.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center border hover:shadow-md cursor-pointer rounded-lg ${
                formField.apartment_type === item.type
                  ? "border-black/70 bg-gray-100"
                  : "border-black/10"
              }`}
              onClick={() =>
                setFormField((prev) => {
                  return {
                    ...prev,
                    apartment_type: item.type,
                  };
                })
              }
            >
              <FormIconCard key={idx} item={item} />
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-medium">
            What kind of unit are you renting?
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {rentalOptions.unitTypes.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center border hover:shadow-md cursor-pointer rounded-lg ${
                  formField.unit_type === item.type
                    ? "border-black/70 bg-gray-100"
                    : "border-black/10"
                }`}
                onClick={() =>
                  setFormField((prev) => {
                    return {
                      ...prev,
                      unit_type: item.type,
                    };
                  })
                }
              >
                <FormIconCard key={idx} item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer
        showNext={
          formField.apartment_type.trim() != "" &&
          formField.unit_type.trim() != ""
        }
        showPrev={true}
        nextLink="/location"
        prevLink="/step-one"
      />
    </div>
  );
}
