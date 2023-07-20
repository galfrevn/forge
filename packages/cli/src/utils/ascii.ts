import { platform } from 'node:os';

const unicode = { enabled: platform() !== 'win32' };

export const useAscii = () => !unicode.enabled;
export const forceUnicode = () => {
  unicode.enabled = true;
};
