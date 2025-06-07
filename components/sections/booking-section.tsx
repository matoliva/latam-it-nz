'use client';

import { Locale } from "@/i18n.config";
import dynamic from 'next/dynamic';

import BuyMeCoffeeButton from "@/components/buy-me-coffee-button";


const CalendlyWidget = dynamic(
  () => import('@/components/sections/calendly-widget'),
  { ssr: false }
);

interface BookingSectionProps {
    lang: Locale;
    translations: {
        booking: {
            title: string;
            description: string;
            scheduleButton: string;
        };
    };
}

export default function BookingSection({ lang, translations }: BookingSectionProps) {
    return (
        <section id="booking" className="py-16 md:py-24 bg-muted/50">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                        {translations.booking.title}
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                        <p className="text-xl text-muted-foreground">
                            {translations.booking.description}
                        </p>
                        <BuyMeCoffeeButton />
                    </div>
                    <CalendlyWidget />
                </div>
            </div>
        </section>
    );
} 