import { readdirSync, statSync, watch, writeFileSync } from 'fs';
import {
  build,
  BuildOptions as ESBuildOptions,
  context,
  OnLoadArgs,
} from 'esbuild';
import { join, posix, relative, resolve, sep } from 'path';
import { compileFile, Options as PugOptions } from 'pug';
import { readFile } from 'fs/promises';
import { AppEntrypoint, DistDirectory } from './common';
import { ensureDirectory } from './lib/util';

//==============================================================================

export const HTMLTemplateEntrypoint: string = resolve('src/index.pug');

const ServiceWorkerEntrypoint: string = resolve('src/sw/sw.ts');

const buildOptionsCommon: ESBuildOptions = {
  write: true,
  bundle: true,
  treeShaking: true,
  loader: {
    '.ts': 'ts',
    '.txs': 'tsx',
  },
  format: 'esm',
  entryPoints: [AppEntrypoint],
  outdir: DistDirectory,
};

const BuildOptionsProd: ESBuildOptions = {
  ...buildOptionsCommon,
  logLevel: 'silent',
  minify: true,
  sourcemap: false,
  define: {
    'process.env.NODE_ENV': '"production"',
  },
};

export const BuildOptionsDev: ESBuildOptions = {
  ...buildOptionsCommon,
  logLevel: 'info',
  minify: false,
  sourcemap: true,
  define: {
    'process.env.NODE_ENV': '"development"',
  },
};

const BuildOptionsServiceWorker: ESBuildOptions = {
  entryPoints: [{ in: ServiceWorkerEntrypoint, out: 'sw' }],
  plugins: [
    {
      name: 'insertCache',
      setup(build) {
        build.onLoad({ filter: /.*/ }, async function (args: OnLoadArgs) {
          function getFiles(dir: string, existing?: string[]): string[] {
            const files = readdirSync(dir);
            let out: string[] = existing === undefined ? [] : existing;
            files.forEach((file: string) => {
              const filePath: string = join(dir, file);
              if (statSync(filePath).isDirectory()) {
                out = getFiles(filePath, out);
              } else {
                out.push(
                  '/' +
                    relative(DistDirectory, filePath)
                      .split(sep)
                      .join(posix.sep),
                );
              }
            });
            return out;
          }
          const contents = await readFile(args.path, 'utf-8');
          const precache: string[] = ['/index.js', '/index.html'].concat(
            getFiles('dist/static'),
          );
          const generated: string = contents
            .toString()
            .replace(/\[\`\$\{1\}\`\]/, JSON.stringify(precache));
          const result = await build.esbuild.transform(generated, {
            loader: 'ts',
          });
          return { contents: result.code };
        });
      },
    },
  ],
};

//==============================================================================

async function buildApp(): Promise<void> {
  ensureDirectory(DistDirectory);
  await build(BuildOptionsProd);
}

export async function buildHTML(dev = false): Promise<void> {
  ensureDirectory(DistDirectory);

  const pugOptions: PugOptions = {
    filters: {
      esbuildListener: () => {
        const out =
          '<script>new EventSource("/esbuild")' +
          '.addEventListener("change", () => window.location.reload()' +
          ');</script>';
        if (dev) return out;
      },
    },
  };
  const compiled = compileFile(HTMLTemplateEntrypoint, pugOptions)();
  writeFileSync(join(DistDirectory, 'index.html'), compiled);
}

async function buildServiceWorker(dev = false): Promise<void> {
  const buildOptions: ESBuildOptions = {
    ...(dev ? BuildOptionsDev : BuildOptionsProd),
    ...BuildOptionsServiceWorker,
  };

  build(buildOptions);
}

// async function watchDev(): Promise<void> {
//   ensureDirectory(DistDirectory);

//   const ctx = await context(BuildOptionsDev);
//   await ctx.watch();
//   await ctx.serve({ host: 'localhost', port: 5500, servedir: DistDirectory });

//   buildHTML(true);
//   watch(HTMLTemplateEntrypoint, async () => {
//     buildHTML(true);
//     await ctx.rebuild();
//   });
// }

//==============================================================================

const funcMap: { [part: string]: () => Promise<void> } = {
  app: buildApp,
  html: buildHTML,
  sw: buildServiceWorker,
  // watch: watchDev,
};

const args = process.argv.slice(2);
if (args.length == 0) {
  console.error('no build targets specified');
  process.exit(1);
}
args.forEach((cmd) => {
  if (funcMap[cmd] === undefined) {
    console.error('unknown build target');
    process.exit(1);
  }
  funcMap[cmd]();
});
