import { DistDirectory, StaticFiles } from './common';
import { copy } from './lib/copy';

// export function copy(): void {
//   ensureDirectory(DistDirectory);

//   StaticFiles.forEach((fileGroup: StaticFilesGroup) => {
//     ensureDirectory(fileGroup.outDirectory, true);

//     let files: string[];

//     if (fileGroup.files.length === 1 && fileGroup.files[0] === '*') {
//       files = readdirSync(fileGroup.sourceDirectory);
//     } else {
//       files = fileGroup.files;
//     }
//     files.forEach((file: string) => {
//       const srcPath = resolve(fileGroup.sourceDirectory, file);
//       const destPath = resolve(fileGroup.outDirectory, file);
//       writeFileSync(destPath, readFileSync(srcPath));
//     });
//   });
// }
copy(StaticFiles, DistDirectory);
