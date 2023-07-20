import { label, textBold, textMain, textMuted } from '@/utils/text';
import colorsConfiguration from '@/configuration/colors';

const stdout = process.stdout;

export const log = (message: string) => stdout.write(message + '\n');
export const banner = async (version: string) => {
  log(
    `\nUsing the ${label({
      message: 'Forge',
      background: colorsConfiguration.labelBackground,
      foreground: colorsConfiguration.labelForeground,
    })} ${textMain(textBold(`v${version}`))}`
  );

  log(`${textMuted('Lighting the fires.')}`);
};
