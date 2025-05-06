import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;

    // Get filter values from query params
    const mode = searchParams.get("mode") || "";
    const experience = searchParams.get("experience") || "";
    const fees = searchParams.get("fees") || "";
    const languages = searchParams.get("languages") || "";
    const facilities = searchParams.get("facilities") || "";

    // Build the filter object using Prisma's type
    const filter: Prisma.DoctorWhereInput = {};

    if (mode) {
      filter.consultModes = { has: mode };
    }
    if (experience) {
      // If experience is stored as string in DB
      const [minExp, maxExp] = experience.split("-");
      filter.experience = {
        gte: minExp,
        lte: maxExp,
      };
    }
    if (fees) {
      const [minFee, maxFee] = fees.split("-").map(Number);
      filter.price = {
        gte: minFee,
        lte: maxFee,
      };
    }
    if (languages) {
      filter.languages = { has: languages };
    }
    if (facilities) {
      filter.facilities = { has: facilities };
    }

    const doctors = await prisma.doctor.findMany({
      where: filter,
      skip,
      take: limit,
    });

    const totalDoctors = await prisma.doctor.count({
      where: filter,
    });

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
