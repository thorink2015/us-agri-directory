import { readFile } from 'node:fs/promises';
import type { InputRow, SourceLoader } from '../types.ts';

interface RawJsonRow {
  id?: string;
  slug?: string;
  name?: string;
  website?: string;
  url?: string;
  [key: string]: unknown;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

export class JsonSource implements SourceLoader {
  constructor(private readonly filePath: string) {}

  async load(): Promise<InputRow[]> {
    const text = await readFile(this.filePath, 'utf8');
    const data: unknown = JSON.parse(text);
    if (!Array.isArray(data)) {
      throw new Error(
        `JSON source ${this.filePath} must be an array of objects`,
      );
    }
    return (data as RawJsonRow[]).map((entry) => {
      const name = (entry.name ?? '').trim();
      if (!name) {
        throw new Error(
          `JSON source ${this.filePath}: every entry must have a "name" field`,
        );
      }
      const id = (entry.id ?? entry.slug ?? slugify(name)).toString();
      const website = (entry.website ?? entry.url ?? '').toString().trim();
      const reserved = new Set(['id', 'slug', 'name', 'website', 'url']);
      const passthrough: Record<string, string> = {};
      for (const [k, v] of Object.entries(entry)) {
        if (reserved.has(k)) continue;
        if (v === null || v === undefined) continue;
        passthrough[k] = typeof v === 'string' ? v : JSON.stringify(v);
      }
      return { id, name, website: website || undefined, passthrough };
    });
  }
}
