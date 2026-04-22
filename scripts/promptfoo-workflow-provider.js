const fs = require('fs');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sectionBody(text, heading) {
  const match = text.match(new RegExp(`^## ${escapeRegExp(heading)}\\s*$\\n(.*?)(?=^## |$)`, 'ms'));
  return match ? match[1] : null;
}

function countChecklistItems(block) {
  let open = 0;
  let done = 0;
  if (!block) {
    return { open, done };
  }
  for (const line of block.split('\n')) {
    if (/^- \[ \] /.test(line)) open += 1;
    if (/^- \[[xX]\] /.test(line)) done += 1;
  }
  return { open, done };
}

function candidateBlock(backlog, candidateId) {
  if (!candidateId) return null;
  const match = backlog.match(new RegExp(`^  - id: ${escapeRegExp(candidateId)}\\n(.*?)(?=^  - id: |$)`, 'ms'));
  return match ? match[0] : null;
}

class WorkflowAuditProvider {
  constructor(options) {
    this.providerId = options.id || 'workflow-audit-local';
  }

  id() {
    return this.providerId;
  }

  async callApi(_prompt) {
    const readme = read('README.md');
    const agents = read('AGENTS.md');
    const phase = read('.opencode/plans/current-phase.md');
    const backlog = read('.opencode/backlog/candidates.yaml');

    const candidateId = (phase.match(/^Candidate ID:\s*(.+)$/m) || [])[1] || '';
    const phaseStatus = ((phase.match(/^Status:\s*(.+)$/m) || [])[1] || '').toLowerCase();
    const block = candidateBlock(backlog, candidateId) || '';
    const backlogExists = Boolean(block);
    const backlogCompleted = /^    status:\s*completed$/m.test(block);

    const tasks = countChecklistItems(sectionBody(phase, 'Task checklist'));
    const acceptance = countChecklistItems(sectionBody(phase, 'Acceptance criteria checks'));
    const warnings = [];
    if (!backlogExists) warnings.push('candidate_missing_from_backlog');
    if (phaseStatus === 'completed' && !backlogCompleted) warnings.push('current_phase_completed_but_backlog_not_reconciled');
    if (phaseStatus && phaseStatus !== 'completed' && backlogCompleted) warnings.push('backlog_completed_but_phase_still_active');

    const repoSummary = 'LabFlowDeck uses an internal OpenCode workflow around a bounded shell-first Next.js product, so workflow auditing must stay grounded in repo files and must not overstate runtime maturity.';

    const result = {
      repo_summary: repoSummary,
      runtime_truth: {
        shell_only_runtime: /bounded API contracts without claiming that live GitHub, host, auth, or deployment orchestration are fully implemented/i.test(readme),
        live_github_control: false,
        live_host_pairing: false,
        live_deploy_orchestration: false,
      },
      workflow_state: {
        current_candidate_id: candidateId,
        current_phase_status: phaseStatus,
        backlog_candidate_exists: backlogExists,
        backlog_marks_candidate_completed: backlogCompleted,
        drift_detected: warnings.length > 0,
        evidence_files: [
          'README.md',
          'AGENTS.md',
          '.opencode/plans/current-phase.md',
          '.opencode/backlog/candidates.yaml',
        ],
      },
      weak_points: [
        {
          title: 'Workflow truth guardrails depend on audit coverage',
          severity: 'medium',
          files: ['promptfooconfig.workflow.yaml', 'scripts/audit-workflow-opencode.sh', 'README.md', 'AGENTS.md'],
          reason: 'The workflow relies on eval configuration and prompt wording to keep shell-only runtime truth honest, so those guardrails need explicit coverage and grounding.',
          improvement: 'Keep the workflow audit grounded in README.md and AGENTS.md and fail when audit outputs imply live GitHub control, real host pairing, or live deploy orchestration.',
        },
        {
          title: 'Current phase still needs implementation and validation evidence',
          severity: 'medium',
          files: ['.opencode/plans/current-phase.md', '.opencode/backlog/candidates.yaml'],
          reason: `The active phase remains ${phaseStatus || 'unknown'} with ${tasks.open} open tasks and ${acceptance.open} open acceptance checks, so workflow evidence is not complete yet.`,
          improvement: 'Complete the active workflow-shell-truth-evals phase and record validation evidence from the declared audit command.',
        },
      ],
      next_action: {
        command: '/run-phase',
        reason: 'The active internal workflow phase is still in progress and should be completed before any further advancement.',
      },
    };

    if (!/Do not claim that GitHub linking, auth, host pairing, persistence, background execution, or live deployment orchestration are implemented/i.test(agents)) {
      result.weak_points.push({
        title: 'Agent contract drift risk',
        severity: 'low',
        files: ['AGENTS.md'],
        reason: 'If the repo-level agent contract stops carrying explicit runtime-truth guidance, audit outputs can drift toward overstated claims.',
        improvement: 'Keep AGENTS.md explicit about shell-only boundaries and runtime honesty.',
      });
    }

    return {
      output: JSON.stringify(result),
    };
  }
}

module.exports = WorkflowAuditProvider;
