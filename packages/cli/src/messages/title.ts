import { label, align } from '@/utils/text';

import colorsConfiguration from '@/configuration/colors';

export const title = (message: string) => {
  const titleLabel = label({
    message,
    background: colorsConfiguration.labelBackground,
    foreground: colorsConfiguration.labelForeground,
  });

  return align(titleLabel, 'end', 10);
};
