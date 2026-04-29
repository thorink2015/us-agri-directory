import type { CliOptions, SourceLoader } from '../types.ts';
import { DirectorySource } from './directory.ts';
import { CsvSource } from './csv.ts';
import { JsonSource } from './json.ts';

export function createSource(opts: CliOptions): SourceLoader {
  switch (opts.source) {
    case 'directory':
      return new DirectorySource();
    case 'csv':
      if (!opts.file) {
        throw new Error('--source=csv requires --file=<path>');
      }
      return new CsvSource(opts.file);
    case 'json':
      if (!opts.file) {
        throw new Error('--source=json requires --file=<path>');
      }
      return new JsonSource(opts.file);
  }
}
