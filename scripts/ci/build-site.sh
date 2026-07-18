#!/usr/bin/env bash
# Build the site for CI: install Bun, install deps, type check, unit test, build.
# Called by: quality-ci.yml via lgtm-ci reusable-build-artifact (build-command).
# The reusable provisions Node.js only, so Bun is installed here when absent.
set -euo pipefail

if ! command -v bun >/dev/null 2>&1; then
	echo "[build-site] Bun not found; installing via npm"
	npm install -g bun
fi

bun install --frozen-lockfile
bun run astro check
bash scripts/ci/run-unit-tests-if-present.sh
bun run build
