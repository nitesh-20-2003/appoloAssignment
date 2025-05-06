import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;

    // Fetch paginated doctors
    const doctors = await prisma.doctor.findMany({
      skip,
      take: limit,
    });

    // Get total count
    const totalDoctors = await prisma.doctor.count();

    return NextResponse.json({ doctors, totalDoctors });
  } catch (error: unknown) {
    console.error("GET /api/doctors error:", error);

    let message = "Failed to fetch doctors";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
};
