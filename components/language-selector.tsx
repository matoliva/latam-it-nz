'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { i18n } from '@/i18n.config';

const languages = {
  en: {
    name: 'English',
    flag: '🇳🇿'
  },
  es: {
    name: 'Español',
    flag: '🇦🇷'
  },
};

export function LanguageSelector({ lang }: { lang: string }) {
  const router = useRouter();

  const handleLanguageChange = (newLang: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span className="text-xl">{languages[lang as keyof typeof languages].flag}</span>
          <span className="hidden sm:inline-block">{languages[lang as keyof typeof languages].name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[200]">
        {i18n.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className={locale === lang ? 'bg-accent' : ''}
          >
            <span className="mr-2 text-xl">{languages[locale as keyof typeof languages].flag}</span>
            {languages[locale as keyof typeof languages].name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 