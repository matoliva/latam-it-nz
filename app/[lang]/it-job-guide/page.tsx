import Content from './content.mdx';
import DownloadPdfLink from '@/components/DownloadPdfLink';

export default function ItJobGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-10 pb-10">
      <div className="flex justify-end mb-4">
        <DownloadPdfLink />
      </div>
      <Content />
    </div>
  );
} 