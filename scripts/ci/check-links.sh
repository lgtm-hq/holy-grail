#!/usr/bin/env bash
set -euo pipefail

# Check external links in MDX content files
#
# Usage: ./scripts/ci/check-links.sh
#
# Requires: lychee (https://github.com/lycheeverse/lychee)

CONTENT_DIR="src/content"

if ! command -v lychee &>/dev/null; then
	echo "Error: lychee is not installed"
	exit 1
fi

echo "Checking external links in ${CONTENT_DIR}/**/*.mdx ..."

# Exclusions:
#   example.com, localhost, 127.0.0.1 — non-routable/documentation domains
#   your-app(.|$) — placeholder hostnames in guide code examples (your-app, your-app.example.com)
#   github.com, raw.githubusercontent.com — rate-limited, causes intermittent CI failures
#   npmjs.com, registry.npmjs.org — rate-limited

lychee \
	--no-progress \
	--format markdown \
	--exclude 'example\.com' \
	--exclude 'localhost' \
	--exclude '127\.0\.0\.1' \
	--exclude 'your-app(\.|$)' \
	--exclude 'github\.com' \
	--exclude 'raw\.githubusercontent\.com' \
	--exclude 'npmjs\.com' \
	--exclude 'registry\.npmjs\.org' \
	--timeout 30 \
	--max-retries 3 \
	--accept '200..=204' \
	"${CONTENT_DIR}/**/*.mdx"
