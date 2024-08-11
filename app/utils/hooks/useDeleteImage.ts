import { useState } from "react";
import { toast } from "react-toastify";

interface UseImageDeleteResult {
  deleteImages: (urls: string[]) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useImageDelete = (): UseImageDeleteResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteImage = async (url: string): Promise<void> => {
    const filename = url.split("/").slice(-1)[0];
    const body = JSON.stringify({
      filename,
      type: "listings",
    });

    try {
      const response = await fetch(
        "https://admin.verdroof.com/api/upload/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete image");
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteImages = async (urls: string[]): Promise<void> => {
    setLoading(true);
    setError(null);

    for (const url of urls) {
      try {
        await deleteImage(url);
      } catch (err) {
        toast.error(err as string);
        break; // Stop the process if one deletion fails
      }
    }

    setLoading(false);
  };

  return { deleteImages, loading, error };
};

export default useImageDelete;
