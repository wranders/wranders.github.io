import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { ensureDirectory } from './util';
import { resolve } from 'path';

export type StaticFilesGroup = {
  sourceDirectory: string;
  outDirectory: string;
  files: string[];
};

export function copy(fileGroups: StaticFilesGroup[], root: string): void {
  ensureDirectory(root);

  fileGroups.forEach((fileGroup: StaticFilesGroup) => {
    ensureDirectory(fileGroup.outDirectory, true);
    let files: string[];
    if (fileGroup.files.length === 1 && fileGroup.files[0] === '*') {
      files = readdirSync(fileGroup.sourceDirectory);
    } else {
      files = fileGroup.files;
    }
    files.forEach((file: string) => {
      const srcPath = resolve(fileGroup.sourceDirectory, file);
      const outPath = resolve(fileGroup.outDirectory, file);
      writeFileSync(outPath, readFileSync(srcPath));
    });
  });
}
