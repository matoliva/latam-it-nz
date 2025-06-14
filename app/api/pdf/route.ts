import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'es';

  const isVercel = process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview';

  let browser;
  try {
    if (isVercel) {
      // Vercel deployment: use @sparticuz/chromium-min with direct executable path
      browser = await puppeteer.launch({
        args: [...chromium.args, '--hide-scrollbars', '--mute-audio'],
        executablePath: await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v137.0.0/chromium-v137.0.0-pack.x64.tar'),
        headless: true,
        defaultViewport: {
          width: 1280,
          height: 720,
          deviceScaleFactor: 1,
        },
      });
    } else {
      // Local development: try to find local Chrome/Chromium
      const localExecutablePath = process.env.PUPPETEER_EXECUTABLE_PATH ||
        (process.platform === 'darwin'
          ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
          : undefined); // Add other OS paths as needed

      browser = await puppeteer.launch({
        args: ['--hide-scrollbars', '--mute-audio'],
        executablePath: localExecutablePath,
        headless: true,
      });
    }

    const page = await browser.newPage();

    // Navigate to the print-specific job guide page.
    const baseUrl = request.nextUrl.origin;
    const url = `${baseUrl}/${lang}/it-job-guide/print`;
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.75in',
        right: '0.75in',
        bottom: '0.75in',
        left: '0.75in',
      },
    });

    await browser.close();

    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="job-guide.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 