import * as path from 'node:path';

import type { Context } from '@/components/context';

import { log } from '@/messages/banner';
import { title } from '@/messages/title';
import { infoMessage } from '@/messages/info';

import { textMuted, textNormal } from '@/utils/text';

import { isEmpty, toValidName } from '@/validations/information';

interface InformationStepParams
  extends Pick<Context, 'currentWorkingDirectory' | 'prompt' | 'projectName' | 'exit'> {}

export const information = async (context: InformationStepParams) => {
  await checkCurrentWorkingDirectory(context.currentWorkingDirectory);

  if (!context.currentWorkingDirectory || !isEmpty(context.currentWorkingDirectory)) {
    if (!isEmpty(context.currentWorkingDirectory)) {
      await infoMessage({
        prefix: 'Hmm...',
        message: `${textNormal(`"${context.currentWorkingDirectory}"`)}${textMuted(
          ` directory is not empty!`
        )}`,
      });
    }

    const { name } = await context.prompt({
      name: 'name',
      type: 'text',
      label: title('Bootstap'),
      message: 'Where should we create your new project?',
      initial: `Name of your project`,
      validate(value: string) {
        if (!isEmpty(value)) {
          return `Directory is not empty!`;
        }
        // Check for non-printable characters
        if (value.match(/[^\x20-\x7E]/g) !== null)
          return `Invalid non-printable character present!`;
        return true;
      },
    });

    context.currentWorkingDirectory = name!;
    context.projectName = toValidName(name!);

  } else {
    
    let name = context.currentWorkingDirectory;
    if (name === '.' || name === './') {
      const parts = process.cwd().split(path.sep);
      name = parts[parts.length - 1];
    } else if (name.startsWith('./') || name.startsWith('../')) {
      const parts = name.split('/');
      name = parts[parts.length - 1];
    }
    context.projectName = toValidName(name);
  }

  if (!context.currentWorkingDirectory) {
    context.exit(1);
  }
};

async function checkCurrentWorkingDirectory(currentWorkingDirectory: string | undefined) {
  const emptyDirectory = currentWorkingDirectory && isEmpty(currentWorkingDirectory);

  if (emptyDirectory) {
    log('');
    await infoMessage({
      prefix: 'directory',
      message: `Using ${textNormal(currentWorkingDirectory)}${textMuted(' as project directory')}`,
    });
  }

  return emptyDirectory;
}
