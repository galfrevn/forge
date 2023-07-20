import { log } from '@/utils/log';
import { sleep } from '@/utils/sleep';

import { textInfo, textMuted } from '@/utils/text';

import spacingConfiguration from '@/configuration/spacing';

const stdout = process.stdout;

interface InformaticMessageParams {
  prefix: string;
  message: string;
  leftSpacing?: number;
}

export const infoMessage = async ({
  message,
  prefix,
  leftSpacing = spacingConfiguration.leftSpacing,
}: InformaticMessageParams) => {
  await sleep(100);
  const informaticMessageLabel = `${' '.repeat(leftSpacing)} ${textInfo('◼')} ${textInfo(prefix)}`;

  if (stdout.columns < 80) {
    log(informaticMessageLabel);
    log(`${' '.repeat(leftSpacing)} ${textMuted(message)}`);
  } else {
    log(`${informaticMessageLabel} ${textMuted(message)}`);
  }
};
