import { basename, extname, join, resolve } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { build } from 'esbuild';
import { compileFile } from 'pug';
import { generateSW } from 'workbox-build';

const OutDir = resolve('dist');
const PugEntrypoint = resolve('src/index.pug');
const AppEntrypoint = resolve('src/index.ts');

async function buildApp(): Promise<void> {
  if (!existsSync(OutDir)) mkdirSync(OutDir);

  // Build Javascript resources from `src
  await build({
    logLevel: 'silent',
    write: true,
    bundle: true,
    minify: true,
    loader: {
      '.ts': 'ts',
      '.tsx': 'tsx',
    },
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    format: 'esm',
    entryPoints: [AppEntrypoint],
    outdir: OutDir,
  });

  // Build HTML index from Pug.js template
  writeFileSync(
    join(OutDir, basename(PugEntrypoint, extname(PugEntrypoint)) + '.html'),
    compileFile(PugEntrypoint)(),
  );

  // Build Service-Worker
  await generateSW({
    swDest: resolve(OutDir, 'sw.js'),
    globDirectory: OutDir,
  });
}
buildApp().catch((msg) => {
  console.error(`\n${msg}\n`);
});
