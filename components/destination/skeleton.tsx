import { Skeleton } from "@/components/ui/skeleton";

export function DoctorSkeletonList() {
  return (
    <div className="mt-12 grid gap-y-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="p-4 shadow-sm border rounded-lg flex items-start gap-4"
        >
          {/* Skeleton Image */}
          <Skeleton className="w-24 h-24 rounded-full" />

          {/* Skeleton Text */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40" /> {/* Name */}
            <Skeleton className="h-4 w-32" /> {/* Specialization */}
            <Skeleton className="h-4 w-48" /> {/* Experience + Degree */}
            <Skeleton className="h-4 w-24" /> {/* Location */}
          </div>

          {/* Skeleton Right Side */}
          <div className="text-right space-y-2">
            <Skeleton className="h-6 w-16" /> {/* Price */}
            <Skeleton className="h-8 w-24" /> {/* Consult Button */}
            <Skeleton className="h-3 w-28" /> {/* Availability */}
          </div>
        </div>
      ))}
    </div>
  );
}
