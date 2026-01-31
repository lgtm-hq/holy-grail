#!/usr/bin/env bash
# Check if JavaScript/TypeScript source files exist in the repository
# Outputs: has_source=true|false to GITHUB_OUTPUT

set -euo pipefail

if find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.tsx" -o -name "*.jsx" -o -name "*.mjs" -o -name "*.cjs" \) \
   -not -path "./node_modules/*" -not -path "./.git/*" | grep -q .; then
  echo "has_source=true" >> "$GITHUB_OUTPUT"
else
  echo "has_source=false" >> "$GITHUB_OUTPUT"
fi
