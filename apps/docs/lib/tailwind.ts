import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { environmentVariables } from 'environment.mjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${environmentVariables.NEXT_PUBLIC_APP_URL}${path}`;
}
