#!/usr/bin/env bash
set -euo pipefail

echo "Removing backup files if present..."

rm -f AGENTS.md.bak
rm -f .opencode/agents/*.bak
rm -f .opencode/plans/*.bak

echo "Remaining backup files under .opencode (if any):"
find .opencode -type f -name '*.bak' -print || true
