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
        <section id="about" className="pt-16 pb-16">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            {dict.about.title}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            {dict.about.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" asChild>
                                <a href="#booking">{dict.about.bookConsultation}</a>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <a href="#positions">{dict.about.viewPositions}</a>
                            </Button>
                        </div>
                    </div>
                    <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                        <Image
                            src={myImage}
                            alt={dict.about.imageAlt}
                            width={500}
                            height={500}
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
