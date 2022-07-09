import { statSync } from 'fs';
import { join } from 'path';

// Local implementation of https://github.com/npm/node-which
export default function which(cmd: string): string {
  const { isWindows, envPath, envPathExtensions, envPathExtensionString } =
    setupEnv(cmd);

  if (isWindows && cmd.indexOf('.') !== -1 && envPathExtensions[0] !== '')
    envPathExtensions.unshift('');

  for (const ppRaw of envPath) {
    const pathPart = stripQuotes(ppRaw);
    const pCmd = join(pathPart, cmd);
    const p =
      !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;

    for (const pext of envPathExtensions) {
      const cur = p + pext;
      try {
        if (isExe(cur, envPathExtensionString)) {
          return cur;
        }
      } catch (ex) {}
    }
  }

  throw Object.assign(new Error(`not found: ${cmd}`), { code: 'ENOENT' });
}

type WhichEnv = {
  isWindows: boolean;
  envPath: string[];
  envPathExtensions: string[];
  envPathExtensionString: string | null;
};

function setupEnv(cmd: string): WhichEnv {
  const isWindows =
    process.platform === 'win32' ||
    process.env.OSTYPE === 'cygwin' ||
    process.env.OSTYPE === 'msys';

  const envPathSeparator = isWindows ? ';' : ':';

  const envPath =
    cmd.match(/\//) || (isWindows && cmd.match(/\\/))
      ? ['']
      : /* eslint-disable indent */
        [
          ...(isWindows ? [process.cwd()] : []),
          ...(process.env.PATH || '').split(envPathSeparator),
        ]; /* eslint-enable indent */

  const envPathExtensionString = isWindows
    ? process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
    : null;

  const envPathExtensions =
    isWindows && envPathExtensionString !== null
      ? envPathExtensionString.split(envPathSeparator)
      : [''];

  return {
    isWindows: isWindows,
    envPath: envPath,
    envPathExtensions: envPathExtensions,
    envPathExtensionString: envPathExtensionString,
  };
}

function stripQuotes(cmd: string): string {
  return /^".*"$/.test(cmd) ? cmd.slice(1, -1) : cmd;
}

//##############################################################################

// Local implementation of https://github.com/isaacs/isexe
function isExe(path: string, pathExt: string | null): boolean {
  if (process.platform === 'win32') {
    return isExeWin(path, pathExt);
  }

  const stat = statSync(path);
  if (!stat.isFile()) return false;
  const mod = stat.mode,
    uid = stat.uid,
    gid = stat.gid,
    u = parseInt('100', 8),
    g = parseInt('010', 8),
    o = parseInt('001', 8);
  const ug = u | g;
  const pgid = typeof process.getgid === 'undefined' ? -1 : process.getgid();
  const puid = typeof process.getuid === 'undefined' ? -1 : process.getuid();
  const ret =
    mod & o ||
    (mod & g && gid === pgid) ||
    (mod & u && uid === puid) ||
    (mod & ug && puid === 0);
  return !!ret;
}

function isExeWin(path: string, pathExt: string | null): boolean {
  const stat = statSync(path);
  if (!stat.isSymbolicLink() && !stat.isFile()) return false;
  if (pathExt === null) return true;
  const pathExtSplit = pathExt.split(';');
  if (pathExtSplit.indexOf('') !== -1) return true;
  for (const pext of pathExtSplit) {
    const p = pext.toLowerCase();
    // Replaced deprecated substr with substring.
    // Made it work with the new function, but this doesn't seem like the right
    // way to do this. Will probably rewrite at some point.
    if (p && path.substring(path.length - p.length).toLowerCase() === p)
      return true;
  }
  return false;
}

//##############################################################################
