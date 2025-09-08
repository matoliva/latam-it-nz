import Image from "next/image"
import { getDictionary } from "@/lib/dictionary"
import { Locale } from "@/i18n.config"

import profileImage from '@/public/images/about-me.webp';

interface MoreAboutSectionProps {
    lang: Locale;
}

export default async function MoreAboutSection({ lang }: MoreAboutSectionProps) {
    const dict = await getDictionary(lang);

    return (
        <section id="more-info" className="py-16 bg-muted/30">
            <div className="container px-6 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-[4/3] md:aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
                        <Image
                            src={profileImage}
                            alt={dict.moreAbout.imageAlt}
                            width={2016}
                            height={1512}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover w-full h-full"
                            priority
                            quality={85}
                        />
                    </div>
                    <div className="space-y-8 order-1 md:order-2">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
                            {dict.moreAbout.title}
                        </h2>
                        <div className="space-y-4 text-lg text-muted-foreground text-center">
                            <p>{dict.moreAbout.description1}</p>
                            <p>{dict.moreAbout.description2}</p>
                            <p>{dict.moreAbout.description3}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 