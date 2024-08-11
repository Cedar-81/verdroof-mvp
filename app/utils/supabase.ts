import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_SUPABASE_PROJECT_URL!,
  process.env.NEXT_SUPABASE_API_KEY!
);

// Upload file using standard upload, I used the upsert true option to replace files related to a particular listing if changed. We would need use same path for updated files
export async function uploadFile(file: File, filepath: string) {
  const { data, error } = await supabase.storage
    .from("listings")
    .upload(filepath, file, {
      upsert: true,
    });
  if (error) {
    // Handle error
    toast.error(error.message);
  } else {
    // Handle success
    return getFileUrl(filepath, file.name);
  }
}

async function getFileUrl(filepath: string, filename: string) {
  const { data } = supabase.storage.from("listings").getPublicUrl(filepath);

  return (
    data?.publicUrl ||
    `https://${process.env.NEXT_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/listings/${filename}`
  );
}
