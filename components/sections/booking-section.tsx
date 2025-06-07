'use client';

import dynamic from 'next/dynamic';

const CalendlyWidget = dynamic(
    () => import('@/components/sections/calendly-widget'),
    { ssr: false }
);

interface BookingSectionProps {
    translations: {
        booking: {
            title: string;
            description: string;
            scheduleButton: string;
        };
    };
}

export default function BookingSection({ translations }: BookingSectionProps) {
    return (
        <section id="booking" className="py-16 bg-muted/30">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center space-y-8 mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                            {translations.booking.title}
                        </h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                {translations.booking.description}
                            </p>
                        </div>
                    </div>
                    <div className="bg-background rounded-2xl shadow-lg md:p-8">
                        <CalendlyWidget />
                    </div>
                </div>
            </div>
        </section>
    );
} 