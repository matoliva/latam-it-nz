import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'es';

  const isVercel = process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview';

  let browser;
  try {
    if (isVercel) {
      // Vercel deployment: use @sparticuz/chromium
      browser = await puppeteer.launch({
        args: [...chromium.args, '--hide-scrollbars', '--mute-audio'],
        executablePath: await chromium.executablePath(),
        headless: true,
        defaultViewport: {
          width: 1280,
          height: 720,
          deviceScaleFactor: 1,
        },
      });
    } else {
      // Local development: try to find local Chrome/Chromium
      // This path is common for Chrome on macOS. Users might need to adjust this.
      const localExecutablePath = process.env.PUPPETEER_EXECUTABLE_PATH ||
                                  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; // Common macOS path

      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Recommended args for local as well
        executablePath: localExecutablePath,
        headless: true,
      });
    }

    const page = await browser.newPage();

    const baseUrl = request.nextUrl.origin;
    const url = `${baseUrl}/${lang}/it-job-guide/print`;
    await page.goto(url, { waitUntil: 'networkidle0' });

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
        'Content-Disposition': 'attachment; filename="guia-trabajo-it-nz.pdf"',
      },
    });
  } catch (error) {
    const errorMessage = isVercel 
      ? `PDF generation failed on Vercel: ${error instanceof Error ? error.message : String(error)}`
      : `PDF generation failed on local: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMessage);
    return new NextResponse(errorMessage, { status: 500 });
  }
} 