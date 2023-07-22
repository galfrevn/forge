import { log } from '@/messages/banner';
import { title } from '@/messages/title';

import { textBold, textMain, textMuted, textSuccess } from '@/utils/text';

export const help = () =>
  showAvailableCommands({
    commandName: 'forge-app',
    headline: `Forge an app based on ${textMain('community templates')}`,
    tables: {
      Commands: [
        ['create * (required)', ' Create a new project.'],
        ['more', 'More commands comming soon'],
      ],
      Flags: [
        ['--help (-h)', 'See all available flags.'],
        ['--template <name>', 'Specify your template.'],
        ['--install / --no-install', 'Install dependencies (or not).'],
        ['--git / --no-git', 'Initialize git repo (or not).'],
        ['--dry-run', 'Walk through steps without executing.'],
        ['--fancy', 'Enable full unicode support for Windows.'],
        ['--skip-blacksmith', 'Skip Blacksmith interactions.'],
      ],
    },
  });

interface CalculateTablePaddingParams {
  rows: [string, string][];
}
const calculateTablePadding = ({ rows }: CalculateTablePaddingParams) => {
  return rows.reduce((val, [first]) => Math.max(val, first.length), 0);
};

interface ShowAvailableCommandsParams {
  commandName: string;
  headline?: string;
  usage?: string;
  tables?: Record<string, [command: string, help: string][]>;
  description?: string;
}

const showAvailableCommands = ({
  commandName,
  headline,
  usage,
  tables,
  description,
}: ShowAvailableCommandsParams) => {
  const stdout = process.stdout;

  const linebreak = () => '';
  const table = (rows: [string, string][], { padding }: { padding: number }) => {
    const split = stdout.columns < 60;
    let raw = '';

    for (const row of rows) {
      if (split) {
        raw += `    ${row[0]}\n    `;
      } else {
        raw += `${`${row[0]}`.padStart(padding)}`;
      }
      raw += '  ' + textMuted(row[1]) + '\n';
    }

    return raw.slice(0, -1); // remove latest \n
  };

  let message: string[] = [];

  if (headline) {
    message.push(
      `${title(commandName)} ${textMain(`v${process.env.PACKAGE_VERSION ?? ''}`)} ${headline}`
    );
  }

  if (usage) {
    message.push(linebreak(), `${textSuccess(commandName)} ${textBold(usage)}`);
  }

  if (tables) {
    const tableEntries = Object.entries(tables);
    const padding = Math.max(...tableEntries.map(([, rows]) => calculateTablePadding({ rows })));
    for (const [, tableRows] of tableEntries) {
      message.push(linebreak(), table(tableRows, { padding }));
    }
  }

  if (description) {
    message.push(linebreak(), `${description}`);
  }

  log(message.join('\n') + '\n');
};
