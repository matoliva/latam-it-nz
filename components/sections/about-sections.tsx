import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/dictionary"
import { Locale } from "@/i18n.config"

interface AboutSectionProps {
    lang: Locale;
}

export default async function AboutSection({ lang }: AboutSectionProps) {
    const dict = await getDictionary(lang);

    return (
        <section id="about" className="py-16 pt-32 bg-background">
            <div className="container px-6 mx-auto max-w-3xl">
                <div className="space-y-10 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                        {dict.about.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {dict.about.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 pt-6">
                        <Button size="lg" className="px-10" asChild>
                            <a href="#booking">{dict.about.bookConsultation}</a>
                        </Button>
                        <Button size="lg" variant="outline" className="px-10" asChild>
                            <a href="#more-info">{dict.about.moreAboutMe}</a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
