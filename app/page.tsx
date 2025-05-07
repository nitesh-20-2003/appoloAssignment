"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Filters from "@/components/destination/Filters";
import Main from "@/components/destination/Main";

export default function HomePage() {
  // const searchParams = useSearchParams();
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const router = useRouter();

  const handleFilterChange = (query: string) => {
    setFilterQuery(query);
    // Use replace to avoid adding to history stack
    router.replace(`?${query}`, { scroll: false });
  };

  const handleSortChange = (selectedSort: string) => {
    const params = new URLSearchParams(filterQuery);
    if (selectedSort) {
      params.set("sort", selectedSort);
    } else {
      params.delete("sort");
    }
    setSortBy(selectedSort);
    handleFilterChange(params.toString());
  };

  useEffect(() => {
    // Initialize from URL on mount
    const params = new URLSearchParams(window.location.search);
    setFilterQuery(params.toString());
    setSortBy(params.get("sort") || "");
  }, []);

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <Filters
        onFilterChange={handleFilterChange}
        
       
      />
      <Main
        filterQuery={filterQuery}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
    </div>
  );
}
