#!/usr/bin/env bash
set -euo pipefail

resolve_promptfoo_bin() {
  if [[ -n "${PROMPTFOO_BIN:-}" ]]; then
    printf '%s\n' "$PROMPTFOO_BIN"
    return 0
  fi

  if command -v promptfoo >/dev/null 2>&1; then
    command -v promptfoo
    return 0
  fi

  if [[ -x "./node_modules/.bin/promptfoo" ]]; then
    printf '%s\n' "./node_modules/.bin/promptfoo"
    return 0
  fi

  return 1
}

if ! PROMPTFOO_BIN="$(resolve_promptfoo_bin)"; then
  cat >&2 <<'MSG'
ERROR: promptfoo CLI is not available.
Tried:
- PROMPTFOO_BIN override
- global `promptfoo`
- local `./node_modules/.bin/promptfoo`

Install dependencies, then rerun this script.
MSG
  exit 127
fi

exec "$PROMPTFOO_BIN" eval -c promptfooconfig.workflow.yaml --no-cache
