'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

import myImage from '@/public/images/bmc-button.png';

interface BuyMeCoffeeButtonProps {
  variant?: 'header' | 'footer' | 'section';
}

export default function BuyMeCoffeeButton({ variant = 'footer' }: BuyMeCoffeeButtonProps) {
  const dimensions = {
    header: { width: 120, height: 35 },
    footer: { width: 180, height: 50 },
    section: { width: 250, height: 70 }  // Larger size for the dedicated section
  };

  const { width, height } = dimensions[variant];

  return (
    <a
      href="https://www.buymeacoffee.com/matiasoliva"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "p-0 bg-transparent border-none cursor-pointer transform transition-transform duration-200 hover:scale-105",
        variant === 'header' && "scale-90"
      )}
      aria-label="Buy me a coffee"
    >
      <Image 
        src={myImage}
        alt="Buy Me a Coffee"
        width={width}
        height={height}
      />
    </a>
  );
} 