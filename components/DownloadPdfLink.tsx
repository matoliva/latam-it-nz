'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function DownloadPdfLink() {
  const params = useParams();
  const lang = params.lang || 'es';

  return (
    <Link href={`/api/pdf?lang=${lang}`} className="text-blue-500 hover:underline">
      Descargar guía en PDF
    </Link>
  );
} 