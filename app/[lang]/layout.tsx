import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { i18n, Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] });

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

function toLocale(lang: string): Locale {
  return i18n.locales.includes(lang as Locale) ? (lang as Locale) : i18n.defaultLocale;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: routeLang } = await params;
  const lang = toLocale(routeLang);
  
  const metadata: Record<Locale, Metadata> = {
    en: {
      title: "Latam IT NZ | A chat about tech in New Zealand",
      description: "A simple free chat with Matías about finding your first tech job in New Zealand.",
      keywords: "IT jobs New Zealand, Latin American tech jobs, NZ tech industry, tech career NZ, Latin American developers NZ, tech jobs NZ",
      authors: [{ name: "Matías Oliva" }],
      creator: "Matías Oliva",
      publisher: "Latam IT NZ",
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL('https://latamitnz.com'),
      alternates: {
        canonical: '/en',
        languages: {
          'en': '/en',
          'es': '/es',
        },
      },
      openGraph: {
        type: 'website',
        locale: 'en_US',
        alternateLocale: 'es_ES',
        url: 'https://latamitnz.com/en',
        title: 'Latam IT NZ | A chat about tech in New Zealand',
        description: 'A simple free chat with Matías about finding your first tech job in New Zealand.',
        siteName: 'Latam IT NZ',
        images: [
          {
            url: '/images/logo.png',
            width: 1200,
            height: 630,
            alt: 'Latam IT NZ Logo',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Latam IT NZ | A chat about tech in New Zealand',
        description: 'A simple free chat with Matías about finding your first tech job in New Zealand.',
        creator: '@matoliva',
        images: ['/images/logo.png'],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      icons: {
        icon: '/favicon.ico',
      },
      verification: {
        google: 'your-google-site-verification',
      },
    },
    es: {
      title: "Latam IT NZ | Charlemos sobre IT en Nueva Zelanda",
      description: "Una charla gratis y simple con Matías sobre cómo buscar tu primer laburo IT en Nueva Zelanda.",
      keywords: "trabajos IT Nueva Zelanda, empleos tecnológicos latinoamericanos, industria tecnológica NZ, carrera tecnológica NZ, desarrolladores latinoamericanos NZ, laburo IT NZ",
      authors: [{ name: "Matías Oliva" }],
      creator: "Matías Oliva",
      publisher: "Latam IT NZ",
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL('https://latamitnz.com'),
      alternates: {
        canonical: '/es',
        languages: {
          'es': '/es',
          'en': '/en',
        },
      },
      openGraph: {
        type: 'website',
        locale: 'es_ES',
        alternateLocale: 'en_US',
        url: 'https://latamitnz.com/es',
        title: 'Latam IT NZ | Charlemos sobre IT en Nueva Zelanda',
        description: 'Una charla gratis y simple con Matías sobre cómo buscar tu primer laburo IT en Nueva Zelanda.',
        siteName: 'Latam IT NZ',
        images: [
          {
            url: '/images/logo.png',
            width: 1200,
            height: 630,
            alt: 'Latam IT NZ Logo',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Latam IT NZ | Charlemos sobre IT en Nueva Zelanda',
        description: 'Una charla gratis y simple con Matías sobre cómo buscar tu primer laburo IT en Nueva Zelanda.',
        creator: '@matoliva',
        images: ['/images/logo.png'],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      icons: {
        icon: '/favicon.ico',
      },
      verification: {
        google: 'your-google-site-verification',
      },
    }
  };

  return metadata[lang];
}

export default async function RootLayout({
  children,
  params
}: Props) {
  const { lang: routeLang } = await params;
  const lang = toLocale(routeLang);
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta name="permissions-policy" content="payment=()" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body 
        className={cn("min-h-screen flex flex-col bg-background font-sans antialiased", inter.className)}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header lang={lang} translations={dictionary} />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer lang={lang} translations={dictionary} />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
} 
