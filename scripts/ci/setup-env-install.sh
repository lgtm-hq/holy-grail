#!/usr/bin/env bash
# Install project dependencies with Bun for the setup-env composite action.
# The FROZEN_LOCKFILE toggle is passed via env var so the action input is never
# interpolated into shell code.
set -euo pipefail

frozen="${FROZEN_LOCKFILE:-true}"

if [[ "${frozen}" == "true" ]]; then
	if [[ -f "bun.lock" ]] || [[ -f "bun.lockb" ]]; then
		bun install --frozen-lockfile
	else
		echo "Warning: frozen-lockfile requested but no lockfile found, running normal install"
		bun install
	fi
else
	bun install
fi
