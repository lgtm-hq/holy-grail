#!/usr/bin/env bash
# Build static HTML for the Quality Links lychee job.
# Uses ASTRO_BASE=/ so rendered hrefs match /guides/<slug>/ and --root-dir dist.
# Skips astro check and pagefind; those run in quality-ci.yml.
set -euo pipefail

if ! command -v bun >/dev/null 2>&1; then
	echo "[build-site-for-links] bun is required" >&2
	exit 1
fi

if [[ ! -f package.json ]]; then
	echo "[build-site-for-links] run from the repository root" >&2
	exit 1
fi

export ASTRO_BASE=/
echo "[build-site-for-links] ASTRO_BASE=${ASTRO_BASE} bun run astro build"
bun run astro build
