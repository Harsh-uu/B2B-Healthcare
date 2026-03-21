"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-md">
        <AlertTriangle size={48} className="mx-auto text-danger mb-4" />
        <h2 className="text-xl font-semibold text-text mb-2">Something went wrong</h2>
        <p className="text-text-secondary mb-6">{error.message || "An unexpected error occurred."}</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
