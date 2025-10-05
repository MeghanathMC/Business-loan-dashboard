'use client';

import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export function Footer() {
  return (
    <footer className="border-t bg-[#1a1d21] text-gray-300">
      {/* Navigation Links */}

      {/* Main Logo Effect */}
      <div className="container mx-auto px-6 py-16 flex items-center justify-center overflow-hidden">
        <div className="h-48 w-full max-w-5xl">
          <TextHoverEffect 
            text="ZENALYST" 
            className="opacity-100 transition-all duration-300" 
          />
        </div>
      </div>
    </footer>
  );
}
