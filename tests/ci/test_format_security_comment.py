"""Tests for ``scripts/ci/format-security-comment.py``.

Covers the pure formatting helpers, JSON parsing, error handling, and the
``main`` entry point of the CI helper that renders an osv-scanner lintro
report as a markdown PR comment body.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import format_security_comment as fsc  # loaded by ``tests/ci/conftest.py``
import pytest
from assertpy import assert_that


@pytest.mark.parametrize(
    argnames=("value", "expected"),
    argvalues=[
        pytest.param(None, "", id="none_becomes_empty"),
        pytest.param("plain", "plain", id="plain_text_unchanged"),
        pytest.param("a|b", r"a\|b", id="pipe_escaped"),
        pytest.param("line1\nline2", "line1 line2", id="newline_to_space"),
        pytest.param("line1\r\nline2", "line1 line2", id="crlf_normalised"),
        pytest.param("a|b\nc", r"a\|b c", id="pipe_and_newline"),
        pytest.param("", "", id="empty_string_unchanged"),
    ],
)
def test_escape_md_cell(value: str | None, expected: str) -> None:
    """Verify ``escape_md_cell`` sanitises pipes and line endings.

    Args:
        value: The raw cell content to escape.
        expected: The escaped representation returned by the helper.
    """
    assert_that(fsc.escape_md_cell(value)).is_equal_to(expected)


def _write_json(tmp_path: Path, payload: object) -> Path:
    """Write ``payload`` as JSON to a temp file and return the path.

    Args:
        tmp_path: The pytest-provided per-test temporary directory.
        payload: A JSON-serialisable object to persist.

    Returns:
        The path to the written ``results.json`` file.
    """
    target = tmp_path / "results.json"
    target.write_text(json.dumps(payload))
    return target


def test_parse_lintro_json_returns_osv_result(tmp_path: Path) -> None:
    """Return the osv_scanner result when present alongside other tools.

    Args:
        tmp_path: The pytest-provided per-test temporary directory.
    """
    payload: dict[str, Any] = {
        "results": [
            {"tool": "ruff", "issues_count": 0},
            {"tool": "osv_scanner", "issues_count": 2, "issues": []},
        ],
    }
    path = _write_json(tmp_path=tmp_path, payload=payload)

    result = fsc.parse_lintro_json(str(path))

    assert_that(result).is_equal_to(
        {"tool": "osv_scanner", "issues_count": 2, "issues": []},
    )


@pytest.mark.parametrize(
    argnames=("payload",),
    argvalues=[
        pytest.param({"results": []}, id="no_results"),
        pytest.param({}, id="missing_results_key"),
        pytest.param(
            {"results": [{"tool": "ruff", "issues_count": 0}]},
            id="no_osv_scanner_tool",
        ),
        pytest.param({"results": "not-a-list"}, id="results_not_a_list"),
        pytest.param(
            {"results": ["string-entry", 42, None]},
            id="results_non_dict_entries",
        ),
    ],
)
def test_parse_lintro_json_returns_empty(
    tmp_path: Path,
    payload: dict[str, Any],
) -> None:
    """Return an empty dict when no osv_scanner entry is present.

    Args:
        tmp_path: The pytest-provided per-test temporary directory.
        payload: The JSON payload to persist and parse.
    """
    path = _write_json(tmp_path=tmp_path, payload=payload)

    assert_that(fsc.parse_lintro_json(str(path))).is_equal_to({})


def test_parse_lintro_json_raises_on_malformed(tmp_path: Path) -> None:
    """Propagate ``JSONDecodeError`` for non-JSON input.

    Args:
        tmp_path: The pytest-provided per-test temporary directory.
    """
    target = tmp_path / "broken.json"
    target.write_text("{not-valid-json")

    with pytest.raises(json.JSONDecodeError):
        fsc.parse_lintro_json(str(target))


def test_format_suppressions_table_empty_returns_empty_string() -> None:
    """Return an empty string when no suppressions are supplied."""
    assert_that(fsc.format_suppressions_table([])).is_equal_to("")


def test_format_suppressions_table_renders_all_statuses() -> None:
    """Render icon labels for active, stale, expired, and unknown statuses."""
    suppressions: list[dict[str, Any]] = [
        {
            "id": "GHSA-aaaa",
            "ignore_until": "2099-01-01",
            "status": "active",
            "reason": "waiting on upstream fix",
        },
        {
            "id": "GHSA-bbbb",
            "ignore_until": None,
            "status": "stale",
            "reason": "resolved",
        },
        {
            "id": None,
            "ignore_until": "2020-01-01",
            "status": "expired",
            "reason": "past due",
        },
        {
            "status": "mystery",
            "reason": "cell|with|pipes",
        },
    ]

    rendered = fsc.format_suppressions_table(suppressions)

    assert_that(rendered).contains("### 🔇 Suppressed Vulnerabilities")
    assert_that(rendered).contains(
        "| ID | Expires | Status | Reason |",
    )
    assert_that(rendered).contains(
        "| `GHSA-aaaa` | 2099-01-01 | Active | waiting on upstream fix |",
    )
    assert_that(rendered).contains(
        "| `GHSA-bbbb` | N/A | Stale (safe to remove) | resolved |",
    )
    assert_that(rendered).contains(
        "| `unknown` | 2020-01-01 | Expired | past due |",
    )
    assert_that(rendered).contains(r"cell\|with\|pipes")
    assert_that(rendered).contains("| `unknown` |")
    assert_that(rendered).ends_with("\n")


def test_format_clean_without_suppressions() -> None:
    """Emit the clean-run body with no suppression section."""
    output = fsc.format_clean({"issues_count": 0})

    assert_that(output).contains("### 🔍 Checks Performed")
    assert_that(output).contains("No security vulnerabilities found in dependencies.")
    assert_that(output).does_not_contain("### 🔇 Suppressed Vulnerabilities")


def test_format_clean_with_suppressions() -> None:
    """Append the suppression table when ``ai_metadata`` provides entries."""
    result: dict[str, Any] = {
        "issues_count": 0,
        "ai_metadata": {
            "suppressions": [
                {
                    "id": "GHSA-cccc",
                    "ignore_until": "2030-06-01",
                    "status": "active",
                    "reason": "no upstream fix",
                },
            ],
        },
    }

    output = fsc.format_clean(result)

    assert_that(output).contains("No security vulnerabilities found in dependencies.")
    assert_that(output).contains("### 🔇 Suppressed Vulnerabilities")
    assert_that(output).contains("`GHSA-cccc`")


def test_format_vulnerabilities_with_issues() -> None:
    """Render each issue row and the recommended-actions section."""
    result: dict[str, Any] = {
        "issues_count": 2,
        "issues": [
            {
                "message": "GHSA-xxxx in left-pad 1.0.0",
                "file": "bun.lock",
            },
            {
                "message": "GHSA-yyyy | critical",
                "file": "path/with|pipe",
            },
        ],
    }

    output = fsc.format_vulnerabilities(result)

    assert_that(output).contains("### ⚠️ Vulnerability Report")
    assert_that(output).contains(
        "| GHSA-xxxx in left-pad 1.0.0 | `bun.lock` |",
    )
    assert_that(output).contains(
        r"| GHSA-yyyy \| critical | `path/with\|pipe` |",
    )
    assert_that(output).contains("### 📋 Recommended Actions")
    assert_that(output).contains("`.osv-scanner.toml`")
    assert_that(output).does_not_contain("### 🔇 Suppressed Vulnerabilities")


def test_format_vulnerabilities_without_issues_uses_count_fallback() -> None:
    """Fall back to a summary row when the ``issues`` list is absent."""
    result: dict[str, Any] = {"issues_count": 7}

    output = fsc.format_vulnerabilities(result)

    assert_that(output).contains(
        "| 7 vulnerability(ies) found — see CI logs for details | |",
    )


def test_format_vulnerabilities_uses_defaults_for_missing_fields() -> None:
    """Substitute placeholders when issue entries omit ``message``/``file``."""
    result: dict[str, Any] = {
        "issues_count": 1,
        "issues": [{}],
    }

    output = fsc.format_vulnerabilities(result)

    assert_that(output).contains("| Unknown vulnerability | `unknown` |")


def test_format_vulnerabilities_appends_suppressions_when_present() -> None:
    """Append the suppression table under the vulnerability report."""
    result: dict[str, Any] = {
        "issues_count": 1,
        "issues": [{"message": "GHSA-zzzz", "file": "bun.lock"}],
        "ai_metadata": {
            "suppressions": [
                {
                    "id": "GHSA-dddd",
                    "ignore_until": "2031-01-01",
                    "status": "stale",
                    "reason": "already patched",
                },
            ],
        },
    }

    output = fsc.format_vulnerabilities(result)

    assert_that(output).contains("### ⚠️ Vulnerability Report")
    assert_that(output).contains("### 🔇 Suppressed Vulnerabilities")
    assert_that(output).contains("`GHSA-dddd`")


def test_format_error_without_raw_file(tmp_path: Path) -> None:
    """Render the scanner-error block without a raw-log excerpt.

    Args:
        tmp_path: The pytest-provided per-test temporary directory.
    """
    missing = tmp_path / "does-not-exist.json"

    output = fsc.format_error(str(missing))

    assert_that(output).contains("### ❌ Scanner Error")
    assert_that(output).contains("Review the CI logs for details.")
    assert_that(output).does_not_contain("```")


def test_format_error_with_raw_file_truncates(tmp_path: Path) -> None:
    """Include a truncated raw-log excerpt when the file exists.

    Args:
        tmp_path: The pytest-provided per-test temporary directory.
    """
    raw = tmp_path / "raw.log"
    raw.write_text("A" * 1000)

    output = fsc.format_error(str(raw))

    assert_that(output).contains("```")
    assert_that(output).contains("A" * 500)
    assert_that(output).does_not_contain("A" * 501)


def test_main_missing_argument_exits_2(
    monkeypatch: pytest.MonkeyPatch,
    capsys: pytest.CaptureFixture[str],
) -> None:
    """Exit with status 2 and a usage message when no path is supplied.

    Args:
        monkeypatch: The pytest monkeypatch fixture.
        capsys: The pytest stdout/stderr capture fixture.
    """
    monkeypatch.setattr(target=fsc.sys, name="argv", value=["format-security-comment.py"])

    with pytest.raises(SystemExit) as exc_info:
        fsc.main()

    assert_that(exc_info.value.code).is_equal_to(2)
    err = capsys.readouterr().err
    assert_that(err).contains("Usage:")


def test_main_missing_file_prints_error_and_exits_1(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
    capsys: pytest.CaptureFixture[str],
) -> None:
    """Print the scanner-error block and exit 1 when the input file is absent.

    Args:
        tmp_path: The pytest-provided per-test temporary directory.
        monkeypatch: The pytest monkeypatch fixture.
        capsys: The pytest stdout/stderr capture fixture.
    """
    missing = tmp_path / "missing.json"
    monkeypatch.setattr(
        target=fsc.sys,
        name="argv",
        value=["format-security-comment.py", str(missing)],
    )

    with pytest.raises(SystemExit) as exc_info:
        fsc.main()

    assert_that(exc_info.value.code).is_equal_to(1)
    out = capsys.readouterr().out
    assert_that(out).contains("### ❌ Scanner Error")


def test_main_malformed_json_exits_1(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
    capsys: pytest.CaptureFixture[str],
) -> None:
    """Emit the scanner-error block when the input JSON cannot be parsed.

    Args:
        tmp_path: The pytest-provided per-test temporary directory.
        monkeypatch: The pytest monkeypatch fixture.
        capsys: The pytest stdout/stderr capture fixture.
    """
    broken = tmp_path / "broken.json"
    broken.write_text("{not-json")
    monkeypatch.setattr(
        target=fsc.sys,
        name="argv",
        value=["format-security-comment.py", str(broken)],
    )

    with pytest.raises(SystemExit) as exc_info:
        fsc.main()

    assert_that(exc_info.value.code).is_equal_to(1)
    captured = capsys.readouterr()
    assert_that(captured.err).contains("Failed to parse")
    assert_that(captured.out).contains("### ❌ Scanner Error")


def test_main_empty_result_exits_1(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
    capsys: pytest.CaptureFixture[str],
) -> None:
    """Exit 1 with an error block when no osv_scanner result is present.

    Args:
        tmp_path: The pytest-provided per-test temporary directory.
        monkeypatch: The pytest monkeypatch fixture.
        capsys: The pytest stdout/stderr capture fixture.
    """
    payload_path = _write_json(
        tmp_path=tmp_path,
        payload={"results": [{"tool": "ruff", "issues_count": 0}]},
    )
    monkeypatch.setattr(
        target=fsc.sys,
        name="argv",
        value=["format-security-comment.py", str(payload_path)],
    )

    with pytest.raises(SystemExit) as exc_info:
        fsc.main()

    assert_that(exc_info.value.code).is_equal_to(1)
    assert_that(capsys.readouterr().out).contains("### ❌ Scanner Error")


def test_main_clean_result_prints_clean_body(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
    capsys: pytest.CaptureFixture[str],
) -> None:
    """Print the clean-run body and return normally when no issues exist.

    Args:
        tmp_path: The pytest-provided per-test temporary directory.
        monkeypatch: The pytest monkeypatch fixture.
        capsys: The pytest stdout/stderr capture fixture.
    """
    payload_path = _write_json(
        tmp_path=tmp_path,
        payload={
            "results": [
                {
                    "tool": "osv_scanner",
                    "issues_count": 0,
                    "issues": [],
                },
            ],
        },
    )
    monkeypatch.setattr(
        target=fsc.sys,
        name="argv",
        value=["format-security-comment.py", str(payload_path)],
    )

    fsc.main()

    out = capsys.readouterr().out
    assert_that(out).contains("No security vulnerabilities found in dependencies.")
    assert_that(out).does_not_contain("### ⚠️ Vulnerability Report")


def test_main_vulnerable_result_prints_report(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
    capsys: pytest.CaptureFixture[str],
) -> None:
    """Print the vulnerability report body when issues are present.

    Args:
        tmp_path: The pytest-provided per-test temporary directory.
        monkeypatch: The pytest monkeypatch fixture.
        capsys: The pytest stdout/stderr capture fixture.
    """
    payload_path = _write_json(
        tmp_path=tmp_path,
        payload={
            "results": [
                {
                    "tool": "osv_scanner",
                    "issues_count": 1,
                    "issues": [
                        {"message": "GHSA-eeee", "file": "bun.lock"},
                    ],
                },
            ],
        },
    )
    monkeypatch.setattr(
        target=fsc.sys,
        name="argv",
        value=["format-security-comment.py", str(payload_path)],
    )

    fsc.main()

    out = capsys.readouterr().out
    assert_that(out).contains("### ⚠️ Vulnerability Report")
    assert_that(out).contains("| GHSA-eeee | `bun.lock` |")
    assert_that(out).contains("### 📋 Recommended Actions")
