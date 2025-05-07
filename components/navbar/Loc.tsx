"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const indianCities = [
  {
    value: "mumbai",
    label: "Mumbai",
  },
  {
    value: "delhi",
    label: "Delhi",
  },
  {
    value: "bangalore",
    label: "Bangalore",
  },
  {
    value: "hyderabad",
    label: "Hyderabad",
  },
  {
    value: "chennai",
    label: "Chennai",
  },
  {
    value: "kolkata",
    label: "Kolkata",
  },
  {
    value: "pune",
    label: "Pune",
  },
  {
    value: "jaipur",
    label: "Jaipur",
  },
  {
    value: "ahmedabad",
    label: "Ahmedabad",
  },
  {
    value: "kochi",
    label: "Kochi",
  },
];

export function CityCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? indianCities.find((city) => city.value === value)?.label
            : "Select city..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search city..." />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {indianCities.map((city) => (
                <CommandItem
                  key={city.value}
                  value={city.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {city.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === city.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
