import Content from './content.mdx';
import ClientDownloadPdfLink from '@/components/ClientDownloadPdfLink';

export default async function ItJobGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-10 pb-10">
      <Content />
      <div className="mt-10">
        <ClientDownloadPdfLink />
      </div>
    </div>
  );
} 