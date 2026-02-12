#!/usr/bin/env bash
# Generate a GitHub Actions job summary for the version PR workflow.
# Expects: NEW_VERSION, BUMP_TYPE, PR_URL environment variables

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=utils.sh
source "$SCRIPT_DIR/utils.sh"

NEW_VERSION="${NEW_VERSION:-}"
BUMP_TYPE="${BUMP_TYPE:-}"
PR_URL="${PR_URL:-}"
PR_ACTION="${PR_ACTION:-created}"

{
	echo "## Version PR Summary"
	echo ""
	echo "| Field | Value |"
	echo "| --- | --- |"
	if [[ -n "$NEW_VERSION" ]]; then
		echo "| **New Version** | \`${NEW_VERSION}\` |"
	fi
	if [[ -n "$BUMP_TYPE" ]]; then
		echo "| **Bump Type** | \`${BUMP_TYPE}\` |"
	fi
	if [[ -n "$PR_URL" ]]; then
		echo "| **PR** | [View PR](${PR_URL}) |"
	fi
	echo "| **Action** | ${PR_ACTION} |"
	echo ""
	if [[ "$PR_ACTION" == "skipped" ]]; then
		echo "No version bump was needed based on the conventional commits since the last release."
	else
		echo "A version PR has been ${PR_ACTION}. Review and merge it to trigger auto-tagging."
	fi
} >>"$GITHUB_STEP_SUMMARY"

log_success "Job summary generated"
