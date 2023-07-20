const stdout = process.stdout;

export const log = (message: string) => stdout.write(message + '\n');
