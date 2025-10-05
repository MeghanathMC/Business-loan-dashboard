'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Map of company codes to their logo file names
const logoMap: Record<string, string> = {
  'ab': '/ab.webp',
  'gc': '/gc.webp',
  'ps': '/ps.webp',
  'sg': '/sg.webp',
  'tf': '/tf.webp',
  'te': '/tf.webp', // TechForge Manufacturing
  'gr': '/gc.webp', // GreenLeaf Distribution Co
  'pr': '/ps.webp', // Precision Healthcare Services
  'su': '/sg.webp', // Summit Construction Group
};

interface CompanyLogoProps {
  code: string;
  alt?: string;
  className?: string;
  size?: number;
  fallbackText?: string;
}

export function CompanyLogo({ 
  code, 
  alt, 
  className, 
  size = 32,
  fallbackText
}: CompanyLogoProps) {
  // Convert code to lowercase for case-insensitive matching
  const lowerCode = code.toLowerCase();
  const logoSrc = logoMap[lowerCode];
  
  // If we have a logo for this code, render the image
  if (logoSrc) {
    return (
      <div className={cn('relative', className)} style={{ width: size, height: size }}>
        <Image
          src={logoSrc}
          alt={alt || `${code.toUpperCase()} logo`}
          width={size}
          height={size}
          className="rounded-md object-contain"
        />
      </div>
    );
  }
  
  // If no logo is found, render a fallback with the company initials
  const displayText = fallbackText || code.substring(0, 2).toUpperCase();
  
  // Generate a consistent background color based on the company code
  const getBackgroundColor = (code: string) => {
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-green-100 text-green-700',
      'bg-amber-100 text-amber-700',
      'bg-purple-100 text-purple-700',
      'bg-rose-100 text-rose-700',
      'bg-indigo-100 text-indigo-700',
      'bg-emerald-100 text-emerald-700',
      'bg-cyan-100 text-cyan-700',
    ];
    
    // Simple hash function to get a consistent color for each company
    const charSum = code.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };
  
  return (
    <div 
      className={cn(
        'flex items-center justify-center rounded-md font-semibold', 
        getBackgroundColor(code),
        className
      )}
      style={{ width: size, height: size }}
    >
      <span className="text-xs">{displayText}</span>
    </div>
  );
}

// Helper function to get company code from name
export function getCompanyCodeFromName(name: string): string {
  // Handle specific company names from the application
  if (name.includes('TechForge')) return 'te';
  if (name.includes('GreenLeaf')) return 'gr';
  if (name.includes('Precision Healthcare')) return 'pr';
  if (name.includes('Summit Construction')) return 'su';
  
  // Extract initials from company name for other cases
  const words = name.split(' ');
  
  if (words.length >= 2) {
    // If multiple words, use first letter of first two words
    return (words[0][0] + words[1][0]).toLowerCase();
  } else if (words.length === 1 && words[0].length >= 2) {
    // If single word, use first two letters
    return words[0].substring(0, 2).toLowerCase();
  } else {
    // Fallback
    return 'co';
  }
}
