import puppeteer from 'puppeteer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'es'; // Default to 'es' if lang is not provided
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Navigate to the job guide page. Adjust the URL as per your application's routing.
  // Assuming your application runs on http://localhost:3000 during development.
  const url = `http://localhost:3000/${lang}/it-job-guide`;
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Generate PDF
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  return new NextResponse(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="guia-trabajo-it-nz.pdf"',
    },
  });
} 