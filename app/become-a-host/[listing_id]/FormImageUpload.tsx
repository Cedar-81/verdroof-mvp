"use client";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import useFormImageStateStore from "./useFormImageStateStore";
import { useBecomeAHostContext } from "@/app/utils/contexts/BecomeAHostContext";

interface Params {
  index: number;
  url: string;
}

const FormImageUpload = ({ index, url }: Params) => {
  const {
    setConsolidatedImages,
    consolidatedImages,
    formField,
    imageBlobStore,
  } = useBecomeAHostContext();
  const { image, setImage, handleImageStore } = useFormImageStateStore({
    url: url && url.trim() != "" ? url : null,
    file: null,
    type: index == 1 ? "cover" : "other",
    index: index,
  });

  const imageUrl = image
    ? URL.createObjectURL(image)
    : url && url.trim() != ""
    ? url
    : null;

  // useEffect(() => {
  //   formField.cover_image.trim() != "" &&
  //     setConsolidatedImages((prev) => [...prev, formField.cover_image]);
  //   formField.other_images.forEach(
  //     (img) =>
  //       img.trim() != "" && setConsolidatedImages((prev) => [...prev, img])
  //   );
  // }, []);

  //check if url already exists
  //adjust the way the image is stored
  // const image_store = {
  //   url: null,
  //   file: null,
  //   type: "cover",
  //   index: null,
  // };

  useEffect(() => {
    return () => {
      // Clean up the object URL to avoid memory leaks
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleDivClick = () => {
    // Trigger click event on hidden file input
    const input = document.getElementById(`file-input-${index}`);
    if (input) {
      input.click();
    }
  };

  return (
    <div
      className="w-full h-full flex items-center overflow-clip relative justify-center bg-gray-100 rounded-lg cursor-pointer"
      onClick={handleDivClick}
    >
      <input
        type="file"
        id={`file-input-${index}`}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageStore}
      />
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            fill={true}
            alt="Uploaded"
            className="h-full w-full object-cover absolute"
          />
          <div className="flex space-x-3 bg-gray-200 rounded-md absolute z-20 top-4 right-4 px-4 p-2 items-center">
            <Camera className="h-4 w-4 text-black/30" />
            <p>Change this image</p>
          </div>
        </>
      ) : (
        <Camera className="h-14 w-14 text-black/30" />
      )}
    </div>
  );
};

export default FormImageUpload;
