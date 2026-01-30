#!/usr/bin/env bash
# Generate PR comment markdown from Playwright test results

set -euo pipefail

# Check if results file exists
RESULTS_FILE="test-results/.last-run.json"

if [[ ! -f "$RESULTS_FILE" ]] && [[ ! -f "playwright-report/index.html" ]]; then
	cat <<EOF
## Playwright E2E Results

:warning: **No test results found**

Test execution may have failed to start.
EOF
	exit 0
fi

# Parse JSON results if available
if [[ -f "$RESULTS_FILE" ]]; then
	STATUS=$(jq -r '.status // "unknown"' "$RESULTS_FILE" 2>/dev/null || echo "unknown")
else
	# Fallback: check if report exists
	if [[ -f "playwright-report/index.html" ]]; then
		STATUS="completed"
	else
		STATUS="unknown"
	fi
fi

# Determine emoji based on status
case "$STATUS" in
"passed")
	EMOJI=":white_check_mark:"
	STATUS_TEXT="All tests passed"
	;;
"failed")
	EMOJI=":x:"
	STATUS_TEXT="Some tests failed"
	;;
"timedOut")
	EMOJI=":hourglass:"
	STATUS_TEXT="Tests timed out"
	;;
*)
	EMOJI=":grey_question:"
	STATUS_TEXT="Test status: $STATUS"
	;;
esac

# Get counts from output if available
PASSED=$(grep -oP '\d+(?= passed)' playwright-output.txt 2>/dev/null | head -1 || echo "0")
FAILED=$(grep -oP '\d+(?= failed)' playwright-output.txt 2>/dev/null | head -1 || echo "0")
SKIPPED=$(grep -oP '\d+(?= skipped)' playwright-output.txt 2>/dev/null | head -1 || echo "0")

# Generate markdown
cat <<EOF
## Playwright E2E Results

$EMOJI **$STATUS_TEXT**

| Passed | Failed | Skipped |
|--------|--------|---------|
| $PASSED | $FAILED | $SKIPPED |

<details>
<summary>View full report</summary>

Download the \`playwright-report\` artifact from the workflow run to view the detailed HTML report.

</details>
EOF
