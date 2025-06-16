'use client';

import dynamic from 'next/dynamic';

const DownloadPdfLink = dynamic(() => import('@/components/DownloadPdfLink'), { ssr: false });

export default function ClientDownloadPdfLink() {
  return <DownloadPdfLink />;
} 