#!/usr/bin/env bash
# Read a comment body from a file and expose it via GITHUB_OUTPUT as `content`.
# The file path arrives through the COMMENT_FILE env var so its contents cannot
# be injected as shell code by a malicious action caller.
set -euo pipefail

file="${COMMENT_FILE:?COMMENT_FILE env var must be set}"

if [[ ! -f "${file}" ]]; then
	echo "::error::Comment file not found: ${file}"
	exit 1
fi

if [[ -z "${GITHUB_OUTPUT:-}" ]]; then
	echo "::error::GITHUB_OUTPUT is not set; this script must run inside a GitHub Actions step"
	exit 1
fi

# Dynamic delimiter avoids collisions with any literal EOF-style token that may
# appear inside the file body.
delim="EOF_$(date +%s%N)"
{
	echo "content<<${delim}"
	cat "${file}"
	echo "${delim}"
} >>"${GITHUB_OUTPUT}"
