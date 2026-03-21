import { PatientStatus } from "@/types";

interface BadgeProps {
  status: PatientStatus;
  className?: string;
}

const statusStyles: Record<PatientStatus, string> = {
  Stable: "bg-success-light text-success border-green-200",
  Moderate: "bg-warning-light text-warning border-amber-200",
  Critical: "bg-danger-light text-danger border-red-200",
};

const dotStyles: Record<PatientStatus, string> = {
  Stable: "bg-success",
  Moderate: "bg-warning",
  Critical: "bg-danger",
};

export function Badge({ status, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </span>
  );
}
