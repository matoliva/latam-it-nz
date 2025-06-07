'use client';

import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { Locale } from '@/i18n.config';

interface FooterProps {
  lang: Locale;
  translations: {
    footer: {
      rights: string;
      privacy: string;
      terms: string;
      description: string;
      quickLinks: string;
      connect: string;
      about: string;
      bookSession: string;
    };
  };
}

export function Footer({ lang, translations }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { footer } = translations;

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand and Description */}
            <div className="space-y-4">
              <Link href={`/${lang}`} className="text-xl font-bold">
                Latam IT NZ
              </Link>
              <p className="text-muted-foreground">
                {footer.description}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">
                {footer.quickLinks}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${lang}#more-info`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {footer.about}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}#booking`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {footer.bookSession}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">
                {footer.connect}
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/matiasoliva/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Latam IT NZ. {footer.rights}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 