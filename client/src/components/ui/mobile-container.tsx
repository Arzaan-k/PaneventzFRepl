import { cn } from "@/lib/utils";
import React from "react";

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * A container component that provides consistent padding and max-width
 * for mobile-first designs across the application
 */
export function MobileContainer({
  children,
  className,
  as: Component = "div",
}: MobileContainerProps) {
  return (
    <Component
      className={cn(
        "w-full px-4 sm:px-6 md:px-8 mx-auto max-w-7xl",
        className
      )}
    >
      {children}
    </Component>
  );
}