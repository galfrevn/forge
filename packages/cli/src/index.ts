#!/usr/bin/env node
'use strict';

import { checkNodeVersion } from '@/lib/node';
import { getContext } from '@/components/context';

import { introduction } from '@/components/steps/introduction';
import { information } from '@/components/steps/information';
import { template } from '@/components/steps/template';
import { dependencies } from '@/components/steps/dependencies';
import { repository } from '@/components/steps/repository';
import { success } from '@/components/steps/success';
import { help } from '@/components/steps/help';

checkNodeVersion();

const exit = () => process.exit(0);

process.on('SIGINT', exit);
process.on('SIGTERM', exit);

// Please also update the installation instructions in the docs at
// if you make any changes to the flow or wording here.
async function forgeCommandsInterface() {
  // NOTE: In the v7.x version of npm, the default behavior of `npm init` was changed
  // to no longer require `--` to pass args and instead pass `--` directly to us. This
  // broke our arg parser, since `--` is a special kind of flag. Filtering for `--` here
  // fixes the issue so that forge now works on all npm versions.
  const requestedArguments = process.argv.slice(2).filter((arg) => arg !== '--');
  const context = await getContext(requestedArguments.filter((arg) => arg !== 'create'));

  if (!requestedArguments.includes('create') || context.help) return help();

  const steps = [introduction, information, template, dependencies, repository, success];

  for (const step of steps) {
    await step(context);
  }

  process.exit(0);
}

forgeCommandsInterface();
