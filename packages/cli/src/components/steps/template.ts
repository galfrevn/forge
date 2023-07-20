import type { Context } from '@/components/context';
import { spinner } from '@/components/spinner';

import { errorMessage } from '@/messages/error';
import { infoMessage } from '@/messages/info';
import { title } from '@/messages/title';

import { textMuted, textNormal } from '@/utils/text';

import fs from 'node:fs';
import path from 'node:path';

import { downloadTemplate } from 'giget';

interface TemplateStepParams
  extends Pick<Context, 'template' | 'prompt' | 'projectName' | 'dryRun' | 'exit'> {}

export const template = async (context: TemplateStepParams) => {
  if (!context.template) {
    const { template: selectedTemplate } = await context.prompt({
      name: 'template',
      type: 'select',
      label: title('Template'),
      message: 'How would you like to start your new project?',
      initial: 'fincast',
      choices: [
        {
          value: 'fincast',
          label: 'Fincast',
          hint: 'SST Monorepo (AWS Lambda + Serverless NextJS Site)',
        },
      ],
    });
    context.template = selectedTemplate;
  } else {
    await infoMessage({
      prefix: 'Forging app',
      message: `using ${textNormal(context.template)}${textMuted(' as template')}`,
    });
  }

  if (context.template && context.projectName) {
    await spinner({
      start: 'Forging your new app...',
      end: 'Project successfully forged!',
      while: () =>
        copyTemplate({ context: context as Context, template: context.template as string }).catch(
          (templateCopyError) => {
            if (templateCopyError instanceof Error) {
              errorMessage({ prefix: 'error', message: templateCopyError.message });
              process.exit(1);
            } else {
              errorMessage({ prefix: 'error', message: 'Unable to clone template.' });
              process.exit(1);
            }
          }
        ),
    });
  } else {
    context.exit(1);
  }
};

interface GenerateTemplateTargetParams {
  template: string;
}

const generateTemplateTarget = ({ template }: GenerateTemplateTargetParams) =>
  `galfrevn/forge/examples/${template}`;

interface CopyTemplateParams {
  template: string;
  context: Context;
}

export const copyTemplate = async ({ context, template }: CopyTemplateParams) => {
  const templateTarget = generateTemplateTarget({ template });

  try {
    await downloadTemplate(templateTarget, {
      cwd: context.currentWorkingDirectory,
      provider: 'github',
      force: true,
      dir: '.',
    });
  } catch (templateCopyError: any) {
    fs.rmdirSync(context.currentWorkingDirectory);

    if (templateCopyError.message.includes('404'))
      throw new Error(`Template ${textNormal(template)} ${textMuted('does not exist!')}`);
    else throw new Error(templateCopyError.message);
  }

  // It's possible the repo exists (ex. `withastro/astro`),
  // But the template route is invalid (ex. `withastro/astro/examples/DNE`).
  // `giget` doesn't throw for this case,
  // so check if the directory is still empty as a heuristic.
  if (fs.readdirSync(context.currentWorkingDirectory).length === 0)
    throw new Error(`Template ${textNormal(template)} ${textMuted('is empty!')}`);

  // Post-process in parallel
  const removeFiles = FILES_TO_REMOVE.map(async (file) => {
    const fileLoc = path.resolve(path.join(context.currentWorkingDirectory, file));
    if (fs.existsSync(fileLoc)) {
      return fs.promises.rm(fileLoc, { recursive: true });
    }
  });

  const updateFiles = Object.entries(FILES_TO_UPDATE).map(async ([file, update]) => {
    const fileLoc = path.resolve(path.join(context.currentWorkingDirectory, file));
    if (fs.existsSync(fileLoc)) {
      return update(fileLoc, { name: context.projectName! });
    }
  });

  await Promise.all([...removeFiles, ...updateFiles]);
};

const FILES_TO_REMOVE = ['sandbox.config.json', 'CHANGELOG.md'];
const FILES_TO_UPDATE = {
  'package.json': (file: string, overrides: { name: string }) =>
    fs.promises.readFile(file, 'utf-8').then((value) => {
      const indent = /(^\s+)/m.exec(value)?.[1] ?? '\t';
      fs.promises.writeFile(
        file,
        JSON.stringify(
          Object.assign(JSON.parse(value), Object.assign(overrides, { private: undefined })),
          null,
          indent
        ),
        'utf-8'
      );
    }),
};
