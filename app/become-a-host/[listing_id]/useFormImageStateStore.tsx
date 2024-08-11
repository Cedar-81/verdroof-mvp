import { useState } from "react";
import { useBecomeAHostContext } from "../../utils/contexts/BecomeAHostContext";
import { toast } from "react-toastify";
import { ImageStore } from "@/app/utils/interfaces";

const MAX_FILE_SIZE_MB = 5;

const useFormImageStateStore = (data: ImageStore) => {
  const {
    imageBlobStore,
    setImageBlobStore,
    setConsolidatedImages,
    consolidatedImages,
  } = useBecomeAHostContext();
  const [image, setImage] = useState<File | null>(null);

  const handleImageStore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    data.index !== 1 &&
      file &&
      setConsolidatedImages((prev) => [...prev, URL.createObjectURL(file)]);

    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error("File size exceeds 5MB");
        return;
      }

      setImage(file);

      if (data.index === 1) {
        setImageBlobStore((prev) => ({
          ...prev,
          cover_image: {
            url: data.url,
            file,
            type: "cover",
            index: data.index - 2,
          },
        }));
      } else {
        setImageBlobStore((prev) => {
          const newOtherImages = [...prev.other_images];
          newOtherImages[data.index - 2] = {
            url: data.url,
            file,
            type: "other",
            index: data.index - 2,
          };
          return {
            ...prev,
            other_images: newOtherImages,
          };
        });
      }
    }
  };

  return { image, setImage, handleImageStore };
};

export default useFormImageStateStore;
