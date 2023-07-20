import type { Context } from '@/components/context';

import colorsConfiguration from '@/configuration/colors';
import blacksmith from '@/components/blacksmith';

import { textMain, label } from '@/utils/text';
import { random } from '@/utils/random';

import { banner } from '@/messages/banner';
import { welcomeMessages } from '@/messages/static';

interface IntroductionStepParams extends Pick<Context, 'skipBlacksmith' | 'version' | 'username'> {}

const stdin = process.stdin;
const stdout = process.stdout;

export const introduction = async (context: IntroductionStepParams) => {
  if (context.skipBlacksmith) return await banner(context.version);

  const forgeLabel = label({
    message: 'Forge',
    background: colorsConfiguration.labelBackground,
    foreground: colorsConfiguration.labelForeground,
  });

  const blacksmithIntroductionMessages = [
    'Welcome',
    'to',
    forgeLabel,
    textMain(`v${context.version}`) + ',',
    `${context.username}!`,
  ];

  await blacksmith({
    messages: [blacksmithIntroductionMessages, random(welcomeMessages)],
    configuration: {
      stdin,
      stdout,
    },
  });

  await banner(context.version);
};
