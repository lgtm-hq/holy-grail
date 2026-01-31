#!/usr/bin/env bash

# CI PR Comment Script
# Generates a PR comment from lintro output

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# shellcheck source=utils.sh
source "$SCRIPT_DIR/utils.sh"

# Check if we're in a PR context
if ! is_pr_context; then
	log_info "Not in a PR context, skipping comment generation"
	exit 0
fi

# Read the output file and extract summary
if [ -f chk-output.txt ]; then
	# Try to extract from the EXECUTION SUMMARY section
	start_line=$(grep -n "EXECUTION SUMMARY" chk-output.txt | head -n1 | cut -d: -f1 || true)
	if [ -n "${start_line:-}" ]; then
		tail -n +"$start_line" chk-output.txt >chk-summary.txt || true
	else
		# Fallback to last 50 lines to capture table if header not found
		tail -n 50 chk-output.txt >chk-summary.txt || true
	fi
fi

if [ -f chk-summary.txt ]; then
	OUTPUT=$(cat chk-summary.txt)
else
	OUTPUT="Analysis failed - check the CI logs for details"
fi

# Determine status from exit code
if [ "${CHK_EXIT_CODE:-1}" = "0" ]; then
	STATUS="PASSED"
else
	STATUS="ISSUES FOUND"
fi

# Create the comment content
CONTENT="**Workflow:**
1. Performed code quality checks with \`lintro chk\`

### Results:
\`\`\`
$OUTPUT
\`\`\`"

# Generate PR comment using shared function
generate_pr_comment "Lintro Code Quality Analysis" "$STATUS" "$CONTENT" "pr-comment.txt"
