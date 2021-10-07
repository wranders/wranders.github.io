import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { resolve } from 'path';

type CopyDir = {
  SrcDir: string;
  Files: string[];
  OutDir: string;
};

type Copy = CopyDir[];

const WebRoot = resolve('dist');
const CopyFiles: Copy = [
  {
    // Copy repository files
    SrcDir: resolve(__dirname, '..'),
    Files: ['LICENSE', 'README.md'],
    OutDir: WebRoot,
  },
  {
    // Copy web root files
    SrcDir: resolve(__dirname, '..', 'public'),
    Files: [
      'browserconfig.xml',
      'CNAME',
      'keybase.txt',
      'pgp_pubkey.asc',
      'site.webmanifest',
    ],
    OutDir: WebRoot,
  },
  {
    // Copy icons
    SrcDir: resolve(__dirname, '..', 'public', 'icons'),
    Files: ['*'],
    OutDir: resolve(WebRoot, 'static', 'icons'),
  },
  {
    // Copy images
    SrcDir: resolve(__dirname, '..', 'public', 'images'),
    Files: ['*'],
    OutDir: resolve(WebRoot, 'static', 'images'),
  },
];

async function copy(): Promise<void> {
  if (!existsSync(WebRoot)) mkdirSync(WebRoot);

  CopyFiles.forEach((fileGroup: CopyDir) => {
    if (!existsSync(fileGroup.OutDir))
      mkdirSync(fileGroup.OutDir, { recursive: true });

    if (fileGroup.Files.length == 1 && fileGroup.Files[0] === '*') {
      const files = readdirSync(fileGroup.SrcDir);
      files.forEach((file) => {
        const srcPath = resolve(fileGroup.SrcDir, file);
        const destPath = resolve(fileGroup.OutDir, file);
        writeFileSync(destPath, readFileSync(srcPath));
      });
    } else {
      fileGroup.Files.forEach((file) => {
        const srcPath = resolve(fileGroup.SrcDir, file);
        const destPath = resolve(fileGroup.OutDir, file);
        writeFileSync(destPath, readFileSync(srcPath));
      });
    }
  });
}
copy().catch((msg) => {
  console.error(`\n${msg}\n`);
});
