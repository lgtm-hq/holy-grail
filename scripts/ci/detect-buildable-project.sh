#!/usr/bin/env bash
# Detect whether this repo has a buildable Astro project (package.json + astro.config.*).
set -euo pipefail

has_astro_config=false
for ext in mjs js ts mts cjs cts; do
	if [[ -f "astro.config.${ext}" ]]; then
		has_astro_config=true
		break
	fi
done

if [[ -f package.json ]] && [[ "${has_astro_config}" == "true" ]]; then
	echo "has_project=true" >>"${GITHUB_OUTPUT:?GITHUB_OUTPUT is required}"
else
	echo "has_project=false" >>"${GITHUB_OUTPUT}"
fi
