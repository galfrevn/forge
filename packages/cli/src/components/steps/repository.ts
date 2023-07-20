import execa from 'execa';

import * as fs from 'node:fs';
import * as path from 'node:path';

import type { Context } from '@/components/context';
import { spinner } from '@/components/spinner';

import { infoMessage } from '@/messages/info';
import { title } from '@/messages/title';
import { errorMessage } from '@/messages/error';

import { textMuted, textNormal } from '@/utils/text';

interface RepositoryStepPrams
  extends Pick<Context, 'currentWorkingDirectory' | 'git' | 'prompt' | 'dryRun'> {}

export const repository = async (context: RepositoryStepPrams) => {
  if (fs.existsSync(path.join(context.currentWorkingDirectory, '.git'))) {
    await infoMessage({ prefix: 'Nice!', message: `Git has already been initialized` });
    return;
  }

  let shouldInitializeRepository = context.git;
  if (shouldInitializeRepository === undefined) {
    ({ git: shouldInitializeRepository } = await context.prompt({
      name: 'git',
      type: 'confirm',
      label: title('Settings'),
      message: `Initialize a new git repository?`,
      hint: 'optional',
      initial: true,
    }));
  }

  if (shouldInitializeRepository) {
    await spinner({
      start: 'Initializating git repository...',
      end: 'Git repository successfully initialized',
      while: () =>
        initializeRepository({ cwd: context.currentWorkingDirectory }).catch((e) => {
          errorMessage({ prefix: 'error', message: e });
          process.exit(1);
        }),
    });
  } else {
    await infoMessage({
      prefix: 'Sounds good!',
      message: `You can always run ${textNormal('git init')}${textMuted(' manually.')}`,
    });
  }
};

interface InitializeRepositoryParams {
  cwd: string;
}

const initializeRepository = async ({ cwd }: InitializeRepositoryParams) => {
  try {
    await execa('git', ['init'], { cwd, stdio: 'ignore' });
    await execa('git', ['add', '-A'], { cwd, stdio: 'ignore' });
    await execa(
      'git',
      [
        'commit',
        '-m',
        'Initial commit from Forge',
        '--author="forge[bot] <forgebot-blacksmith@users.noreply.github.com>"',
      ],
      { cwd, stdio: 'ignore' }
    );
  } catch (e) {}
};
