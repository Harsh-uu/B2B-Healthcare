import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ children, className = "", hover, ...props }: CardProps) {
  return (
    <div
      className={`bg-surface border border-border p-5 ${
        hover ? "transition-shadow duration-200 hover:shadow-md cursor-pointer" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-sm font-semibold text-text uppercase tracking-wide ${className}`} {...props}>
      {children}
    </h3>
  );
}
