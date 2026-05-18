#!/usr/bin/env bash
# Run unit tests when tests/unit contains at least one *.test.ts file.
set -euo pipefail

if [[ -d tests/unit ]] && find tests/unit -name "*.test.ts" | grep -q .; then
	bun test tests/unit
else
	echo "No unit tests found, skipping"
fi
