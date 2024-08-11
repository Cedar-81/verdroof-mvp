import { usePathname, useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { useBecomeAHostContext } from "../contexts/BecomeAHostContext";
import { Listing, listing_schema_without_id } from "../interfaces";
import useImageUpload from "./useImageUpload";
import { useUpdateListing } from "./useUpdateListing";
import { form_fields } from "../helpers";

type HandleSaveArgs = {
  exit: boolean;
  publish: boolean;
};

export const useFormSave = (): [
  (args: HandleSaveArgs) => Promise<void>,
  boolean,
  boolean
] => {
  const { mutate: updateListing, isPending } = useUpdateListing();
  const {
    formField,
    imageBlobStore,
    setFormField,
    setImageBlobStore,
  } = useBecomeAHostContext();
  const router = useRouter();
  const pathname = usePathname();
  const { handleImageUpload, error } = useImageUpload();
  const [isSaving, setIsSaving] = useState(false);
  const { listing_id } = useParams<{ listing_id: string }>();

  const transformAToAForm = (
    value: Listing
  ): z.infer<typeof listing_schema_without_id> => {
    return listing_schema_without_id.parse(value);
  };

  useEffect(() => {
    if (
      window !== undefined &&
      localStorage.getItem("local_current_listing")?.trim()
    ) {
      const data = localStorage.getItem("local_current_listing");
      if (data) {
        let t_data = transformAToAForm(JSON.parse(data));
        setFormField({
          ...t_data,
        });
      }
    }
  }, []);

  if (error) {
    toast.error(error);
  }

  const handleSave = async ({ exit, publish }: HandleSaveArgs) => {
    let cover_image_url = formField.cover_image;
    let other_image_urls = formField.other_images;

    setIsSaving(true);

    if (imageBlobStore.cover_image && imageBlobStore.cover_image.file) {
      let url =
        imageBlobStore.cover_image.url == null
          ? undefined
          : imageBlobStore.cover_image.url;
      cover_image_url = await handleImageUpload(
        imageBlobStore.cover_image.file,
        url
      );
    }

    if (imageBlobStore.other_images.length > 0) {
      for (let idx in imageBlobStore.other_images) {
        if (
          imageBlobStore.other_images[idx] &&
          imageBlobStore.other_images[idx].file != null
        ) {
          let url =
            imageBlobStore.other_images[idx].url == null
              ? undefined
              : (imageBlobStore.other_images[idx].url as string);
          let current_url = await handleImageUpload(
            imageBlobStore.other_images[idx].file as File,
            url
          );
          other_image_urls[
            imageBlobStore.other_images[idx].index
          ] = current_url;
        } else if (
          imageBlobStore.other_images[idx] &&
          imageBlobStore.other_images[idx].file == null &&
          imageBlobStore.other_images[idx].url == null
        ) {
          other_image_urls[imageBlobStore.other_images[idx].index] = "";
        }
      }
    }
    setIsSaving(false);
    setImageBlobStore({
      cover_image: { url: null, file: null, type: "cover", index: 0 },
      other_images: [],
    });

    const formFieldData = {
      ...formField,
      cover_image: cover_image_url,
      other_images: other_image_urls,
      current_link: pathname,
      published: publish ? 1 : 0,
    };

    updateListing({ form_data: formFieldData as Listing, id: listing_id });

    if (publish) {
      setFormField(form_fields);
      if (localStorage.getItem("local_current_listing")) {
        localStorage.removeItem("local_current_listing");
      }
    }

    if (exit) {
      setFormField(form_fields);
      router.push("/hosting/listing");
    }
  };

  return [handleSave, isSaving, isPending];
};
