"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = { label: string; value: string };

export function MultiSelect({
  options,
  values,
  onChange,
  placeholder,
}: {
  options: Option[];
  values: string[];
  onChange: (newValues: string[]) => void;
  placeholder?: string;
}) {
  const toggleValue = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {values.length > 0
            ? `${values.length} selected`
            : placeholder || "Select options"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            {options.map((opt) => (
              <CommandItem
                key={opt.value}
                onSelect={() => toggleValue(opt.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    values.includes(opt.value) ? "opacity-100" : "opacity-0"
                  )}
                />
                {opt.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
