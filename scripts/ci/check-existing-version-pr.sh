#!/usr/bin/env bash
# Check if there's an existing open version/release PR.
# Sets output: pr_exists=true/false, pr_number=<number>

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=utils.sh
source "$SCRIPT_DIR/utils.sh"

RELEASE_BRANCH="${RELEASE_BRANCH:-release/next}"

log_info "Checking for existing version PR from branch: $RELEASE_BRANCH"

# Search for open PRs from the release branch
pr_json="$(gh pr list \
	--head "$RELEASE_BRANCH" \
	--state open \
	--json number,title,headRefName \
	--limit 1)"

pr_count="$(echo "$pr_json" | jq 'length')"

if [[ "$pr_count" -gt 0 ]]; then
	pr_number="$(echo "$pr_json" | jq -r '.[0].number')"
	pr_title="$(echo "$pr_json" | jq -r '.[0].title')"
	log_info "Found existing version PR #${pr_number}: ${pr_title}"
	echo "pr_exists=true" >>"$GITHUB_OUTPUT"
	echo "pr_number=$pr_number" >>"$GITHUB_OUTPUT"
else
	log_info "No existing version PR found"
	echo "pr_exists=false" >>"$GITHUB_OUTPUT"
	echo "pr_number=" >>"$GITHUB_OUTPUT"
fi
