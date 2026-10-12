#!/usr/bin/env bash
# Validate that exactly one of body/file was provided to the post-pr-comment action.
# Inputs are passed via environment variables (never interpolated into the script)
# so that user-controlled action inputs cannot be injected as shell code.
set -euo pipefail

body="${COMMENT_BODY:-}"
file="${COMMENT_FILE:-}"

if [[ -n "${body}" && -n "${file}" ]]; then
	echo "::error::Specify either 'body' or 'file', not both"
	exit 1
fi

if [[ -z "${body}" && -z "${file}" ]]; then
	echo "::error::Either 'body' or 'file' must be provided"
	exit 1
fi
