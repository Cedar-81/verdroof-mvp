"use client";
import { string, z } from "zod";
import { useBecomeAHostContext } from "../../../utils/contexts/BecomeAHostContext";
import Footer from "../../Footer";
import FormImageUpload from "../FormImageUpload";
import { listing_schema_without_id } from "@/app/utils/interfaces";

export default function ListingPhotos() {
  const {
    formField,
    consolidatedImages,
    imageBlobStore,
  } = useBecomeAHostContext();

  let blobCoverAvailable =
    (imageBlobStore.cover_image &&
      imageBlobStore.cover_image.url?.trim() != "") ||
    (imageBlobStore.cover_image && imageBlobStore.cover_image.file != null);

  let OtherImagesAvailable =
    formField.other_images.length + consolidatedImages.length == 4;

  let showNext =
    (blobCoverAvailable && OtherImagesAvailable) ||
    (formField.cover_image.trim() != "" && OtherImagesAvailable);

  return (
    <div className="w-full h-max my-auto px-8 md:px-[20%] xl:px-[30%]">
      <div className="space-y-10 mx-auto">
        <h1 className="text-2xl md:text-3xl font-medium">
          Upload listing images
        </h1>

        <div className="space-y-10">
          <div className="w-full h-[20rem] rounded-lg">
            <FormImageUpload url={formField.cover_image} index={1} />
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="w-full h-[10rem] rounded-lg">
              <FormImageUpload url={formField.other_images[0]} index={2} />
            </div>
            <div className="w-full h-[10rem] rounded-lg">
              <FormImageUpload url={formField.other_images[1]} index={3} />
            </div>
            <div className="w-full h-[10rem] rounded-lg">
              <FormImageUpload url={formField.other_images[2]} index={4} />
            </div>
            <div className="w-full h-[10rem] rounded-lg">
              <FormImageUpload url={formField.other_images[3]} index={5} />
            </div>
          </div>
        </div>
      </div>

      <Footer
        showNext={showNext}
        showPrev={true}
        nextLink="/description"
        prevLink="/amenities"
      />
    </div>
  );
}
