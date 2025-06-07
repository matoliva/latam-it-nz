'use client';

import BuyMeCoffeeButton from "@/components/buy-me-coffee-button";

interface BuyMeCoffeeSectionProps {
    translations: {
        buyMeCoffee: {
            title: string;
            description: string;
        };
    };
}

export default function BuyMeCoffeeSection({ translations }: BuyMeCoffeeSectionProps) {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        {translations.buyMeCoffee.title}
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {translations.buyMeCoffee.description}
                    </p>
                    <div className="flex justify-center">
                        <BuyMeCoffeeButton variant="section" />
                    </div>
                </div>
            </div>
        </section>
    );
} 