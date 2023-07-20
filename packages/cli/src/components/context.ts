import arg from 'arg';
import detectPackageManager from 'which-pm-runs';

import * as os from 'node:os';

import prompt from '@/components/prompt';
import { getCurrentUser, getForgePackageVersion } from '@/configuration/metadata';

export interface Context {
  currentWorkingDirectory: string;
  help: boolean;
  prompt: typeof prompt;
  packageManager: string;
  username: string;
  version: string;
  skipBlacksmith: boolean;
  dryRun?: boolean;
  projectName?: string;
  template?: string;
  install?: boolean;
  git?: boolean;
  stdin?: typeof process.stdin;
  stdout?: typeof process.stdout;
  exit(code: number): never;
}

export async function getContext(requestedArguments: string[]): Promise<Context> {
  const currentArgumentFlags = arg(
    {
      '--help': Boolean,
      '--template': String,
      '--install': Boolean,
      '--no-install': Boolean,
      '--git': Boolean,
      '--no-git': Boolean,
      '--fancy': Boolean,
      '--dry-run': Boolean,
      '--skip-blacksmith': Boolean,

      '-y': '--yes',
      '-n': '--no',
      '-h': '--help',
      '-t': '--template',
    },
    { argv: requestedArguments, permissive: true }
  );

  const packageManager = detectPackageManager()?.name ?? 'npm';
  const [username, version] = await Promise.all([getCurrentUser(), getForgePackageVersion()]);

  let currentWorkingDirectory = currentArgumentFlags['_'][0];
  let {
    '--help': help = false,
    '--template': template,
    '--install': install,
    '--no-install': noInstall,
    '--git': git,
    '--no-git': noGit,
    '--fancy': fancy,
    '--dry-run': dryRun,
    '--skip-blacksmith': skipBlacksmith,
  } = currentArgumentFlags;

  let projectName = currentWorkingDirectory;

  skipBlacksmith =
    ((os.platform() === 'win32' && !fancy) || skipBlacksmith) ??
    [install, git].some((v) => v !== undefined);

  return {
    help,
    prompt,
    packageManager,
    username,
    version,
    skipBlacksmith: false,
    dryRun,
    projectName,
    template,
    install: install ?? (noInstall ? false : undefined),
    git: git ?? (noGit ? false : undefined),
    currentWorkingDirectory,
    exit(code) {
      process.exit(code);
    },
  };
}
