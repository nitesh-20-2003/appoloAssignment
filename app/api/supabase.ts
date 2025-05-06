import { createClient } from "@supabase/supabase-js";

const bucket = "doctor";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;

  const {  error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Supabase upload error:", error.message);
    throw new Error("Image upload failed: " + error.message);
  }

  // Generate public URL manually
  const publicUrl = `https://${
    process.env.SUPABASE_URL!.split("//")[1]
  }/storage/v1/object/public/${bucket}/${newName}`;
  return publicUrl;
};
