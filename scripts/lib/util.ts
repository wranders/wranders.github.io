import { existsSync, mkdirSync } from 'fs';

export function ensureDirectory(dir: string, recurse = false): void {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: recurse });
}
