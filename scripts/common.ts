import { resolve } from 'path';
import { StaticFilesGroup } from './lib/copy';

//==============================================================================

export const DistDirectory: string = resolve('dist');

export const AppEntrypoint: string = resolve('src/index.tsx');

const PublicDir: string = resolve('public');

export const StaticFiles: StaticFilesGroup[] = [
  {
    // Copy repository files
    sourceDirectory: '.',
    outDirectory: DistDirectory,
    files: ['LICENSE', 'README.md'],
  },
  {
    // Copy web root files
    sourceDirectory: PublicDir,
    outDirectory: DistDirectory,
    files: [
      '.nojekyll',
      'browserconfig.xml',
      'CNAME',
      'pgp_pubkey.asc',
      'site.webmanifest',
    ],
  },
  {
    // Copy icons
    sourceDirectory: resolve(PublicDir, 'icons'),
    outDirectory: resolve(DistDirectory, 'static', 'icons'),
    files: ['*'],
  },
  {
    // Copy images
    sourceDirectory: resolve(PublicDir, 'images'),
    outDirectory: resolve(DistDirectory, 'static', 'images'),
    files: ['*'],
  },
];
