import { spawnSync } from 'child_process';
import { join, dirname, resolve } from 'path';
import { mkdirSync, rmSync } from 'fs';
import { recurse as copyRecurse } from './util/copy';
import which from './util/which';

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
  gitExec: string;

  constructor(cwd?: string) {
    this.cwd = cwd || process.cwd();
    this.gitExec = which('git');
  }

  getUser(): GitUser {
    const gitUserName = spawnSync(this.gitExec, ['config', 'user.name']).stdout;
    const gitUserEmail = spawnSync(this.gitExec, [
      'config',
      'user.email',
    ]).stdout;
    return {
      name: gitUserName.toString().trim(),
      email: gitUserEmail.toString().trim(),
    };
  }

  getRemoteUrl(remote: string): string | undefined {
    const args = ['config', '--get', 'remote.' + remote + '.url'];
    return spawnSync(this.gitExec, args)
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
    spawnSync(this.gitExec, args);
  }

  clean(): void {
    spawnSync(this.gitExec, ['clean', '-f', '-d'], { cwd: this.cwd });
  }

  fetch(remote: string): void {
    spawnSync(this.gitExec, ['fetch', remote], { cwd: this.cwd });
  }

  checkout(remote: string, branch: string): void {
    const tree = remote + '/' + branch;
    const status = spawnSync(
      this.gitExec,
      ['ls-remote', '--exit-code', '.', tree],
      {
        cwd: this.cwd,
      },
    ).status;
    if (status === 2) {
      spawnSync(this.gitExec, ['checkout', '--orphan', branch], {
        cwd: this.cwd,
      });
    }
  }

  rm(files: string[]): void {
    spawnSync(this.gitExec, ['rm', '--ignore-unmatch', '-r', '-f', ...files], {
      cwd: this.cwd,
    });
  }

  add(files: string[]): void {
    spawnSync(this.gitExec, ['add', ...files], { cwd: this.cwd });
  }

  setUser(user: GitUser): void {
    spawnSync(this.gitExec, ['config', 'user.name', user.name], {
      cwd: this.cwd,
    });
    spawnSync(this.gitExec, ['config', 'user.email', user.email], {
      cwd: this.cwd,
    });
  }

  commit(message: string): void {
    const isChanged = spawnSync(
      this.gitExec,
      ['diff-index', '--quiet', 'HEAD'],
      {
        cwd: this.cwd,
      },
    ).status;
    if (isChanged !== 0) {
      spawnSync(this.gitExec, ['commit', '-m', message], { cwd: this.cwd });
    }
  }

  push(remote: string, branch: string): void {
    spawnSync(this.gitExec, ['push', '--tags', remote, branch], {
      cwd: this.cwd,
    });
  }
}

//==============================================================================

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
  copyRecurse(join(process.cwd(), options.dist), clone);

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
