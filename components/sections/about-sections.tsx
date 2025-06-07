import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/dictionary"
import { Locale } from "@/i18n.config"

import myImage from '@/public/images/IMG_2661.webp';

interface AboutSectionProps {
    lang: Locale;
}

export default async function AboutSection({ lang }: AboutSectionProps) {
    const dict = await getDictionary(lang);

    return (
        <section id="about" className="py-24 md:py-32 bg-background">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                            {dict.about.title}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {dict.about.description}
                        </p>
                        <div className="flex flex-wrap gap-6 pt-4">
                            <Button size="lg" className="px-8" asChild>
                                <a href="#booking">{dict.about.bookConsultation}</a>
                            </Button>
                            <Button size="lg" variant="outline" className="px-8" asChild>
                                <a href="#positions">{dict.about.viewPositions}</a>
                            </Button>
                        </div>
                    </div>
                    <div className="relative h-[450px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={myImage}
                            alt={dict.about.imageAlt}
                            width={600}
                            height={600}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
