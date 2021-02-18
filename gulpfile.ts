import del from 'del';
import { src, dest, parallel, series } from 'gulp';
import { resolve, basename, extname, join, dirname } from 'path';
import { compile } from 'pug';
import { Stream, Transform } from 'stream';
import { build, BuildOptions, OutputFile } from 'esbuild';
import Vinyl from 'vinyl';
import { generateSW } from 'workbox-build';

type Callback = () => void;

const paths = {
  out: resolve(__dirname, 'dist'),
  outjs: resolve(__dirname, 'dist', 'static', 'js'),
  public: resolve(__dirname, 'public'),
  root: resolve(__dirname),
  icons: resolve(__dirname, 'public', 'icons'),
  images: resolve(__dirname, 'public', 'image'),
  static: resolve(__dirname, 'dist', 'static'),
  src: resolve(__dirname, 'src'),
};

const files = {
  repo: ['LICENSE', 'README.md'],
  public: [
    'browserconfig.xml',
    'CNAME',
    'keybase.txt',
    'pgp_pubkey.asc',
    'site.webmanifest',
  ],
  icons: ['*'],
  images: ['*'],
  indexTemplate: resolve(paths.src, 'index.pug'),
  entrypoints: [resolve(paths.src, 'index.ts')],
};

function getFilePaths(dir: string, ...files: string[]): string[] {
  const out: string[] = [];
  files.forEach((file) => {
    out.push(resolve(dir, file));
  });
  return out;
}

function copyRepoFiles(): Stream {
  return src(getFilePaths(paths.root, ...files.repo)).pipe(dest(paths.out));
}

function copyRootFiles(): Stream {
  return src(getFilePaths(paths.public, ...files.public)).pipe(dest(paths.out));
}

function copyImages(): Stream {
  return src(
    [
      ...getFilePaths(paths.icons, ...files.icons),
      ...getFilePaths(paths.images, ...files.images),
    ],
    {
      base: paths.public,
    },
  ).pipe(dest(paths.static));
}

export function clean(): Promise<string[]> {
  return del(paths.out);
}
clean.description = 'Clean the output directory';

export function copy(done: Callback): void {
  parallel(copyRepoFiles, copyRootFiles, copyImages)(done);
}
copy.description = 'Copy static files to output directory';

export function buildHtml(): Stream {
  return src(files.indexTemplate)
    .pipe(
      new Transform({
        objectMode: true,
        transform: function (chunk, _, callback) {
          const toHtmlFile = (path: string): string => {
            const base = basename(path, extname(path));
            return join(dirname(path), base + '.html');
          };
          chunk.path = toHtmlFile(chunk.path);
          const compiled = compile(String(chunk.contents), {
            filename: chunk.path,
          })({});
          chunk.contents = Buffer.from(compiled);
          return callback(null, chunk);
        },
      }),
    )
    .pipe(dest(paths.out));
}
buildHtml.description = 'Build HTML index from pug.js templates';

export function buildJs(): Stream {
  const ep: string[] = [];
  return src(files.entrypoints)
    .pipe(
      new Transform({
        objectMode: true,
        transform: function (chunk, _, callback) {
          ep.push(chunk.path);
          return callback(null);
        },
        async flush(callback) {
          const params: BuildOptions = {
            logLevel: 'silent',
            entryPoints: ep,
            write: false,
            bundle: true,
            minify: true,
            loader: {
              '.js': 'js',
              '.jsx': 'jsx',
              '.ts': 'ts',
              '.tsx': 'tsx',
            },
            define: {
              'process.env.NODE_ENV': '"production"',
            },
            format: 'esm',
            outdir: '.',
          };
          const { outputFiles } = await build(params);
          if (outputFiles) {
            outputFiles.forEach((file: OutputFile) => {
              this.push(
                new Vinyl({
                  path: file.path,
                  contents: Buffer.from(file.contents),
                }),
              );
            });
          }
          callback(null);
        },
      }),
    )
    .pipe(dest(paths.out));
}
buildJs.description = 'Build JavaScript resources from `src`';

export function buildSw(done: Callback): void {
  generateSW({
    swDest: resolve(paths.out, 'sw.js'),
    globDirectory: paths.out,
  });
  done();
}
buildSw.description = 'Build ServiceWorker';

export default function buildApp(done: Callback): void {
  series(clean, parallel(copy, buildHtml, buildJs), buildSw)(done);
}
buildApp.description = 'Clean the output directory and build the application';
