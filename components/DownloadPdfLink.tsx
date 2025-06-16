'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react";

export default function DownloadPdfLink({ lang = 'es' }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/pdf?lang=${lang}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'guia-trabajo-it-nz.pdf'; // Ensure the filename matches your server response
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Clean up the object URL
      } else {
        console.error('Failed to download PDF', response.statusText);
        alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error during PDF download:', error);
      alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      className="cursor-pointer w-48"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generando PDF...
        </>
      ) : (
        'Descargar guía en PDF'
      )}
    </Button>
  );
} 