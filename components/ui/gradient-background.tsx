'use client';

import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientBackground({ children, className }: GradientBackgroundProps) {
  return (
    <div className={cn("min-h-screen w-full bg-background relative overflow-hidden", className)}>
      {/* Grid with Golden Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(251, 213, 45, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(251, 213, 45, 0.15) 1px, transparent 1px),
            radial-gradient(circle 800px at 0% 100px, rgba(251, 213, 45, 0.2), transparent),
            radial-gradient(circle 800px at 100% 100px, rgba(251, 213, 45, 0.2), transparent)
          `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%, 100% 100%",
          opacity: 0.7
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
