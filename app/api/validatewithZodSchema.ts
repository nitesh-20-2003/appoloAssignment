import { z } from "zod";

// Doctor schema for validating doctor data
export const doctorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  specialization: z
    .string()
    .min(2, "Specialization must be at least 2 characters long"),
  experience: z.string().min(1, "Experience is required"),
  degree: z.string().min(1, "Degree is required"),
  location: z.string().min(1, "Location is required"),
  clinic: z.string().min(1, "Clinic name is required"),
  price: z.coerce.number().int().min(0, "Price must be a positive number"),
  cashback: z.coerce.number().int().default(0),
  availability: z.string().min(1, "Availability is required"),
});

// Image schema for validating uploaded image file
export const imageSchema = z.object({
  image: validateImageFile(),
});

// Reusable Zod validator with improved error messages
export function validateWithZodSchema<T>(
  schema: z.ZodType<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  console.log(result);
  if (!result.success) {
    const errors = result.error.errors.map(
      (error) => `${error.path.join(".")} - ${error.message}`
    );
    throw new Error(errors.join(", "));
  }
  return result.data;
}

// Helper for validating image file type and size
function validateImageFile() {
  const maxUploadSize = 1024 * 1024; // 1MB max
  return z
    .instanceof(File)
    .refine((file) => file.size <= maxUploadSize, "File too large (max 1MB)")
    .refine((file) => file.type.startsWith("image/"), "File must be an image");
}
