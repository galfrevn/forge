import * as path from 'node:path';
import stripAnsi from 'strip-ansi';

import { Context } from '@/components/context';
import blacksmith from '@/components/blacksmith';

import { sleep } from '@/utils/sleep';
import { random } from '@/utils/random';
import { textSuccess } from '@/utils/text';

import { farewellMessages } from '@/messages/static';
import { log } from '@/messages/banner';

interface SuccessStepPrams
  extends Pick<Context, 'currentWorkingDirectory' | 'packageManager' | 'skipBlacksmith'> {}

export const success = async (context: SuccessStepPrams) => {
  const currentProjectDirectory = path.relative(process.cwd(), context.currentWorkingDirectory);

  const developmentCommand =
    context.packageManager === 'npm' ? 'npm run dev' : `${context.packageManager} dev`;

  const installCommand =
    context.packageManager === 'npm' ? 'npm install' : `${context.packageManager} install`;

  await showFollowingSteps({
    directory: currentProjectDirectory,
    developmentCommand,
    installCommand,
  });

  if (!context.skipBlacksmith) {
    await blacksmith({
      messages: [random(farewellMessages)],
      configuration: {
        stdin: process.stdin,
        stdout: process.stdout,
      },
    });
  }
  return;
};

interface ShowFollowingStepsParams {
  directory: string;
  developmentCommand: string;
  installCommand: string;
}

export const showFollowingSteps = async ({
  directory,
  developmentCommand,
  installCommand,
}: ShowFollowingStepsParams) => {
  const stdout = process.stdout;

  const maximunSize = stdout.columns;
  const prefix = maximunSize < 80 ? ' ' : '';
  await sleep(200);

  await sleep(100);
  if (directory !== '') {
    directory = directory.includes(' ') ? `"./${directory}"` : `./${directory}`;

    const enter = [`\n${prefix}Enter your project directory using`, textSuccess(`cd ${directory}`)];
    const textLength = enter[0].length + stripAnsi(enter[1]).length;
    log(enter.join(textLength > maximunSize ? '\n' + prefix : ' '));
  }
  log(
    `${prefix}Run ${textSuccess(developmentCommand)} to start the dev server. ${textSuccess(
      'CTRL+C'
    )} to stop.`
  );
  await sleep(100);
  log(
    `${prefix}If you haven't installed the project dependencies, run ${textSuccess(
      installCommand
    )}. `
  );
  await sleep(100);
  log(`\n${prefix}Stuck? Send my a slack message!`);
  log(`${prefix}"The Forge" blog article: ${textSuccess('https://blog.galfrevn.com/forge')}`);
  await sleep(200);
};
