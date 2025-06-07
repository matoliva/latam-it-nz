'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LanguageSelector } from './language-selector';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Locale } from '@/i18n.config';

import logo from '@/public/images/logo.png';

interface HeaderProps {
  lang: Locale;
  translations: {
    navigation: {
      about: string;
      bookSession: string;
      openPositions: string;
    };
  };
}

export function Header({ lang, translations }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: translations.navigation.bookSession, href: '#booking' },
    { name: translations.navigation.about, href: '#more-info' },
    // { name: translations.navigation.openPositions, href: '#positions' },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo or site name */}
            <div className="flex-shrink-0">
              <Link href={`/${lang}`} className="text-xl font-bold flex items-center gap-2">
                <Image 
                  src={logo} 
                  alt="Latam IT NZ Logo" 
                  width={30} 
                  height={30} 
                  className="inline-block dark:invert"
                />
                Latam IT NZ
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-6">
              <ThemeToggle />
              <LanguageSelector lang={lang} />
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-10 w-10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="h-8 w-8" />
                ) : (
                  <Menu className="h-8 w-8" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Semi-transparent background */}
        <div className="absolute inset-0 -z-10 bg-background/80 backdrop-blur-sm" />
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[90] md:hidden',
          'transition-all duration-300 ease-in-out',
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-background/95 backdrop-blur-sm',
            'transition-opacity duration-300 ease-in-out',
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* Menu content */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center',
            'transition-transform duration-300 ease-in-out',
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          )}
          onClick={(e) => e.stopPropagation()} // Prevent clicks from closing the menu
        >
          <nav className="flex flex-col items-center space-y-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-3xl font-medium transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
} 