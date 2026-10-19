import { describe, it, expect } from 'vitest';
import { parseCliArgs, hasAllFlags, CliFlags } from '../usecases/parse-cli-args';

describe('parseCliArgs', () => {
  const buildArgv = (flags: string[]) => ['node', 'react-creator', ...flags];

  it('should return empty flags when no arguments are passed', () => {
    const result = parseCliArgs(buildArgv([]));
    expect(result).toEqual({
      name: undefined,
      unit: undefined,
      e2e: undefined,
      lint: undefined,
      ui: undefined,
    });
  });

  it('should parse all flags correctly', () => {
    const result = parseCliArgs(
      buildArgv([
        '--name', 'my-app',
        '--unit', 'vitest',
        '--e2e', 'playwright',
        '--lint', 'biome',
        '--ui', 'shadcn',
      ]),
    );
    expect(result).toEqual({
      name: 'my-app',
      unit: 'vitest',
      e2e: 'playwright',
      lint: 'biome',
      ui: 'shadcn',
    });
  });

  it('should parse partial flags', () => {
    const result = parseCliArgs(buildArgv(['--name', 'my-app', '--unit', 'jest']));
    expect(result.name).toBe('my-app');
    expect(result.unit).toBe('jest');
    expect(result.e2e).toBeUndefined();
    expect(result.lint).toBeUndefined();
    expect(result.ui).toBeUndefined();
  });

  it('should throw on invalid --unit value', () => {
    expect(() =>
      parseCliArgs(buildArgv(['--unit', 'mocha'])),
    ).toThrow('Invalid --unit value "mocha". Valid options: vitest, jest');
  });

  it('should throw on invalid --e2e value', () => {
    expect(() =>
      parseCliArgs(buildArgv(['--e2e', 'selenium'])),
    ).toThrow('Invalid --e2e value "selenium". Valid options: playwright, cypress');
  });

  it('should throw on invalid --lint value', () => {
    expect(() =>
      parseCliArgs(buildArgv(['--lint', 'tslint'])),
    ).toThrow('Invalid --lint value "tslint". Valid options: biome, eslint');
  });

  it('should throw on invalid --ui value', () => {
    expect(() =>
      parseCliArgs(buildArgv(['--ui', 'material'])),
    ).toThrow('Invalid --ui value "material". Valid options: shadcn, none');
  });
});

describe('hasAllFlags', () => {
  it('should return true when all flags are present', () => {
    const flags: CliFlags = {
      name: 'my-app',
      unit: 'vitest',
      e2e: 'playwright',
      lint: 'biome',
      ui: 'shadcn',
    };
    expect(hasAllFlags(flags)).toBe(true);
  });

  it('should return false when some flags are missing', () => {
    const flags: CliFlags = { name: 'my-app', unit: 'vitest' };
    expect(hasAllFlags(flags)).toBe(false);
  });

  it('should return false when no flags are present', () => {
    expect(hasAllFlags({})).toBe(false);
  });
});
