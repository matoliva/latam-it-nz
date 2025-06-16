import Content from './content.mdx';
import ClientDownloadPdfLink from '@/components/ClientDownloadPdfLink';

export default async function ItJobGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-10 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="w-full">
          <Content />
        </div>
        <div className="md:ml-4 mt-4 md:mt-0 flex-shrink-0">
          <ClientDownloadPdfLink />
        </div>
      </div>
    </div>
  );
} 