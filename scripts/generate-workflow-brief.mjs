#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

function firstMatch(text, regex, fallback = '') {
  const match = text.match(regex);
  return match ? match[1].trim() : fallback;
}

function extractSection(text, heading) {
  const lines = text.split(/\r?\n/);
  const startIndex = lines.findIndex((line) => line.trim() === `## ${heading}`);

  if (startIndex === -1) {
    return '';
  }

  const body = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    if (lines[index].startsWith('## ')) {
      break;
    }
    body.push(lines[index]);
  }

  return body.join('\n').trim();
}

function parsePendingCandidates(backlogText, limit = 6) {
  const blocks = backlogText.split(/^  - id: /m).slice(1);
  const candidates = [];

  for (const block of blocks) {
    const full = `  - id: ${block}`;
    const id = firstMatch(full, /^  - id: (.+)$/m);
    const title = firstMatch(full, /^    title: (.+)$/m);
    const status = firstMatch(full, /^    status: (.+)$/m, 'pending');
    const module = firstMatch(full, /^    module: (.+)$/m);
    const priority = Number(firstMatch(full, /^    priority: (.+)$/m, '0'));

    if (status === 'pending') {
      candidates.push({ id, title, module, priority });
    }
  }

  return candidates.sort((a, b) => b.priority - a.priority).slice(0, limit);
}

const readme = read('README.md');
const agents = read('AGENTS.md');
const backlog = read('.opencode/backlog/candidates.yaml');
const phase = read('.opencode/plans/current-phase.md');

const currentCandidateId = firstMatch(phase, /^Candidate ID: (.+)$/m);
const currentStatus = firstMatch(phase, /^Status: (.+)$/m);
const goal = extractSection(phase, 'Goal');
const inScope = extractSection(phase, 'In scope');
const outOfScope = extractSection(phase, 'Out of scope');
const implemented = extractSection(readme, 'Current implemented surfaces');
const notImplemented = extractSection(readme, 'Not implemented yet');
const repoTruth = extractSection(agents, 'Repo truth');
const topPending = parsePendingCandidates(backlog);

const output = `# Workflow Brief

Generated from durable repo files for lower-token routine agent turns.

## Repo truth
${repoTruth}

## Implemented surfaces
${implemented}

## Not implemented yet
${notImplemented}

## Active phase
- Candidate ID: ${currentCandidateId}
- Status: ${currentStatus}

### Goal
${goal}

### In scope
${inScope}

### Out of scope
${outOfScope}

## Top pending backlog candidates
${topPending.map((item) => `- [p${item.priority}] ${item.id} — ${item.title} (${item.module})`).join('\n')}
`;

const outputPath = path.join(root, '.opencode', 'workflow-brief.md');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output);
console.log(outputPath);
