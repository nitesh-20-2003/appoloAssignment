"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FilterGroup } from "./radio";
import { debounce } from "lodash";

// Maps display names to URL-safe query keys
const filterKeys = {
  "Mode of Consult": "mode",
  "Experience Level": "experience",
  "Fees (In Rupees)": "fees",
  Languages: "languages",
  Facilities: "facilities",
};

const Filters = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    "Mode of Consult": [],
    "Experience Level": [],
    "Fees (In Rupees)": [],
    Languages: [],
    Facilities: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle individual filter group changes
  const handleFilterChange = (title, selected) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [title]: selected,
    }));
  };

  // Construct URL query string based on selected filters
  const constructQuery = () => {
    let query = "?";
    for (const group in selectedFilters) {
      const paramKey = filterKeys[group];
      if (selectedFilters[group].length > 0) {
        query += `${paramKey}=${selectedFilters[group].join(",")}&`;
      }
    }
    return query.slice(0, -1); // Remove trailing '&'
  };

  // Fetch filtered data from backend
  const fetchData = async () => {
    const query = constructQuery();
    try {
      setLoading(true);
      const response = await fetch(`/api/data${query}`);
      const data = await response.json();
      console.log("Fetched data:", data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  // Debounced filter update
  const debouncedUpdate = debounce(() => {
    const query = constructQuery();
    onFilterChange(query);
    fetchData();
  }, 500);

  useEffect(() => {
    debouncedUpdate();
    return () => {
      debouncedUpdate.cancel();
    };
  }, [selectedFilters]);

  // Reset filters to default (empty)
  const handleReset = () => {
    setSelectedFilters({
      "Mode of Consult": [],
      "Experience Level": [],
      "Fees (In Rupees)": [],
      Languages: [],
      Facilities: [],
    });
  };

  // Flatten selected options for display
  const selectedOptions = Object.entries(selectedFilters).flatMap(
    ([group, values]) =>
      values.map((value) => ({
        group,
        value,
      }))
  );

  return (
    <aside className="col-span-3 p-4 border-r sticky top-0 h-screen overflow-y-auto bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
      </div>

      {/* Loading & Error states */}
      {loading && <p className="text-sm text-gray-500 mb-2">Loading...</p>}
      {/* {error && <p className="text-sm text-red-500 mb-2">{error}</p>} */}

      {/* Selected Filters */}
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedOptions.map((opt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="capitalize"
              onClick={() => {
                setSelectedFilters((prev) => ({
                  ...prev,
                  [opt.group]: prev[opt.group].filter((v) => v !== opt.value),
                }));
              }}
            >
              {opt.value} ✕
            </Button>
          ))}

          <Button
            variant="destructive"
            size="sm"
            onClick={handleReset}
            className="ml-auto cursor-pointer"
          >
            Reset Filters
          </Button>
        </div>
      )}

      <Separator className="mb-4" />

      {/* Filter Groups */}
      <FilterGroup
        title="Mode of Consult"
        options={[
          { label: "Hospital Visit", value: "hospital" },
          { label: "Online Consult", value: "online" },
        ]}
        selectedValues={selectedFilters["Mode of Consult"]}
        onChange={(selected) => handleFilterChange("Mode of Consult", selected)}
      />

      <FilterGroup
        title="Experience Level"
        options={[
          { label: "1-5 years", value: "1-5" },
          { label: "5-10 years", value: "5-10" },
          { label: "10+ years", value: "10+" },
        ]}
        selectedValues={selectedFilters["Experience Level"]}
        onChange={(selected) =>
          handleFilterChange("Experience Level", selected)
        }
      />

      <FilterGroup
        title="Fees (In Rupees)"
        options={[
          { label: "0-500", value: "0-500" },
          { label: "501-1000", value: "501-1000" },
          { label: "1001+", value: "1001+" },
        ]}
        selectedValues={selectedFilters["Fees (In Rupees)"]}
        onChange={(selected) =>
          handleFilterChange("Fees (In Rupees)", selected)
        }
      />

      <FilterGroup
        title="Languages"
        options={[
          { label: "English", value: "english" },
          { label: "Spanish", value: "spanish" },
          { label: "French", value: "french" },
          { label: "Hindi", value: "hindi" },
          { label: "Gujarati", value: "gujarati" },
        ]}
        selectedValues={selectedFilters["Languages"]}
        onChange={(selected) => handleFilterChange("Languages", selected)}
      />

      <FilterGroup
        title="Facilities"
        options={[
          { label: "Apollo Hospital", value: "apollo" },
          { label: "Other clinic", value: "other" },
          { label: "Fortis", value: "fortis" },
          { label: "Max Healthcare", value: "max" },
        ]}
        selectedValues={selectedFilters["Facilities"]}
        onChange={(selected) => handleFilterChange("Facilities", selected)}
      />
    </aside>
  );
};

export default Filters;
