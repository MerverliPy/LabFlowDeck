#!/usr/bin/env bash
set -Eeuo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

provider="${PROMPTFOO_TRUTH_PROVIDER:-openai:gpt-5-mini}"
template_file="promptfooconfig.truth.template.yaml"
resolved_file=".promptfoo-generated/promptfooconfig.truth.yaml"
repeat_count="${PROMPTFOO_REPEAT:-1}"

mkdir -p .promptfoo-generated

if [[ ! -f "$template_file" ]]; then
  echo "ERROR: missing $template_file" >&2
  exit 1
fi

sed "s|__PROMPTFOO_PROVIDER__|$provider|g" "$template_file" > "$resolved_file"

echo "Resolved Promptfoo provider: $provider"
echo "Resolved config: $resolved_file"

if [[ "${repeat_count}" =~ ^[0-9]+$ ]] && [[ "${repeat_count}" -gt 1 ]]; then
  pnpm exec promptfoo eval -c "$resolved_file" --no-cache --repeat "$repeat_count" "$@"
else
  pnpm exec promptfoo eval -c "$resolved_file" --no-cache "$@"
fi
