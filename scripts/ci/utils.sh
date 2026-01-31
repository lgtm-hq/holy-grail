#!/usr/bin/env bash

# Shared utilities for CI workflow scripts

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Common environment variables
GITHUB_SERVER_URL="${GITHUB_SERVER_URL:-https://github.com}"
GITHUB_REPOSITORY="${GITHUB_REPOSITORY:-}"
GITHUB_RUN_ID="${GITHUB_RUN_ID:-}"

# Check if we're in a PR context
is_pr_context() {
	local event="${GITHUB_EVENT_NAME:-}"
	[ "$event" = "pull_request" ] || [ "$event" = "pull_request_target" ]
}

# Logging functions
log_info() {
	echo -e "${BLUE}info:${NC} $1"
}

log_success() {
	echo -e "${GREEN}success:${NC} $1"
}

log_warning() {
	echo -e "${YELLOW}warning:${NC} $1"
}

log_error() {
	echo -e "${RED}error:${NC} $1"
}

# Generate PR comment file
# Usage: generate_pr_comment "title" "status" "content" "output_file"
generate_pr_comment() {
	local title="$1"
	local status="$2"
	local content="$3"
	local output_file="$4"

	local comment="## $title

### Status: $status

$content

---
[View full build details]($GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID)

*This analysis was performed automatically by the CI pipeline.*"

	echo "$comment" >"$output_file"
	log_success "PR comment generated: $output_file"
}

# Set a GitHub Actions output variable
set_github_output() {
	local key="$1"
	local value="$2"
	if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
		echo "$key=$value" >>"$GITHUB_OUTPUT"
	fi
}

# Set a GitHub Actions environment variable
set_github_env() {
	local key="$1"
	local value="$2"
	if [[ -n "${GITHUB_ENV:-}" ]]; then
		echo "$key=$value" >>"$GITHUB_ENV"
	fi
}
