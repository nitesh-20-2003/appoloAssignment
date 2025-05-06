"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FilterGroup } from "./radio";
import { debounce } from "lodash"; // You'll need to install lodash for debounce

const Filters = () => {
  // Define the state with proper types (for clarity)
  const [selectedFilters, setSelectedFilters] = useState({
    "Mode of Consult": [],
    "Experience Level": [],
    "Fees (In Rupees)": [],
    Languages: [],
    Facilities: [],
  });

  // Update handler when a group changes
  const handleFilterChange = (title, selected) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [title]: selected,
    }));
  };

  // Function to construct query from selected filters
  const constructQuery = () => {
    let query = "?";
    for (const group in selectedFilters) {
      if (selectedFilters[group].length > 0) {
        query += `${group}=${selectedFilters[group].join(",")}&`;
      }
    }
    return query.slice(0, -1); // Remove trailing '&'
  };

  // Function to fetch data from backend
  const fetchData = async () => {
    const query = constructQuery();
    try {
      const response = await fetch(`/api/data${query}`);
      const data = await response.json();
      console.log("Fetched data:", data);
      // Handle the response as needed (e.g., updating the UI)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Debounced version of fetchData to limit the number of API calls
  const debouncedFetchData = debounce(fetchData, 500); // 500ms debounce delay

  // Call the fetchData whenever selectedFilters changes
  useEffect(() => {
    debouncedFetchData();
  }, [selectedFilters]);

  // Reset all filters to empty (null equivalent)
  const handleReset = () => {
    setSelectedFilters({
      "Mode of Consult": [],
      "Experience Level": [],
      "Fees (In Rupees)": [],
      Languages: [],
      Facilities: [],
    });
  };

  // Flatten selected filters for showing as buttons
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

      {/* Selected filter buttons */}
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedOptions.map((opt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="capitalize"
            >
              {opt.value}
            </Button>
          ))}

          {/* Reset button */}
          <Button
            variant="destructive"
            size="sm"
            onClick={handleReset}
            className="ml-auto"
          >
            Reset Filters
          </Button>
        </div>
      )}

      <Separator className="mb-4" />

      {/* Filter groups */}
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
