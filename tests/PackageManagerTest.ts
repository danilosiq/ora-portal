/** @jest-environment node */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
const expectedAgent = manifest.packageManager.replace('@', '/');

function checkManager(userAgent?: string) {
  const environment = { ...process.env };
  delete environment.npm_config_user_agent;
  if (userAgent !== undefined) environment.npm_config_user_agent = userAgent;
  return spawnSync(process.execPath, [path.join(root, 'scripts/CheckPackageManager.mjs')], {
    cwd: root,
    env: environment,
    encoding: 'utf8',
  });
}

describe('Mandatory Yarn policy', () => {
  it('pins an exact Yarn version and keeps node_modules resolution', () => {
    expect(manifest.packageManager).toMatch(/^yarn@\d+\.\d+\.\d+$/);
    expect(readFileSync(path.join(root, '.yarnrc.yml'), 'utf8')).toMatch(
      /^nodeLinker: node-modules$/m,
    );
  });

  it('accepts the declared Yarn version', () => {
    const result = checkManager(expectedAgent + ' npm/? node/v22.23.1');
    expect(result.status).toBe(0);
    expect(result.stderr).toBe('');
  });

  it.each([
    undefined,
    'npm/10.9.2 node/v22.23.1',
    'pnpm/10.0.0 npm/? node/v22.23.1',
    'bun/1.2.0 node/v22.23.1',
    'yarn/0.0.0 npm/? node/v22.23.1',
    'not-yarn/4.18.1',
  ])('rejects missing, alternative or mismatched package manager %s', (userAgent) => {
    const result = checkManager(userAgent);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('Este projeto exige ' + manifest.packageManager);
    expect(result.stderr).toContain('yarn install --immutable');
  });

  it('uses only the Yarn lockfile', () => {
    expect(existsSync(path.join(root, 'yarn.lock'))).toBe(true);
    for (const name of [
      'package-lock.json',
      'npm-shrinkwrap.json',
      'pnpm-lock.yaml',
      'bun.lock',
      'bun.lockb',
    ]) {
      expect(existsSync(path.join(root, name))).toBe(false);
    }
  });

  it('guards installations and fullcheck, and never invokes another manager in scripts', () => {
    expect(manifest.scripts.preinstall).toBe('node scripts/CheckPackageManager.mjs');
    expect(manifest.scripts['check:package-manager']).toBe('node scripts/CheckPackageManager.mjs');
    expect(manifest.scripts.fullcheck).toMatch(/^yarn check:package-manager && /);
    expect(manifest.scripts.fullcheck).toContain('yarn test:coverage');
    expect(manifest.scripts['test:coverage']).toBe('yarn test --coverage');
    for (const command of Object.values(manifest.scripts)) {
      expect(command).not.toMatch(/\b(?:npm|npx|pnpm|bun)\b/);
    }
  });

  it('documents Yarn as mandatory and provides immutable setup and validation commands', () => {
    const agents = readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
    const readme = readFileSync(path.join(root, 'README.md'), 'utf8');
    expect(agents).toContain('Utilizar obrigatoriamente Yarn');
    for (const content of [agents, readme]) {
      expect(content).toContain('yarn install --immutable');
      expect(content).toContain('yarn fullcheck');
      expect(content).not.toMatch(/`(?:npm|npx|pnpm) (?:run|install|ci|test|exec)\b/);
    }
  });
});
