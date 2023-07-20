import colors from 'chalk';

import { strip } from '@/components/prompt/utils/clear';

export const textMain = (value: string) => colors.red(value);

export const textMuted = (value: string) => colors.dim(value);
export const textBold = (value: string) => colors.bold(value);
export const textNormal = (value: string) => colors.reset(value);

interface LabelParams {
  message: string;
  background: colors.Chalk;
  foreground: colors.Chalk;
}

export const label = ({ background, foreground, message }: LabelParams) =>
  background(` ${foreground(message)} `);

export const align = (text: string, dir: 'start' | 'end' | 'center', len: number) => {
  const pad = Math.max(len - strip(text).length, 0);
  switch (dir) {
    case 'start':
      return text + ' '.repeat(pad);
    case 'end':
      return ' '.repeat(pad) + text;
    case 'center':
      return ' '.repeat(Math.floor(pad / 2)) + text + ' '.repeat(Math.floor(pad / 2));
    default:
      return text;
  }
};
