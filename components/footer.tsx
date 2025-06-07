'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Locale } from '@/i18n.config';
import { useEffect } from 'react';

interface FooterProps {
  lang: Locale;
  translations: {
    footer?: {
      rights?: string;
      privacy?: string;
      terms?: string;
    };
  };
}

export function Footer({ lang, translations }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const footer = translations.footer || {};

  // Debug translations
  useEffect(() => {
    console.log('Footer translations:', translations);
    console.log('Current language:', lang);
  }, [translations, lang]);

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
                {lang === 'es' 
                  ? 'Tu guía para oportunidades IT en Nueva Zelanda'
                  : 'Your guide to IT opportunities in New Zealand'
                }
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">
                {lang === 'es' ? 'Enlaces Rápidos' : 'Quick Links'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${lang}#about`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {lang === 'es' ? 'Sobre Mí' : 'About'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}#booking`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {lang === 'es' ? 'Agendar Sesión' : 'Book a Session'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}#positions`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {lang === 'es' ? 'Posiciones Abiertas' : 'Open Positions'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">
                {lang === 'es' ? 'Conectar' : 'Connect'}
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/matiasoliva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/matiasoliva/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:matias@latamit.nz"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Latam IT NZ. {footer.rights || (lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.')}
              </p>
              <div className="flex gap-6">
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {footer.privacy || (lang === 'es' ? 'Política de Privacidad' : 'Privacy Policy')}
                </Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {footer.terms || (lang === 'es' ? 'Términos de Servicio' : 'Terms of Service')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 