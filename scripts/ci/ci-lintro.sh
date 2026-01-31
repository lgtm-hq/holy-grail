#!/usr/bin/env bash

# CI Lintro Analysis Script
# Runs lintro checks and captures output for PR comments

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# shellcheck source=utils.sh
source "$SCRIPT_DIR/utils.sh"

# Set up step summary if available
GITHUB_STEP_SUMMARY="${GITHUB_STEP_SUMMARY:-/dev/null}"
GITHUB_ENV="${GITHUB_ENV:-/dev/null}"

# Ensure CHK_EXIT_CODE is always set, even on early exit
trap 'echo "CHK_EXIT_CODE=${CHK_EXIT_CODE:-1}" >> "$GITHUB_ENV"' EXIT

{
	echo "## Lintro Code Quality Analysis"
	echo ""
	echo "Running \`lintro chk\` against the project..."
	echo ""
} >>"$GITHUB_STEP_SUMMARY"

log_info "Running lintro check..."

# Run lintro and capture output
set +e
lintro chk 2>&1 | tee chk-output.txt
CHK_EXIT_CODE=${PIPESTATUS[0]}
set -e

{
	echo "### Results:"
	echo '```'
	cat chk-output.txt
	echo '```'
	echo ""
	echo "**Exit code:** $CHK_EXIT_CODE"
} >>"$GITHUB_STEP_SUMMARY"

# Store the exit code for subsequent steps
echo "CHK_EXIT_CODE=$CHK_EXIT_CODE" >>"$GITHUB_ENV"

if [ "$CHK_EXIT_CODE" -eq 0 ]; then
	log_success "Lintro checks passed"
else
	log_warning "Lintro found issues (exit code: $CHK_EXIT_CODE)"
fi

exit "$CHK_EXIT_CODE"
