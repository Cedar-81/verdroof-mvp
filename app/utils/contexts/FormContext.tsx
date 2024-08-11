import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { ListingForm, ListingFormContextType } from "../interfaces";

export const FormContext = createContext<ListingFormContextType | undefined>(
  undefined
);

export const useFormContext = (): ListingFormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
