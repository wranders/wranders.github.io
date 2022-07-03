import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

export function recurse(source: string, destination: string): void {
  if (existsSync(source)) {
    const stats = statSync(source);
    if (stats.isDirectory()) {
      mkdirSync(destination, { recursive: true });
      readdirSync(source).forEach((item) => {
        recurse(join(source, item), join(destination, item));
      });
    } else {
      copyFileSync(source, destination);
    }
  }
}
