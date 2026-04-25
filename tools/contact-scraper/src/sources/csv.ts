import { readFile } from 'node:fs/promises';
import type { InputRow, SourceLoader } from '../types.ts';

// Minimal CSV parser. Handles quoted fields, escaped quotes ("") and
// embedded newlines inside quotes. Sufficient for hand-written research
// CSVs; not a general purpose RFC 4180 implementation.
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(field);
        field = '';
      } else if (ch === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else if (ch === '\r') {
        // swallow; handled by \n
      } else {
        field += ch;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

export class CsvSource implements SourceLoader {
  constructor(private readonly filePath: string) {}

  async load(): Promise<InputRow[]> {
    const text = await readFile(this.filePath, 'utf8');
    const rows = parseCsv(text);
    if (rows.length === 0) return [];

    const header = rows[0]!.map((h) => h.trim().toLowerCase());
    const idIdx = header.indexOf('id');
    const slugIdx = header.indexOf('slug');
    const nameIdx = header.indexOf('name');
    const websiteIdx = header.findIndex((h) =>
      ['website', 'url', 'site', 'homepage'].includes(h),
    );
    if (nameIdx === -1) {
      throw new Error(
        `CSV at ${this.filePath} must have a "name" column. Got: ${header.join(', ')}`,
      );
    }

    return rows.slice(1).map((cols) => {
      const name = (cols[nameIdx] ?? '').trim();
      const idCol = idIdx !== -1 ? cols[idIdx] : slugIdx !== -1 ? cols[slugIdx] : '';
      const id = (idCol && idCol.trim()) || slugify(name);
      const website = websiteIdx !== -1 ? (cols[websiteIdx] ?? '').trim() : '';
      const passthrough: Record<string, string> = {};
      header.forEach((h, i) => {
        if (i === idIdx || i === nameIdx || i === websiteIdx || i === slugIdx) return;
        passthrough[h] = (cols[i] ?? '').trim();
      });
      return { id, name, website: website || undefined, passthrough };
    });
  }
}
