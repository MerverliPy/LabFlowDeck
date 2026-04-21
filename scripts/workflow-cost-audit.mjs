#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));
const estimateTokens = (text) => Math.ceil(text.length / 4);

const mandatoryByRole = {
  orchestrator: [
    'AGENTS.md',
    'SPEC.md',
    'README.md',
    '.opencode/backlog/candidates.yaml',
    '.opencode/plans/current-phase.md',
    '.opencode/agents/orchestrator.md',
  ],
  builder: ['AGENTS.md', '.opencode/plans/current-phase.md', '.opencode/agents/builder.md'],
  validator: ['AGENTS.md', '.opencode/plans/current-phase.md', '.opencode/agents/validator.md'],
  shipper: ['.opencode/agents/shipper.md'],
  workflow_audit_promptfoo: [
    'AGENTS.md',
    'opencode.json',
    '.opencode/backlog/candidates.yaml',
    '.opencode/plans/current-phase.md',
    '.opencode/commands/phase-status.md',
    '.opencode/commands/next-phase.md',
    '.opencode/commands/finish-phase.md',
    'promptfooconfig.workflow.yaml',
  ],
};

function summarizeRole(role, files) {
  const present = files.filter(exists);
  const missing = files.filter((file) => !exists(file));
  const items = present.map((file) => {
    const text = read(file);
    return {
      file,
      chars: text.length,
      estTokens: estimateTokens(text),
      lines: text.split(/\r?\n/).length,
    };
  });

  return {
    role,
    files: items,
    missing,
    totalChars: items.reduce((sum, item) => sum + item.chars, 0),
    totalEstTokens: items.reduce((sum, item) => sum + item.estTokens, 0),
  };
}

const roles = Object.entries(mandatoryByRole).map(([role, files]) => summarizeRole(role, files));

const combinedCounts = new Map();
for (const { files } of roles) {
  for (const item of files) {
    combinedCounts.set(item.file, (combinedCounts.get(item.file) || 0) + 1);
  }
}

const duplicated = [...combinedCounts.entries()]
  .filter(([, count]) => count > 1)
  .map(([file, count]) => {
    const text = read(file);
    return {
      file,
      repeatedInRoles: count,
      estTokens: estimateTokens(text),
      repeatedTokenLoad: estimateTokens(text) * count,
    };
  })
  .sort((a, b) => b.repeatedTokenLoad - a.repeatedTokenLoad);

const totalSinglePassTokens = roles.reduce((sum, role) => sum + role.totalEstTokens, 0);
const mostExpensiveRole = roles.reduce((best, role) => (role.totalEstTokens > best.totalEstTokens ? role : best), roles[0]);

const report = {
  headline: {
    totalSinglePassTokens,
    mostExpensiveRole: mostExpensiveRole.role,
    heaviestMandatoryFile: duplicated[0]?.file || null,
  },
  roles,
  duplicatedFiles: duplicated,
  recommendations: [
    {
      title: 'Stop reading SPEC.md on every orchestrator pass',
      why: 'SPEC.md dominates the mandatory prompt footprint and is mostly stable product context.',
      action: 'Generate a shorter workflow brief for routine work and reserve full SPEC.md reads for new surface selection or scope disputes.',
    },
    {
      title: 'Replace full backlog reads with a lean backlog summary',
      why: 'The backlog is large and mostly historical state. Most turns only need current candidate plus the highest-value pending candidates.',
      action: 'Generate a pending-candidates digest and keep the YAML as the durable source of truth.',
    },
    {
      title: 'Shorten current-phase selection evidence after completion',
      why: 'Completed current-phase files carry long historical reasoning that is useful for audits but expensive for every future turn.',
      action: 'Archive the full record and keep current-phase focused on the executable state.',
    },
    {
      title: 'Use deterministic audits before LLM audits',
      why: 'The promptfoo/opencode audit path duplicates large file reads just to answer workflow-state questions.',
      action: 'Run the shell/python audits first and call the LLM audit only when deterministic checks find ambiguity.',
    },
  ],
};

console.log(JSON.stringify(report, null, 2));
