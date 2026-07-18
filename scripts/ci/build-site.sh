#!/usr/bin/env bash
# Build the site for CI: install Bun, install deps, type check, unit test, build.
# Called by: quality-ci.yml via lgtm-ci reusable-build-artifact (build-command).
# The reusable provisions Node.js only, so Bun is installed here when absent.
set -euo pipefail

# Pinned for deterministic CI installs; keep in sync with package.json engines.
BUN_VERSION="${BUN_VERSION:-1.3.14}"

if ! command -v bun >/dev/null 2>&1; then
	echo "[build-site] Bun not found; installing bun@${BUN_VERSION} via npm"
	npm install -g "bun@${BUN_VERSION}"
fi

bun install --frozen-lockfile
bun run astro check
bash scripts/ci/run-unit-tests-if-present.sh
bun run build
