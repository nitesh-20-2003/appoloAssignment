import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;

    // Get filter and sort values from query params
    const mode = searchParams.get("mode");
    const experience = searchParams.get("experience");
    const fees = searchParams.get("fees");
    const languages = searchParams.get("languages");
    const facilities = searchParams.get("facilities");
    const sort = searchParams.get("sort");

    // Build the filter object
    const filter: Prisma.DoctorWhereInput = {};

    // Handle consult modes filter
    if (mode) {
      const modeValues = mode.split(",");
      const dbModes = modeValues.map((m) =>
        m === "hospital"
          ? "Hospital Visit"
          : m === "online"
          ? "Online Consult"
          : m
      );

      filter.consultModes = {
        hasSome: dbModes,
      };
    }

    // Experience filter
    if (experience) {
      const experienceRanges = experience.split(",");
      const experienceConditions: Prisma.IntFilter[] = [];

      for (const range of experienceRanges) {
        if (range.includes("+")) {
          const minExp = parseInt(range.replace("+", ""));
          experienceConditions.push({
            gte: minExp,
          });
        } else if (range.includes("-")) {
          const [minExp, maxExp] = range.split("-").map(Number);
          experienceConditions.push({
            gte: minExp,
            lte: maxExp,
          });
        }
      }

      if (experienceConditions.length > 0) {
        filter.OR = experienceConditions.map((condition) => ({
          experience: condition,
        }));
      }
    }

    // Fees filter
    if (fees) {
      const feeRanges = fees.split(",");
      const feeConditions: Prisma.IntFilter[] = [];

      for (const range of feeRanges) {
        if (range.includes("+")) {
          const minFee = parseInt(range.replace("+", ""));
          feeConditions.push({
            gte: minFee,
          });
        } else if (range.includes("-")) {
          const [minFee, maxFee] = range.split("-").map(Number);
          feeConditions.push({
            gte: minFee,
            lte: maxFee,
          });
        }
      }

      if (feeConditions.length > 0) {
        filter.OR = feeConditions.map((condition) => ({
          price: condition,
        }));
      }
    }

    // Languages filter
    if (languages) {
      filter.languages = {
        hasSome: languages.split(","),
      };
    }

    // Facilities filter
    if (facilities) {
      filter.facilities = {
        hasSome: facilities.split(","),
      };
    }

    // Handle sorting
    const orderBy: Prisma.DoctorOrderByWithRelationInput[] = [];

    if (sort) {
      switch (sort) {
        case "priceLowToHigh":
          orderBy.push({ price: "asc" });
          break;
        case "priceHighToLow":
          orderBy.push({ price: "desc" });
          break;
        case "experience":
          orderBy.push({ experience: "asc" });
          break;
        case "experience-desc":
          orderBy.push({ experience: "desc" });
          break;
        // Add more sort options as needed
      }
    }

    const [doctors, totalDoctors] = await Promise.all([
      prisma.doctor.findMany({
        where: filter,
        skip,
        take: limit,
        orderBy: orderBy.length > 0 ? orderBy : undefined,
      }),
      prisma.doctor.count({ where: filter }),
    ]);

    return NextResponse.json({ doctors, totalDoctors });
  } catch (error) {
    console.error("GET /api/doctors error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch doctors";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
