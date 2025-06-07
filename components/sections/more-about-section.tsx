import Image from "next/image"
import { getDictionary } from "@/lib/dictionary"
import { Locale } from "@/i18n.config"

import profileImage from '@/public/images/me.jpg';

interface MoreAboutSectionProps {
    lang: Locale;
}

export default async function MoreAboutSection({ lang }: MoreAboutSectionProps) {
    const dict = await getDictionary(lang);

    return (
        <section id="more-info" className="md:py-24 lg:py-32 bg-muted/30">
            <div className="container px-6 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
                        <Image
                            src={profileImage}
                            alt={dict.moreAbout.imageAlt}
                            width={500}
                            height={500}
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>
                    <div className="space-y-8 order-1 md:order-2">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            {dict.moreAbout.title}
                        </h2>
                        <div className="space-y-4 text-lg text-muted-foreground">
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