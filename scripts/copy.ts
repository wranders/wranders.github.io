import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { resolve } from 'path';

//==============================================================================

const webRoot = resolve('dist');

const copyFiles: Copy = [
  {
    // Copy repository files
    srcDir: '.',
    files: ['LICENSE', 'README.md'],
    outDir: webRoot,
  },
  {
    // Copy web root files
    srcDir: resolve('public'),
    files: [
      '.nojekyll',
      'browserconfig.xml',
      'CNAME',
      'pgp_pubkey.asc',
      'site.webmanifest',
    ],
    outDir: webRoot,
  },
  {
    // Copy icons
    srcDir: resolve('public', 'icons'),
    files: ['*'],
    outDir: resolve(webRoot, 'static', 'icons'),
  },
  {
    // Copy images
    srcDir: resolve('public', 'images'),
    files: ['*'],
    outDir: resolve(webRoot, 'static', 'images'),
  },
];

//==============================================================================

type CopyDir = {
  srcDir: string;
  files: string[];
  outDir: string;
};

type Copy = CopyDir[];

async function copy(): Promise<void> {
  if (!existsSync(webRoot)) mkdirSync(webRoot);

  copyFiles.forEach((fileGroup: CopyDir) => {
    if (!existsSync(fileGroup.outDir))
      mkdirSync(fileGroup.outDir, { recursive: true });

    let files: string[];

    if (fileGroup.files.length === 1 && fileGroup.files[0] === '*') {
      files = readdirSync(fileGroup.srcDir);
    } else {
      files = fileGroup.files;
    }
    files.forEach((file: string) => {
      const srcPath = resolve(fileGroup.srcDir, file);
      const destPath = resolve(fileGroup.outDir, file);
      writeFileSync(destPath, readFileSync(srcPath));
    });
  });
}
copy().catch((msg) => {
  console.error(`\n${msg}\n`);
});
