#!/usr/bin/env bash
# Guard against release commits triggering new release workflows.
# Exits 0 (should skip) if the latest commit is a release commit, 1 otherwise.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=utils.sh
source "$SCRIPT_DIR/utils.sh"

# Get the latest commit message
commit_msg="$(git log -1 --pretty=%s)"

log_info "Checking commit message: $commit_msg"

# Check for [skip ci] marker or release commit patterns
if [[ "$commit_msg" == *"[skip ci]"* ]]; then
	log_info "Commit contains [skip ci], skipping release workflow"
	echo "should_skip=true" >>"$GITHUB_OUTPUT"
	exit 0
fi

if [[ "$commit_msg" =~ ^chore\(release\):\ v[0-9]+\.[0-9]+\.[0-9]+ ]]; then
	log_info "Commit is a release commit, skipping release workflow"
	echo "should_skip=true" >>"$GITHUB_OUTPUT"
	exit 0
fi

log_info "Commit is not a release commit, proceeding"
echo "should_skip=false" >>"$GITHUB_OUTPUT"
