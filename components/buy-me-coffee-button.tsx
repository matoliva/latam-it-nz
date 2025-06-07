'use client';

import Image from 'next/image';

import myImage from '@/public/images/bmc-button.png';

export default function BuyMeCoffeeButton() {
  return (
    <button
      onClick={() => window.open('https://www.buymeacoffee.com/matiasoliva', '_blank')}
      className="p-0 bg-transparent border-none cursor-pointer"
      aria-label="Buy me a coffee"
    >
      <Image 
        src={myImage}
        alt="Buy Me a Coffee"
        width={350} // Further increased width
        height={97} // Further increased height
      />
    </button>
  );
} 