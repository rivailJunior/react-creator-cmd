import { parseArgs } from 'node:util';

export interface CliFlags {
  name?: string;
  unit?: string;
  e2e?: string;
  lint?: string;
  ui?: string;
  docker?: string;
  storybook?: string;
}

const VALID_UNITS = ['vitest', 'jest'] as const;
const VALID_E2E = ['playwright', 'cypress'] as const;
const VALID_LINT = ['biome', 'eslint'] as const;
const VALID_UI = ['shadcn', 'none'] as const;
const VALID_DOCKER = ['docker', 'none'] as const;
const VALID_STORYBOOK = ['storybook', 'none'] as const;

const validateOption = <T extends string>(
  value: string | undefined,
  validValues: readonly T[],
  flagName: string,
): T | undefined => {
  if (!value) return undefined;
  if (validValues.includes(value as T)) return value as T;
  throw new Error(
    `Invalid --${flagName} value "${value}". Valid options: ${validValues.join(', ')}`,
  );
};

export const parseCliArgs = (argv: string[] = process.argv): CliFlags => {
  const { values } = parseArgs({
    args: argv.slice(2),
    options: {
      name: { type: 'string' },
      unit: { type: 'string' },
      e2e: { type: 'string' },
      lint: { type: 'string' },
      ui: { type: 'string' },
      docker: { type: 'string' },
      storybook: { type: 'string' },
    },
    strict: false,
  });

  return {
    name: values.name as string | undefined,
    unit: validateOption(
      values.unit as string | undefined,
      VALID_UNITS,
      'unit',
    ),
    e2e: validateOption(values.e2e as string | undefined, VALID_E2E, 'e2e'),
    lint: validateOption(values.lint as string | undefined, VALID_LINT, 'lint'),
    ui: validateOption(values.ui as string | undefined, VALID_UI, 'ui'),
    docker: validateOption(
      values.docker as string | undefined,
      VALID_DOCKER,
      'docker',
    ),
    storybook: validateOption(
      values.storybook as string | undefined,
      VALID_STORYBOOK,
      'storybook',
    ),
  };
};

export const hasAllFlags = (flags: CliFlags): boolean =>
  Boolean(
    flags.name &&
    flags.unit &&
    flags.e2e &&
    flags.lint &&
    flags.ui &&
    flags.docker &&
    flags.storybook,
  );
