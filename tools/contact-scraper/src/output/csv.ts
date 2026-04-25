import { createWriteStream, type WriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { ScrapeResult } from '../types.ts';

// Standard columns (always present, in this order). Passthrough columns
// from the input source are appended after these.
export const STANDARD_COLUMNS = [
  'operator_id',
  'operator_name',
  'website',
  'email_primary',
  'email_all',
  'phone_primary',
  'phone_all',
  'contact_form_url',
  'linkedin',
  'facebook',
  'instagram',
  'twitter',
  'youtube',
  'source_pages_checked',
  'status',
  'notes',
  'scraped_at',
] as const;

// RFC 4180 escaping: wrap any cell containing comma, quote, CR or LF in
// double quotes; escape inner quotes by doubling.
function escapeCell(value: string): string {
  if (value === '') return '';
  if (/[",\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function formatList(values: string[]): string {
  return values.join('; ');
}

export function buildRow(
  result: ScrapeResult,
  passthroughKeys: string[],
  passthrough: Record<string, string> | undefined,
): string[] {
  const standard: string[] = [
    result.id,
    result.name,
    result.website,
    result.emailPrimary,
    formatList(result.emailAll),
    result.phonePrimary,
    formatList(result.phoneAll),
    result.contactFormUrl,
    result.linkedin,
    result.facebook,
    result.instagram,
    result.twitter,
    result.youtube,
    formatList(result.sourcePagesChecked),
    result.status,
    result.notes,
    result.scrapedAt,
  ];
  for (const k of passthroughKeys) {
    standard.push(passthrough?.[k] ?? '');
  }
  return standard;
}

export class CsvWriter {
  private stream: WriteStream | null = null;
  private headerWritten = false;

  constructor(
    private readonly filePath: string,
    private readonly passthroughKeys: string[],
  ) {}

  async open(): Promise<void> {
    await mkdir(path.dirname(this.filePath), { recursive: true });
    // Append mode so a re-run with the same file path adds rows rather
    // than truncating. The CLI rotates filenames per run anyway, but this
    // keeps the writer safe under any re-entry.
    this.stream = createWriteStream(this.filePath, { flags: 'a' });
  }

  private writeLine(cells: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.stream) {
        reject(new Error('CsvWriter.open() must be called before write'));
        return;
      }
      const line = cells.map(escapeCell).join(',') + '\n';
      this.stream.write(line, (err) => (err ? reject(err) : resolve()));
    });
  }

  async writeHeader(): Promise<void> {
    if (this.headerWritten) return;
    const header = [...STANDARD_COLUMNS, ...this.passthroughKeys];
    await this.writeLine(header);
    this.headerWritten = true;
  }

  async writeResult(
    result: ScrapeResult,
    passthrough: Record<string, string> | undefined,
  ): Promise<void> {
    if (!this.headerWritten) await this.writeHeader();
    await this.writeLine(buildRow(result, this.passthroughKeys, passthrough));
  }

  async close(): Promise<void> {
    if (!this.stream) return;
    await new Promise<void>((resolve) => this.stream!.end(resolve));
    this.stream = null;
  }
}

export function defaultOutputPath(rootDir: string): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const stamp =
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
    `-${pad(now.getHours())}${pad(now.getMinutes())}`;
  return path.join(rootDir, 'output', `contacts-${stamp}.csv`);
}
