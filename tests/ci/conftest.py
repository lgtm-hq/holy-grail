"""Pytest configuration for ``tests/ci``.

Loads ``scripts/ci/format-security-comment.py`` under an importable name so
tests can reference its module-level helpers directly. The script filename
uses hyphens (``format-security-comment.py``) which is not a valid Python
identifier, so a normal ``import`` statement cannot be used.
"""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path
from types import ModuleType

_REPO_ROOT: Path = Path(__file__).resolve().parents[2]
_SCRIPT_PATH: Path = _REPO_ROOT / "scripts" / "ci" / "format-security-comment.py"
_MODULE_NAME: str = "format_security_comment"


def _load_module() -> ModuleType:
    """Load the hyphenated script file as an importable module.

    Returns:
        The loaded module, registered under ``format_security_comment`` in
        ``sys.modules`` so that subsequent imports resolve to the same object.

    Raises:
        ImportError: If the script cannot be located or a loader cannot be
            constructed for it.
    """
    if _MODULE_NAME in sys.modules:
        return sys.modules[_MODULE_NAME]

    spec = importlib.util.spec_from_file_location(
        name=_MODULE_NAME,
        location=_SCRIPT_PATH,
    )
    if spec is None or spec.loader is None:
        raise ImportError(f"Cannot load spec for {_SCRIPT_PATH}")

    module = importlib.util.module_from_spec(spec)
    sys.modules[_MODULE_NAME] = module
    spec.loader.exec_module(module)
    return module


_load_module()
