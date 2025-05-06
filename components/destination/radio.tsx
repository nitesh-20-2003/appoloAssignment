"use client";
import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface FilterGroupProps {
  title: string;
  options: Option[];
}

export const FilterGroup: React.FC<FilterGroupProps> = ({ title, options }) => {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const visibleOptions = showAll ? options : options.slice(0, 3);
  const hiddenCount = options.length - 3;

  const handleChange = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {visibleOptions.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={title}
              value={option.value}
              checked={selected.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}

        {/* Show More / Show Less */}
        {options.length > 3 && (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="text-blue-600 text-sm underline cursor-pointer"
          >
            {showAll ? "Show less" : `+${hiddenCount} more`}
          </button>
        )}
      </div>
    </div>
  );
};
