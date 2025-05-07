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

const options = [
  {
    value: "relevance",
    label: "Relevance",
  },
  {
    value: "availability",
    label: "Availability",
  },
  {
    value: "nearby",
    label: "Nearby",
  },
  {
    value: "priceLowToHigh",
    label: "Price - Low to High",
  },
  {
    value: "priceHighToLow",
    label: "Price - High to Low",
  },
  {
    value: "experience",
    label: "Years of Experience",
  },
];

interface ComboboxDemoProps {
  selectedValue: string;
  onSelectSort: (value: string) => void;
}

export function ComboboxDemo({
  selectedValue,
  onSelectSort,
}: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {options.find((option) => option.value === selectedValue)?.label ||
            "Select sort..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const newValue =
                      currentValue === selectedValue ? "" : currentValue;
                    onSelectSort(newValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedValue === option.value
                        ? "opacity-100"
                        : "opacity-0"
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
