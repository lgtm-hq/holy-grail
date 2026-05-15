#!/usr/bin/env bash
# Fail the CI job when lintro reported a non-zero exit code.
set -euo pipefail

echo "::error::Linting checks failed. Review the PR comment and CI logs."
exit 1
