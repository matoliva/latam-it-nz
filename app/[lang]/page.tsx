import { getDictionary } from '../../lib/dictionary';
import { Locale } from '../../i18n.config';
import AboutSection from '@/components/sections/about-sections';
import BookingSection from '@/components/sections/booking-section';

interface Props {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-col items-center">
      <div className="w-full">
        <AboutSection lang={lang} />
        <BookingSection lang={lang} translations={dict} />
      </div>
    </main>
  );
} 