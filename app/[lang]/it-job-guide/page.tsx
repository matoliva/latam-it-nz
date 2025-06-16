import Content from './content.mdx';
import ClientDownloadPdfLink from '@/components/ClientDownloadPdfLink';

export default async function ItJobGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-10 pb-10">
      <div className="flex justify-end mb-6">
        <ClientDownloadPdfLink />
      </div>
      <div className="w-full">
        <Content />
      </div>
    </div>
  );
} 