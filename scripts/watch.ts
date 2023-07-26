import { context } from 'esbuild';
import { watchFile } from 'fs';
import { buildHTML, BuildOptionsDev, HTMLTemplateEntrypoint } from './build';
import { copy } from './lib/copy';
import { DistDirectory, StaticFiles } from './common';
import { ensureDirectory } from './lib/util';

async function watchApp(): Promise<void> {
  ensureDirectory(DistDirectory);

  copy(StaticFiles, DistDirectory);

  const ctx = await context(BuildOptionsDev);
  await ctx.watch();
  await ctx.serve({ host: 'localhost', port: 5500, servedir: DistDirectory });

  buildHTML(true);
  watchFile(HTMLTemplateEntrypoint, async () => {
    console.log('changed');
    buildHTML(true);
    await ctx.rebuild();
  });
}

//==============================================================================

const funcMap: { [part: string]: () => Promise<void> } = {
  app: watchApp,
};

const args = process.argv.slice(2);
if (args.length == 0) {
  console.error('no watch targets specified');
  process.exit(1);
} else if (args.length > 1) {
  console.error('multiple targets specified; only the first will be launched');
}

const target = args[0];
if (funcMap[target] == undefined) {
  console.error('unknown watch target');
  process.exit(1);
}
funcMap[target]();
