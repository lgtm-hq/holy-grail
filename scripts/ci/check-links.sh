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

lychee \
	--no-progress \
	--format markdown \
	--exclude 'example\.com' \
	--exclude 'localhost' \
	--exclude '127\.0\.0\.1' \
	--exclude 'your-app' \
	--timeout 30 \
	--max-retries 3 \
	--accept '200..=204' \
	"${CONTENT_DIR}/**/*.mdx"
