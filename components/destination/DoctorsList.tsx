"use client";

import { useEffect, useState } from "react";
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
const imageUrl =
  "https://eserpvzvefifapmklzqr.supabase.co/storage/v1/object/sign/doctor/1746518802973-dotor.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2M3N2ZiZDE0LTBmMjMtNDliNS1iZTk4LTE4MzhiOGM5OWZmZCJ9.eyJ1cmwiOiJkb2N0b3IvMTc0NjUxODgwMjk3My1kb3Rvci5qcGciLCJpYXQiOjE3NDY1MjY1MzUsImV4cCI6MTc3ODA2MjUzNX0.-6CILgznHn3OTpmWRiuBgfKK68bzGibnZIRU7Iu39CI";

export default function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<Meta>({ page: 1, pageCount: 1 });
  const [totalDoctors, setTotalDoctors] = useState<number>(0); // New state to track count

  const fetchDoctors = async (page: number = 1) => {
    try {
      setLoading(true);
      const limit = 5;
      const res = await fetch(`/api/getDoctors?page=${page}&limit=${limit}`);
      const data = await res.json();

      setDoctors(data.doctors);

      // Calculate total pages
      const total = data.totalDoctors;
      const pageCount = Math.ceil(total / limit);
      setMeta({ page, pageCount });

      setTotalDoctors(total); // Set the total count
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(1);
  }, []);

  const handlePageChange = (pageNumber: number) => {
    fetchDoctors(pageNumber);
  };

  return (
    <div className="mt-12 grid gap-y-8">
      {/* Header with count */}
      <div>
        <p className="text-muted-foreground mt-1">({totalDoctors} doctors)</p>
      </div>

      {/* Loading */}
      {loading && <DoctorSkeletonList />}

      {/* Doctor Cards */}
      {doctors.map((doc) => (
        <Card key={doc.id} className="p-4 shadow-sm">
          <CardContent className="flex items-start gap-4">
            <div className="w-24 h-24 relative rounded-full overflow-hidden border">
              <Image
                src={imageUrl || "/images/doctor.svg"}
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
                <span className="font-semibold">{doc.experience}</span> •{" "}
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

      {/* Pagination */}
      {meta && meta.pageCount > 1 && (
        <PaginationDemo meta={meta} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
