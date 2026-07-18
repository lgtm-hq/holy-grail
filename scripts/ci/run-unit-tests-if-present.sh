#!/usr/bin/env bash
# Run unit tests when a supported layout is detected.
#
# Detects (independently):
#   * TypeScript unit tests under tests/unit/*.test.ts (executed via `bun test`).
#   * Python unit tests under tests/ci/test_*.py (executed via `uv run pytest`).
#
# The TypeScript and Python trees are intentionally disjoint so this script
# can gate future Playwright #115 work without colliding with the current
# Python coverage for scripts/ci/.
set -euo pipefail

ran_any=0

if [[ -d tests/unit ]] && find tests/unit -name "*.test.ts" | grep -q .; then
	bun test tests/unit
	ran_any=1
fi

if [[ -d tests/ci ]] && find tests/ci -name "test_*.py" | grep -q .; then
	uv run pytest tests/ci
	ran_any=1
fi

if [[ "$ran_any" -eq 0 ]]; then
	echo "No unit tests found, skipping"
fi
