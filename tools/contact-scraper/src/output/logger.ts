import { createWriteStream, type WriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

type Level = 'info' | 'warn' | 'error';

export class Logger {
  private stream: WriteStream | null = null;

  constructor(private readonly filePath: string) {}

  async open(): Promise<void> {
    await mkdir(path.dirname(this.filePath), { recursive: true });
    this.stream = createWriteStream(this.filePath, { flags: 'a' });
  }

  private write(level: Level, msg: string): void {
    const line = `${new Date().toISOString()} ${level.toUpperCase()} ${msg}\n`;
    // Live progress to stdout for the human running the script.
    if (level === 'error') process.stderr.write(line);
    else process.stdout.write(line);
    this.stream?.write(line);
  }

  info(msg: string): void {
    this.write('info', msg);
  }
  warn(msg: string): void {
    this.write('warn', msg);
  }
  error(msg: string): void {
    this.write('error', msg);
  }

  async close(): Promise<void> {
    if (!this.stream) return;
    await new Promise<void>((resolve) => this.stream!.end(resolve));
    this.stream = null;
  }
}

export function defaultLogPath(rootDir: string): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const stamp =
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
    `-${pad(now.getHours())}${pad(now.getMinutes())}`;
  return path.join(rootDir, 'logs', `run-${stamp}.log`);
}
