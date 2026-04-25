import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { ScrapeStatus } from '../types.ts';

interface CompletedEntry {
  status: ScrapeStatus;
  scrapedAt: string;
}

interface ProgressFile {
  version: 1;
  startedAt: string;
  lastUpdatedAt: string;
  completed: Record<string, CompletedEntry>;
}

export class ProgressStore {
  private state: ProgressFile;
  private dirty = false;

  private constructor(
    private readonly filePath: string,
    state: ProgressFile,
  ) {
    this.state = state;
  }

  static async load(filePath: string, force: boolean): Promise<ProgressStore> {
    const fresh: ProgressFile = {
      version: 1,
      startedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      completed: {},
    };
    if (force) {
      return new ProgressStore(filePath, fresh);
    }
    try {
      const raw = await readFile(filePath, 'utf8');
      const parsed = JSON.parse(raw) as ProgressFile;
      if (parsed.version !== 1 || typeof parsed.completed !== 'object') {
        throw new Error('progress.json shape mismatch; treating as fresh');
      }
      return new ProgressStore(filePath, parsed);
    } catch {
      return new ProgressStore(filePath, fresh);
    }
  }

  has(id: string): boolean {
    return Object.hasOwn(this.state.completed, id);
  }

  size(): number {
    return Object.keys(this.state.completed).length;
  }

  mark(id: string, status: ScrapeStatus, scrapedAt: string): void {
    this.state.completed[id] = { status, scrapedAt };
    this.state.lastUpdatedAt = new Date().toISOString();
    this.dirty = true;
  }

  async flush(): Promise<void> {
    if (!this.dirty) return;
    await mkdir(path.dirname(this.filePath), { recursive: true });
    // Atomic write: temp file + rename so an interrupted save can't
    // leave a half-written progress file that breaks the next resume.
    const tmp = `${this.filePath}.tmp`;
    await writeFile(tmp, JSON.stringify(this.state, null, 2), 'utf8');
    const { rename } = await import('node:fs/promises');
    await rename(tmp, this.filePath);
    this.dirty = false;
  }
}
