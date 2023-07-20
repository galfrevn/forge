import { random, randomBetween } from '@/utils/random';
import { textBold, textMain } from '@/utils/text';
import { useAscii } from '@/utils/ascii';
import { sleep } from '@/utils/sleep';

import { action } from '@/components/prompt/utils/actions';

import { createInterface, emitKeypressEvents } from 'node:readline';
import { create as createLogUpdate } from 'log-update';

interface BlacksmithParams {
  messages: string | string[];
  configuration: {
    /**
     * Clean the console after the Blacksmith's animation is done.
     * @default false
     */
    cleanScreen?: boolean;
    stdin: NodeJS.ReadStream;
    stdout: NodeJS.WriteStream;
  };
}

interface GenerateBlacksmithParams {
  message: string;
  body: {
    mouth: string;
    eye: string;
  };
}

const blacksmithConfiguration = {
  name: 'The Blacksmith: ',
  eyes: useAscii()
    ? ['•', '•', 'o', 'o', '•', 'O', '^', '•']
    : ['●', '●', '●', '●', '●', '○', '○', '•'],
  mouths: useAscii()
    ? ['•', 'O', '*', 'o', 'o', '•', '-']
    : ['•', '○', '■', '▪', '▫', '▬', '▭', '-', '○'],
  walls: useAscii() ? ['—', '|'] : ['─', '│'],
  corners: useAscii() ? ['+', '+', '+', '+'] : ['╭', '╮', '╰', '╯'],
};

const defaultBlackmithBody = {
  eye: blacksmithConfiguration.eyes[0],
  mouth: blacksmithConfiguration.mouths[0],
};

const generateBlacksmith = ({ message, body = defaultBlackmithBody }: GenerateBlacksmithParams) => {
  const [horizontalWall, verticalWall] = blacksmithConfiguration.walls;
  const [topLeft, topRight, bottomLeft, bottomRight] = blacksmithConfiguration.corners;

  const head = horizontalWall.repeat(3);

  /**
   * @internal
   * Blacksmith result should look like this:
   * +—————+  The Blacksmith:
   * | ^ u ^  Embark on a path of coding prowess, with me, the Blacksmith, as your companion.
   * +—————+
   */
  return [
    `${topLeft}${horizontalWall.repeat(2)}${head}${topRight}  ${textBold(textMain(blacksmithConfiguration.name))}`,
    `${verticalWall} ${body.eye} ${textMain(body.mouth)} ${body.eye}  ${message}`,
    `${bottomLeft}${horizontalWall.repeat(5)}${bottomRight}`,
  ].join('\n');
};

export default async ({ messages, configuration }: BlacksmithParams) => {
  const { cleanScreen, stdin, stdout } = configuration;

  const logUpdate = createLogUpdate(stdout, { showCursor: false });
  const readlineInterface = createInterface({
    input: stdin,
    escapeCodeTimeout: 50,
  });

  emitKeypressEvents(stdin, readlineInterface);

  let frame = 0;
  let cancelled = false;

  const done = async () => {
    stdin.off('keypress', done);
    if (stdin.isTTY) stdin.setRawMode(false);
    readlineInterface.close();
    cancelled = true;
    if (frame < messages.length - 1) {
      logUpdate.clear();
    } else if (cleanScreen) {
      logUpdate.clear();
    } else {
      logUpdate.done();
    }
  };

  if (stdin.isTTY) stdin.setRawMode(true);
  stdin.on('keypress', (str, key) => {
    if (stdin.isTTY) stdin.setRawMode(true);
    const k = action(key, true);
    if (k === 'abort') {
      done();
      return process.exit(0);
    }
    if (['up', 'down', 'left', 'right'].includes(k as any)) return;
    done();
  });

  const blacksmithMessages = Array.isArray(messages) ? messages : [messages];

  for (const blacksmithMessage of blacksmithMessages) {
    const message = Array.isArray(blacksmithMessage)
      ? blacksmithMessage
      : blacksmithMessage.split(' ');

    let currentMessage = [];
    let currentBlacksmithEye = random(blacksmithConfiguration.eyes);

    let blacksmithBlinking = 0;
    for (const word of [''].concat(message)) {
      if (word) currentMessage.push(word);
      const currentBlacksmithMouth = random(blacksmithConfiguration.mouths);

      if (blacksmithBlinking % 7 === 0) currentBlacksmithEye = random(blacksmithConfiguration.eyes);
      if (frame == 1) currentBlacksmithEye = currentBlacksmithEye;

      logUpdate(
        '\n' +
          generateBlacksmith({
            message: currentMessage.join(' '),
            body: { eye: currentBlacksmithEye, mouth: currentBlacksmithMouth },
          })
      );

      if (!cancelled) await sleep(randomBetween(75, 200));
      blacksmithBlinking++;
    }
    if (!cancelled) await sleep(100);

    const text =
      '\n' +
      generateBlacksmith({
        message: message.join(' '),
        body: {
          mouth: useAscii() ? 'u' : '◡',
          eye: useAscii() ? '^' : '◠',
        },
      });

    logUpdate(text);
    if (!cancelled) await sleep(randomBetween(1200, 1400));

    frame++;
  }
  stdin.off('keypress', done);
  await sleep(100);

  done();

  if (stdin.isTTY) stdin.setRawMode(false);
  stdin.removeAllListeners('keypress');
};
