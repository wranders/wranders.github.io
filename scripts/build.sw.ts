import { build } from 'esbuild';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, posix, relative, resolve, sep } from 'path';

const swEntrypoint = resolve('serviceWorker/sw.ts');
const swOut = resolve('dist/sw.js');

function getAllFiles(dir: string, out?: string[]): string[] {
  const files = readdirSync(dir);
  out = out || [];
  files.forEach(function (file) {
    if (statSync(join(dir, file)).isDirectory()) {
      out = getAllFiles(join(dir, file), out);
    } else {
      (out as string[]).push(
        '/' +
          relative(resolve('dist'), join(dir, file)).split(sep).join(posix.sep),
      );
    }
  });
  return out;
}

async function buildSW(): Promise<void> {
  const precache = ['/index.js', '/index.html'].concat(
    getAllFiles('dist/static'),
  );

  const rawSW = readFileSync(resolve(swEntrypoint)).toString();
  // Replace the variable placeholder in sw.ts with the real data.
  const genSW = rawSW.replace(/\[\`\$\{1\}\`\]/, JSON.stringify(precache));

  await build({
    logLevel: 'silent',
    write: true,
    bundle: true,
    minify: true,
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    format: 'esm',
    outfile: swOut,
    stdin: {
      contents: genSW,
      loader: 'ts',
    },
  });
}
buildSW().catch((msg) => {
  console.error(`\n${msg}\n`);
});
