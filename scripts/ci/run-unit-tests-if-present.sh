#!/usr/bin/env bash
# Run unit tests when a supported layout is detected.
#
# Detects (independently):
#   * TypeScript unit tests under tests/unit/*.test.ts (executed via `bun test`).
#   * Python unit tests under tests/ci/test_*.py (executed via `uv run pytest`).
#
# The TypeScript and Python trees are intentionally disjoint so this script
# can gate future Playwright #115 work without colliding with the current
# Python coverage for scripts/ci/. When the Python path is taken and `uv`
# is not on PATH (the reusable-build-artifact runner provisions Node.js /
# Bun but not uv), the Astral installer is invoked to install it on-demand
# for the duration of the job.
set -euo pipefail

ran_any=0

if [[ -d tests/unit ]] && find tests/unit -name "*.test.ts" | grep -q .; then
	bun test tests/unit
	ran_any=1
fi

if [[ -d tests/ci ]] && find tests/ci -name "test_*.py" | grep -q .; then
	if ! command -v uv >/dev/null 2>&1; then
		echo "[run-unit-tests] uv not found; installing via Astral installer"
		curl -LsSf https://astral.sh/uv/install.sh | sh
		# The installer places uv under ~/.local/bin (or $XDG_BIN_HOME); add
		# both candidates to PATH so the subsequent invocation resolves.
		export PATH="${HOME}/.local/bin:${XDG_BIN_HOME:-${HOME}/.local/bin}:${PATH}"
		hash -r
	fi
	uv run pytest tests/ci
	ran_any=1
fi

if [[ "$ran_any" -eq 0 ]]; then
	echo "No unit tests found, skipping"
fi
