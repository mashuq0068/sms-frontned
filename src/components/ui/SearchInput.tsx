import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "use-debounce";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  minChars?: number;
  className?: string;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  debounceMs = 1200,
  minChars = 3,
  className,
}) => {
  const [internalValue, setInternalValue] = React.useState(value);
  const [debouncedValue] = useDebounce(internalValue, debounceMs);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Trigger search when debounced value reaches minChars or input is empty
  React.useEffect(() => {
    if (debouncedValue.length >= minChars || debouncedValue === "") {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, minChars]);

  // Sync from parent only if input is not focused and value differs
  React.useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value, internalValue]);

  // Auto-focus only if input is empty (so typing doesn’t steal focus)
  React.useEffect(() => {
    if (inputRef.current && internalValue !== "") {
      inputRef.current.focus();
    }
  }, [internalValue]);

  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
