import PDFDocument from 'pdfkit';
import { getLongestWords } from '../utils/text-utils';
import { Response } from 'express';
import puppeteer from 'puppeteer';
import path from 'path';

export async function extractTextFromUrl(url: string): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const text = await page.evaluate(() => document.body.innerText);

  await browser.close();

  return text;
}

export async function generatePdfFromUrl(
  url: string,
  res: Response
): Promise<void> {
  const text = await extractTextFromUrl(url);
  const words = getLongestWords(text, 10);
  const fontPath = path.resolve(__dirname, '../../fonts/DejaVuSans.ttf');
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="document.pdf"');

  doc.pipe(res);

  doc
    .font(fontPath)
    .fontSize(16)
    .text('Top 10 longest words:', { underline: true });

  words.forEach((word: string, index: number) => {
    doc
      .font(fontPath)
      .moveDown()
      .fontSize(14)
      .text(`${index + 1}. ${word.toLowerCase()}`);
  });

  doc.end();
}
