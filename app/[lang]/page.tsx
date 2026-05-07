import { getDictionary } from '../../lib/dictionary';
import { i18n, Locale } from '../../i18n.config';
import AboutSection from '@/components/sections/about-sections';
import BookingSection from '@/components/sections/booking-section';
import MoreAboutSection from '@/components/sections/more-about-section';
import BuyMeCoffeeSection from '@/components/sections/buy-me-coffee-section';

interface Props {
  params: Promise<{
    lang: string;
  }>;
}

function toLocale(lang: string): Locale {
  return i18n.locales.includes(lang as Locale) ? (lang as Locale) : i18n.defaultLocale;
}

export default async function Home({ params }: Props) {
  const { lang: routeLang } = await params;
  const lang = toLocale(routeLang);
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <AboutSection lang={lang} />
        <BookingSection translations={dict} />
        <BuyMeCoffeeSection translations={dict} />
        <MoreAboutSection lang={lang} />
      </div>
    </div>
  );
} 
