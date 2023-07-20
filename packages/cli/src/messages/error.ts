import { log } from '@/utils/log';
import { sleep } from '@/utils/sleep';

import { textMain, textMuted } from '@/utils/text';

import spacingConfiguration from '@/configuration/spacing';

const stdout = process.stdout;

interface ErrorMessageParams {
  prefix: string;
  message: string;
  leftSpacing?: number;
}

export const errorMessage = async ({
  message,
  prefix,
  leftSpacing = spacingConfiguration.leftSpacing,
}: ErrorMessageParams) => {
  await sleep(100);
  const errorMessageLabel = `${' '.repeat(leftSpacing)} ${textMain('▲')} ${textMain(prefix)}`;

  if (stdout.columns < 80) {
    log(errorMessageLabel);
    log(`${' '.repeat(leftSpacing)}${textMuted(message)}`);
  } else {
    log(`${errorMessageLabel} ${textMuted(message)}`);
  }
};
