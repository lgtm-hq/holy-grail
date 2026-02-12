#!/usr/bin/env bash
# Generate a GitHub Actions job summary for the auto-tag workflow.
# Expects: TAG_NAME, TAG_CREATED, NEW_VERSION environment variables

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=utils.sh
source "$SCRIPT_DIR/utils.sh"

TAG_NAME="${TAG_NAME:-}"
TAG_CREATED="${TAG_CREATED:-false}"
NEW_VERSION="${NEW_VERSION:-}"

if [[ "$TAG_CREATED" == "true" ]]; then
	{
		echo "## Release Tag Created"
		echo ""
		echo "| Field | Value |"
		echo "| --- | --- |"
		echo "| **Tag** | \`${TAG_NAME}\` |"
		echo "| **Version** | \`${NEW_VERSION}\` |"
		echo "| **Commit** | \`$(git rev-parse --short HEAD)\` |"
		echo ""
		echo "The GitHub release has been created with changelog notes."
	} >>"$GITHUB_STEP_SUMMARY"
else
	{
		echo "## Auto Tag Skipped"
		echo ""
		echo "No version change detected or tag already exists."
		if [[ -n "$NEW_VERSION" ]]; then
			echo "Current version: \`${NEW_VERSION}\`"
		fi
	} >>"$GITHUB_STEP_SUMMARY"
fi

log_success "Job summary generated"
