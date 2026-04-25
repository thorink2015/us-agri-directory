import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { InputRow, SourceLoader } from '../types.ts';

// Reads operator data from the main Next.js app at ../../src/data/operators.ts.
// Uses dynamic import so we get the live array without parsing TS by hand.
// tsx (the runtime) handles the .ts extension transparently.
//
// Resolution: tools/contact-scraper/src/sources/ -> repo root -> src/data/operators.ts
const REPO_ROOT = path.resolve(import.meta.dirname, '..', '..', '..', '..');
const OPERATORS_PATH = path.join(REPO_ROOT, 'src', 'data', 'operators.ts');

interface RawOperator {
  slug: string;
  name: string;
  website?: string;
  phone?: string;
  email?: string;
  city?: string;
  // Many other fields exist; we only need the contact-relevant ones for
  // the input row. Everything else is ignored.
}

export class DirectorySource implements SourceLoader {
  async load(): Promise<InputRow[]> {
    const mod = (await import(pathToFileURL(OPERATORS_PATH).href)) as {
      operators: RawOperator[];
    };
    if (!Array.isArray(mod.operators)) {
      throw new Error(
        `Expected an exported "operators" array in ${OPERATORS_PATH}`,
      );
    }
    return mod.operators.map((op) => ({
      id: op.slug,
      name: op.name,
      website: op.website,
      passthrough: {
        existing_phone: op.phone ?? '',
        existing_email: op.email ?? '',
        city: op.city ?? '',
      },
    }));
  }
}
