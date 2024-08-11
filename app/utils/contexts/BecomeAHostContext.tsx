"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import {
  BecomeAHostContextType,
  ImageBlobStore,
  ListingForm,
  NavContentInterface,
  NavItems,
  listingFormSchema,
} from "../interfaces";
import { form_fields } from "../helpers";
import { z } from "zod";

const nav_items: NavItems[] = [
  // {
  //   title: "Listings",
  //   route: "/hosting/listing",
  //   active: true,
  // },
];

const createEmptyFile = (name: string): File => {
  return new File([""], name, { type: "application/octet-stream" });
};

export const BecomeAHostContext = createContext<
  BecomeAHostContextType | undefined
>(undefined);

export const BecomeAHostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formField, setFormField] = useState<ListingForm>(form_fields);
  const [editingId, setEditingId] = useState<number>();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [showDuplicatePopup, setShowDuplicatePopup] = useState<boolean>(false);
  const [navContent, setNavContent] = useState<NavContentInterface>({
    button_string: "exit",
    nav_items,
  });
  const [imageBlobStore, setImageBlobStore] = useState<ImageBlobStore>({
    cover_image: { url: null, file: null, type: "cover", index: 0 },
    other_images: [],
  });
  const [consolidatedImages, setConsolidatedImages] = useState<string[]>([]);

  // const updateFormField = (newFormField: Partial<ListingForm>) => {
  //   const parsed = listingFormSchema.safeParse({
  //     ...formField,
  //     ...newFormField,
  //   });
  //   if (parsed.success) {
  //     setFormField(parsed.data);
  //   } else {
  //     console.error("Validation error:", parsed.error);
  //   }
  // };

  return (
    <BecomeAHostContext.Provider
      value={{
        navContent,
        setNavContent,
        formField,
        setFormField,
        editingId,
        setEditingId,
        isUpdate,
        setIsUpdate,
        imageBlobStore,
        setImageBlobStore,
        showDuplicatePopup,
        setShowDuplicatePopup,
        consolidatedImages,
        setConsolidatedImages,
      }}
    >
      {children}
    </BecomeAHostContext.Provider>
  );
};

export const useBecomeAHostContext = (): BecomeAHostContextType => {
  const context = useContext(BecomeAHostContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
