import { readFileSync } from 'node:fs';

const { packageManager } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);
const expected = packageManager.replace('@', '/');
const actual = process.env.npm_config_user_agent?.split(' ')[0];

if (actual !== expected) {
  process.stderr.write(
    `Este projeto exige ${packageManager}. Ative o Corepack com "corepack enable" e utilize "yarn install --immutable" ou "yarn fullcheck".\n`,
  );
  process.exitCode = 1;
}
