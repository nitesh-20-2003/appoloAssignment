import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import {
  doctorSchema,
  imageSchema,
  validateWithZodSchema,
} from "@/app/api/validatewithZodSchema";
import { uploadImage } from "@/app/api/supabase"; // Adjust path if needed

export async function POST(req: NextRequest) {
  try {
    // Handle multipart/form-data
    const formData = await req.formData();

    // Extract and validate the image file
    const file = formData.get("image");
    if (!(file instanceof File)) {
      throw new Error("Image is required and must be a file");
    }
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });

    // Upload image and get URL
    const imageUrl = await uploadImage(validatedFile.image);

    // Convert FormData to plain object for validation
    const rawFields = Object.fromEntries(formData.entries());

    // Convert string numbers to actual numbers where needed
    rawFields.price = Number(rawFields.price).toString();
    rawFields.cashback = Number(rawFields.cashback).toString();

    // Validate the rest of the fields
    const validatedData = validateWithZodSchema(doctorSchema, rawFields);

    // Save to database
    const doctor = await prisma.doctor.create({
      data: {
        ...validatedData,
        image: imageUrl,
      },
    });

    return NextResponse.json({ msg: "Doctor created", doctor });
  } catch (error: unknown) {
    console.error("POST /api/addDoctors error:", error);

    let message = "Something went wrong";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
