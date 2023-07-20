#!/usr/bin/env node
'use strict';

import { checkNodeVersion } from '@/lib/node';
import { getContext } from '@/components/context';

import { introduction } from '@/components/steps/introduction';
import { information } from '@/components/steps/information';
import { template } from '@/components/steps/template';

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
  const context = await getContext(requestedArguments);

  /* if (context.help) return help(); */

  const steps = [introduction, information, template];

  for (const step of steps) {
    await step(context);
  }

  process.exit(0);
}

forgeCommandsInterface();

export { getContext, introduction };
