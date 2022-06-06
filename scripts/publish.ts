import { spawnSync } from 'child_process';
import { join, dirname, resolve } from 'path';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
} from 'fs';

const options = {
  remote: 'origin',
  pagesBranch: 'master',
  dist: 'dist',
  message: 'Updates',
};

//==============================================================================

type GitUser = {
  name: string;
  email: string;
};

class Git {
  cwd: string;

  constructor(cwd?: string) {
    this.cwd = cwd || process.cwd();
  }

  getUser(): GitUser {
    const gitUserName = spawnSync('git', ['config', 'user.name']).stdout;
    const gitUserEmail = spawnSync('git', ['config', 'user.email']).stdout;
    return {
      name: gitUserName.toString().trim(),
      email: gitUserEmail.toString().trim(),
    };
  }

  getRemoteUrl(remote: string): string | undefined {
    const args = ['config', '--get', 'remote.' + remote + '.url'];
    return spawnSync('git', args)
      .stdout.toString()
      .split(/[\n\r]/)
      .shift();
  }

  clone(repo: string, dir: string, branch: string): void {
    mkdirSync(dirname(resolve(dir)), { recursive: true });
    const args = [
      'clone',
      repo,
      dir,
      '--branch',
      branch,
      '--single-branch',
      '--origin',
      options.remote,
      '--depth',
      '1',
    ];
    spawnSync('git', args);
  }

  clean(): void {
    spawnSync('git', ['clean', '-f', '-d'], { cwd: this.cwd });
  }

  fetch(remote: string): void {
    spawnSync('git', ['fetch', remote], { cwd: this.cwd });
  }

  checkout(remote: string, branch: string): void {
    const tree = remote + '/' + branch;
    const status = spawnSync('git', ['ls-remote', '--exit-code', '.', tree], {
      cwd: this.cwd,
    }).status;
    if (status === 2) {
      spawnSync('git', ['checkout', '--orphan', branch], { cwd: this.cwd });
    }
  }

  rm(files: string[]): void {
    spawnSync('git', ['rm', '--ignore-unmatch', '-r', '-f', ...files], {
      cwd: this.cwd,
    });
  }

  add(files: string[]): void {
    spawnSync('git', ['add', ...files], { cwd: this.cwd });
  }

  setUser(user: GitUser): void {
    spawnSync('git', ['config', 'user.name', user.name], { cwd: this.cwd });
    spawnSync('git', ['config', 'user.email', user.email], { cwd: this.cwd });
  }

  commit(message: string): void {
    const isChanged = spawnSync('git', ['diff-index', '--quiet', 'HEAD'], {
      cwd: this.cwd,
    }).status;
    if (isChanged !== 0) {
      spawnSync('git', ['commit', '-m', message], { cwd: this.cwd });
    }
  }

  push(remote: string, branch: string): void {
    spawnSync('git', ['push', '--tags', remote, branch], { cwd: this.cwd });
  }
}

//==============================================================================

function cpR(src: string, dest: string): void {
  if (existsSync(src)) {
    const stats = statSync(src);
    if (stats.isDirectory()) {
      mkdirSync(dest, { recursive: true });
      readdirSync(src).forEach((item) => {
        cpR(join(src, item), join(dest, item));
      });
    } else {
      copyFileSync(src, dest);
    }
  }
}

async function publish(): Promise<void> {
  const git = new Git();
  const gitUser = git.getUser();
  const gitRepo = git.getRemoteUrl(options.remote);
  if (!gitRepo) {
    throw new Error('Failed to get remote URL');
  }
  const clone = join(process.cwd(), 'node_modules', '.cache', 'gh-pages');

  console.log('Cloning %s into %s', gitRepo, clone);
  git.clone(gitRepo, clone, options.pagesBranch);

  const cloneGit = new Git(clone);

  console.log('Cleaning');
  cloneGit.clean();

  console.log('Fetching %s', options.remote);
  cloneGit.fetch(options.remote);

  console.log('Checking out %s/%s', options.remote, options.pagesBranch);
  cloneGit.checkout(options.remote, options.pagesBranch);

  console.log('Removing files');
  cloneGit.rm(['*']);

  console.log('Copying files');
  cpR(join(process.cwd(), options.dist), clone);

  console.log('Adding all');
  cloneGit.add(['.']);

  cloneGit.setUser(gitUser);

  console.log('Committing');
  cloneGit.commit(options.message);

  console.log('Pushing');
  cloneGit.push(options.remote, options.pagesBranch);

  rmSync(clone, { force: true, recursive: true });
}
publish().catch((msg) => {
  console.error(`\n${msg}\n`);
});
