import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

const inter = Inter({ subsets: ['latin'] });

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  const metadata: Record<Locale, Metadata> = {
    en: {
      title: "Latam IT NZ | Your Guide to IT Jobs in New Zealand",
      description: "Expert guidance for Latin American IT professionals looking to work in New Zealand. Get personalized advice on job search, visa processes, and career development.",
      keywords: "IT jobs New Zealand, Latin American tech jobs, NZ tech industry, IT recruitment NZ, tech career NZ, Latin American developers NZ",
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
        title: 'Latam IT NZ | Your Guide to IT Jobs in New Zealand',
        description: 'Expert guidance for Latin American IT professionals looking to work in New Zealand. Get personalized advice on job search, visa processes, and career development.',
        siteName: 'Latam IT NZ',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Latam IT NZ | Your Guide to IT Jobs in New Zealand',
        description: 'Expert guidance for Latin American IT professionals looking to work in New Zealand. Get personalized advice on job search, visa processes, and career development.',
        creator: '@matiasoliva',
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
      title: "Latam IT NZ | Tu Guía para Trabajar en IT en Nueva Zelanda",
      description: "Guía experta para profesionales latinoamericanos de IT que buscan trabajar en Nueva Zelanda. Obtén asesoramiento personalizado sobre búsqueda de trabajo, procesos de visa y desarrollo profesional.",
      keywords: "trabajos IT Nueva Zelanda, empleos tecnológicos latinoamericanos, industria tecnológica NZ, reclutamiento IT NZ, carrera tecnológica NZ, desarrolladores latinoamericanos NZ",
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
          'en': '/en',
          'es': '/es',
        },
      },
      openGraph: {
        type: 'website',
        locale: 'es_ES',
        alternateLocale: 'en_US',
        url: 'https://latamitnz.com/es',
        title: 'Latam IT NZ | Tu Guía para Trabajar en IT en Nueva Zelanda',
        description: 'Guía experta para profesionales latinoamericanos de IT que buscan trabajar en Nueva Zelanda. Obtén asesoramiento personalizado sobre búsqueda de trabajo, procesos de visa y desarrollo profesional.',
        siteName: 'Latam IT NZ',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Latam IT NZ | Tu Guía para Trabajar en IT en Nueva Zelanda',
        description: 'Guía experta para profesionales latinoamericanos de IT que buscan trabajar en Nueva Zelanda. Obtén asesoramiento personalizado sobre búsqueda de trabajo, procesos de visa y desarrollo profesional.',
        creator: '@matiasoliva',
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
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta name="permissions-policy" content="payment=()" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body 
        className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header lang={lang} translations={dictionary} />
          {children}
          <Footer lang={lang} translations={dictionary} />
        </ThemeProvider>
        <script async data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="matiasoliva" data-description="Support me on Buy me a coffee!" data-message="" data-color="#FD0" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
      </body>
    </html>
  );
} 