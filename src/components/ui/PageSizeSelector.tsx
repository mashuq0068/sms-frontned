import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PageSizeSelectorProps = {
  pageSize: number;
  onChange: (size: number) => void;
  options?: number[]; // default [20, 50, 100, 1000]
};

export const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  onChange,
  options = [20, 50, 100, 1000],
}) => {
  // Find index of current page size
  const currentIndex = options.indexOf(pageSize);

  const handlePrev = () => {
    if (currentIndex > 0) onChange(options[currentIndex - 1]);
  };

  const handleNext = () => {
    if (currentIndex < options.length - 1) onChange(options[currentIndex + 1]);
  };

  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      {/* Left Arrow */}
      <Button
        size="icon"
        variant="outline"
        className="w-10 h-10"
        onClick={handlePrev}
        disabled={currentIndex <= 0}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* Page Size Buttons */}
      {options.map((size) => (
        <Button
          key={size}
          size="icon"
          variant={pageSize === size ? "default" : "outline"}
          className={cn("w-10 h-10 text-sm")}
          onClick={() => onChange(size)}
        >
          {size}
        </Button>
      ))}

      {/* Right Arrow */}
      <Button
        size="icon"
        variant="outline"
        className="w-10 h-10"
        onClick={handleNext}
        disabled={currentIndex >= options.length - 1}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};
