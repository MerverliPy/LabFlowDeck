import fs from 'node:fs';
import path from 'node:path';

const CONFIG_PATH = path.resolve('opencode.json');

const PRESETS = {
  openai: {
    label: 'OpenAI',
    model: 'openai/gpt-5.4',
    smallModel: 'openai/gpt-5.4-mini',
  },
  copilot: {
    label: 'GitHub Copilot',
    model: 'github-copilot/gpt-5.4',
    smallModel: 'github-copilot/gpt-5.4',
    note: 'Copilot mode currently uses the same verified model for both model slots to keep the provider fully manual and single-source.',
  },
};

function printUsage() {
  console.log('Usage: pnpm workflow:provider -- <openai|copilot|current> [--dry-run]');
}

function readConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

function inferProvider(model) {
  if (typeof model !== 'string') {
    return 'unknown';
  }

  if (model.startsWith('openai/')) {
    return 'openai';
  }

  if (model.startsWith('github-copilot/')) {
    return 'copilot';
  }

  return 'unknown';
}

function printCurrent(config) {
  const currentProvider = inferProvider(config.model);
  console.log(`Current provider: ${currentProvider}`);
  console.log(`model: ${config.model}`);
  console.log(`small_model: ${config.small_model}`);
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const target = args.find((arg) => !arg.startsWith('--'));

if (!target) {
  printUsage();
  process.exit(1);
}

const config = readConfig();

if (target === 'current') {
  printCurrent(config);
  process.exit(0);
}

if (!(target in PRESETS)) {
  console.error(`Unknown provider: ${target}`);
  printUsage();
  process.exit(1);
}

const preset = PRESETS[target];
const currentProvider = inferProvider(config.model);

console.log(`Current provider: ${currentProvider}`);
console.log(`Target provider: ${target}`);
console.log(`model: ${config.model} -> ${preset.model}`);
console.log(`small_model: ${config.small_model} -> ${preset.smallModel}`);

if (preset.note) {
  console.log(`Note: ${preset.note}`);
}

if (dryRun) {
  console.log('Dry run only; opencode.json was not changed.');
  process.exit(0);
}

const nextConfig = {
  ...config,
  model: preset.model,
  small_model: preset.smallModel,
};

fs.writeFileSync(CONFIG_PATH, `${JSON.stringify(nextConfig, null, 2)}\n`);
console.log(`Updated ${path.relative(process.cwd(), CONFIG_PATH)} to ${preset.label}.`);
