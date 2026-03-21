"use client";

interface ToggleOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface ToggleProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Toggle({ options, value, onChange, className = "" }: ToggleProps) {
  return (
    <div className={`inline-flex border border-border bg-white ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
            value === option.value
              ? "bg-primary text-white"
              : "text-text-secondary hover:bg-gray-50 hover:text-text"
          }`}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}
