import { useState } from "react";
import { supabase } from "../supabaseClient";
import useImageDelete from "./useDeleteImage";
import { toast } from "react-toastify";

interface UseImageUploadResult {
  handleImageUpload: (file: File, existingUrl?: string) => Promise<string>;
  error: string | null;
}

const useImageUpload = (): UseImageUploadResult => {
  const [error, setError] = useState<string | null>(null);
  const { deleteImages, loading, error: deleteErr } = useImageDelete();

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "listings");

    try {
      const response = await fetch(
        "https://admin.verdroof.com/api/upload/image",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.data;
    } catch (err) {
      setError(err as string);
      throw err;
    }
  };

  const handleImageUpload = async (
    file: File,
    existingUrl?: string
  ): Promise<string> => {
    setError(null);
    if (existingUrl) {
      await deleteImages([existingUrl]);
    }

    if (deleteErr) {
      toast.error("Couldn't delete image");
    }

    return uploadImage(file);
  };

  return { handleImageUpload, error };
};

export default useImageUpload;
