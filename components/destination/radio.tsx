"use client";
import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface FilterGroupProps {
  title: string;
  options: Option[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  options,
  selectedValues,
  onChange,
}) => {
  const [showAll, setShowAll] = useState(false);

  const visibleOptions = showAll ? options : options.slice(0, 3);
  const hiddenCount = options.length - 3;

  const handleChange = (value: string) => {
    const updatedSelected = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(updatedSelected);
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
              checked={selectedValues.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}

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
