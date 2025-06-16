import Content from './content.mdx';
import DownloadPdfLink from '@/components/DownloadPdfLink';

export default function ItJobGuidePage({ params }: { params: { lang: string } }) {
  const lang = params.lang || 'es';
  return (
    <div className="max-w-3xl mx-auto px-4 pt-10 pb-10">
      <div className="flex justify-end mb-4">
        <DownloadPdfLink lang={lang} />
      </div>
      <Content />
    </div>
  );
} 