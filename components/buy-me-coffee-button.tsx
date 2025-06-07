'use client';

import Image from 'next/image';

import myImage from '@/public/images/bmc-button.png';

export default function BuyMeCoffeeButton() {
  return (
    <a
      href="https://www.buymeacoffee.com/matiasoliva"
      target="_blank"
      rel="noopener noreferrer"
      className="p-0 bg-transparent border-none cursor-pointer transform transition-transform duration-200 hover:scale-105"
      aria-label="Buy me a coffee"
    >
      <Image 
        src={myImage}
        alt="Buy Me a Coffee"
        width={250} // Increased width
        height={70} // Increased height proportionally
      />
    </a>
  );
} 