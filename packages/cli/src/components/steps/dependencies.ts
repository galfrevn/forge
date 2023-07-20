import execa from 'execa';

import type { Context } from '@/components/context';
import { spinner } from '@/components/spinner';

import { infoMessage } from '@/messages/info';
import { title } from '@/messages/title';
import { textBold } from '@/utils/text';
import { errorMessage } from '@/messages/error';

interface DependenciesStepPrams
  extends Pick<Context, 'currentWorkingDirectory' | 'install' | 'prompt' | 'packageManager'> {}

export const dependencies = async (context: DependenciesStepPrams) => {
  if (context.install === undefined) {
    const { deps } = await context.prompt({
      name: 'deps',
      type: 'confirm',
      label: title('Packages'),
      message: `Install project packages?`,
      hint: 'recommended',
      initial: true,
    });

    context.install = deps;
  }

  if (context.install)
    await spinner({
      start: `Installing packages with ${context.packageManager}...`,
      end: 'Packages successfully installed',
      while: () => {
        return installDependencies({
          packageManager: 'npm',
          currentWorkingDirectory: context.currentWorkingDirectory,
        }).catch((e) => {
          errorMessage({ prefix: 'error', message: e });
          errorMessage({
            prefix: 'error',
            message: `Packages failed to install, please run ${textBold(
              context.packageManager + ' install'
            )}  to install them manually after setup.`,
          });
        });
      },
    });
  else
    await infoMessage({
      prefix: 'No problem!',
      message: 'Remember to install packages after setup.',
    });
};

interface InstallDependenciesParams {
  packageManager: 'npm';
  currentWorkingDirectory: string;
}

const installDependencies = async ({
  packageManager,
  currentWorkingDirectory,
}: InstallDependenciesParams) => {
  const installExec = execa(packageManager, ['install'], { cwd: currentWorkingDirectory });
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => reject(`Request timed out after one minute`), 180_000);
    installExec.on('error', (e) => reject(e));
    installExec.on('close', () => resolve());
  });
};
