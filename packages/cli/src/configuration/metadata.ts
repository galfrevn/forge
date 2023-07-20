import { exec } from 'node:child_process';
import execa from 'execa';

import detectPackageManager from 'which-pm-runs';

export const getCurrentUser = () =>
  new Promise<string>((resolve) => {
    exec('git config user.name', { encoding: 'utf-8' }, (_1, gitName) => {
      if (gitName.trim()) return resolve(gitName.split(' ')[0].trim());

      exec('whoami', { encoding: 'utf-8' }, (_3, whoami) => {
        if (whoami.trim()) return resolve(whoami.split(' ')[0].trim());
        return resolve('warrior');
      });
    });
  });

let currentVersion: string;

export const getForgePackageVersion = () =>
  new Promise<string>(async (resolve) => {
    if (currentVersion) return resolve(currentVersion);
    let registry = await getRegistry();
    const { version } = await fetch(`${registry}/astro/latest`, { redirect: 'follow' }).then(
      (res) => res.json()
    );
    currentVersion = version;
    resolve(version);
  });

export async function getRegistry(): Promise<string> {
  const packageManager = detectPackageManager()?.name || 'npm';
  try {
    const { stdout } = await execa(packageManager, ['config', 'get', 'registry']);
    return stdout?.trim()?.replace(/\/$/, '') || 'https://registry.npmjs.org';
  } catch (e) {
    return 'https://registry.npmjs.org';
  }
}
