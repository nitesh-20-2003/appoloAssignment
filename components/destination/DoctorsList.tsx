"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaginationDemo } from "@/components/destination/pagination";
import { DoctorSkeletonList } from "@/components/destination/skeleton";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  degree: string;
  location: string;
  price: number;
  availability: string;
  image: string;
}

interface Meta {
  page: number;
  pageCount: number;
}

export default function DoctorList({ filterQuery }: { filterQuery: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<Meta>({ page: 1, pageCount: 1 });
  const [totalDoctors, setTotalDoctors] = useState<number>(0);

  const page = parseInt(searchParams.get("page") || "1");

  // Parse filterQuery (string like "mode=hospital&experience=1-5")
  const parsedFilters = new URLSearchParams(filterQuery);

  const specialization = parsedFilters.get("specialization") || "";
  const location = parsedFilters.get("location") || "";
  const mode = parsedFilters.get("mode") || "";
  const experience = parsedFilters.get("experience") || "";
  const fees = parsedFilters.get("fees") || "";
  const language = parsedFilters.get("languages") || "";
  const facilities = parsedFilters.get("facilities") || "";
const sort=parsedFilters.get("sort") || "";
// console.log(sort)
  // Memoize the fetchDoctors function
  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const limit = 5;
      const url = `/api/getDoctors?page=${page}&limit=${limit}&sort=${sort}&specialization=${specialization}&location=${location}&mode=${mode}&experience=${experience}&fees=${fees}&languages=${language}&facilities=${facilities}`;
      const res = await fetch(url);
      const data = await res.json();

      setDoctors(data.doctors);
      const total = data.totalDoctors;
      const pageCount = Math.ceil(total / limit);
      setMeta({ page, pageCount });
      setTotalDoctors(total);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    specialization,
    location,
    mode,
    experience,
    fees,
    language,
    facilities,
  sort
  ]); 
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]); 

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mt-12 grid gap-y-8">
      <div>
        <p className="text-muted-foreground mt-1">({totalDoctors} doctors)</p>
      </div>

      {loading && <DoctorSkeletonList />}

      {doctors.map((doc) => (
        <Card key={doc.id} className="p-4 shadow-sm">
          <CardContent className="flex items-start gap-4">
            <div className="w-24 h-24 relative rounded-full overflow-hidden border">
              <Image
                src={"/images/doctor.svg"}
                alt={doc.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold">{doc.name}</h2>
              <p className="text-sm text-muted-foreground">
                {doc.specialization}
              </p>
              <p className="text-sm">
                <span className="font-semibold">{doc.experience} <span> Yr</span></span> •{" "}
                {doc.degree}
              </p>
              <p className="text-sm text-muted-foreground">{doc.location}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">₹{doc.price}</p>
              <Button className="mt-2 text-sm">Consult Online</Button>
              <p className="text-xs text-muted-foreground mt-1">
                Available at {doc.availability}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      {meta && meta.pageCount > 1 && (
        <PaginationDemo meta={meta} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
