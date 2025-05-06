"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from 'next/navigation' for Next.js 13+

import Filters from "@/components/destination/Filters";
import Main from "@/components/destination/Main";

export default function HomePage() {
  const [filterQuery, setFilterQuery] = useState<string>(""); // store ?Mode=hospital&...

  const router = useRouter();

  const handleFilterChange = (query: string) => {
    setFilterQuery(query);

    // Update the URL with the filter query
    // If you want to change the URL without page reload:
    router.push(`?${query}`); // Update the URL with query string, e.g., ?Mode=hospital&Location=XYZ
  };

  // UseEffect to handle initial query parameters when page loads
  useEffect(() => {
    // Check if the query parameters exist
    const queryParams = new URLSearchParams(window.location.search);
    const initialFilterQuery = queryParams.toString();
    if (initialFilterQuery) {
      // Set initial filters from query params
      setFilterQuery(initialFilterQuery);
    } else {
      // If no query params, reset URL to clean version without query parameters
      router.push(window.location.pathname); // This will remove all query parameters
    }
  }, [router]); // Added `router` as a dependency

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <Filters onFilterChange={handleFilterChange} />
      <Main filterQuery={filterQuery} />
    </div>
  );
}
