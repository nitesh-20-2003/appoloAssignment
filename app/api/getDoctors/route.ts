import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;

    const mode = searchParams.get("mode");
    const experience = searchParams.get("experience");
    // console.log("Experience filter:", experience);
    const fees = searchParams.get("fees");
    const languages = searchParams.get("languages");
    const facilities = searchParams.get("facilities");
    const sort = searchParams.get("sort");
    // console.log("sort :",sort)
    // console.log(searchParams)
    // console.log("languages:", languages);
    const andConditions: Prisma.DoctorWhereInput[] = [];

    // Consult mode
    if (mode) {
      const dbModes = mode
        .split(",")
        .map((m) =>
          m === "hospital"
            ? "Hospital Visit"
            : m === "online"
            ? "Online Consult"
            : m
        );

      andConditions.push({
        consultModes: {
          hasSome: dbModes,
        },
      });
    }

    if (experience) {
      // console.log("Experience filter:", experience);
      const experienceRanges = experience
        .split(",")
        .map((range) => range.trim());
      const orConditions: Prisma.DoctorWhereInput[] = [];

      for (const range of experienceRanges) {
        if (range.endsWith("+")) {
          const minExp = parseInt(range.replace("+", ""));
          orConditions.push({
            experience: {
              gte: minExp,
            },
          });
        } else if (range.includes("-")) {
          const [minExp, maxExp] = range
            .split("-")
            .map((s) => parseInt(s.trim()));
          orConditions.push({
            experience: {
              gte: minExp,
              lte: maxExp,
            },
          });
        } else {
          const exactExp = parseInt(range);
          if (!isNaN(exactExp)) {
            orConditions.push({
              experience: {
                equals: exactExp,
              },
            });
          }
        }
      }

      if (orConditions.length > 0) {
        andConditions.push({ OR: orConditions });
      }
    }

    // Fees filter
    if (fees) {
      const feeRanges = fees.split(",");
      const orConditions: Prisma.DoctorWhereInput[] = [];

      for (const range of feeRanges) {
        if (range.includes("+")) {
          const minFee = parseInt(range.replace("+", ""));
          orConditions.push({
            price: {
              gte: minFee,
            },
          });
        } else if (range.includes("-")) {
          const [minFee, maxFee] = range.split("-").map(Number);
          orConditions.push({
            price: {
              gte: minFee,
              lte: maxFee,
            },
          });
        }
      }

      if (orConditions.length > 0) {
        andConditions.push({ OR: orConditions });
      }
    }

    // Languages filter
    if (languages) {
      const languageList = languages
        .split(",")
        .map((lang) => lang.trim().toLowerCase()) // Convert each input language to lowercase
        .filter((lang) => lang.length > 0);

      if (languageList.length > 0) {
        andConditions.push({
          languages: {
            hasSome: languageList.map(
              (lang) => lang.charAt(0).toUpperCase() + lang.slice(1)
            ), // Convert input languages to Capitalized format
          },
        });
      }
    }

    // Facilities filter
    if (facilities) {
      const facilityList = facilities.split(",").map((f) => f.trim());

      // If the list doesn't include "Other", apply the filter
      if (!facilityList.includes("Other")) {
        andConditions.push({
          facilities: {
            hasSome: facilityList,
          },
        });
      }
    }

    // Sorting
    const orderBy: Prisma.DoctorOrderByWithRelationInput[] = [];

    if (sort) {
      console.log("Sort parameter:", sort);
      // console.log("Sort parameter:", sort);
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
      }
    }

    const whereFilter: Prisma.DoctorWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};

    const [doctors, totalDoctors] = await Promise.all([
      prisma.doctor.findMany({
        where: whereFilter,
        skip,
        take: limit,
        orderBy: orderBy.length > 0 ? orderBy : undefined,
      }),
      prisma.doctor.count({ where: whereFilter }),
    ]);

    return NextResponse.json({ doctors, totalDoctors });
  } catch (error) {
    console.error("GET /api/doctors error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch doctors";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
