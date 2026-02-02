"""helpers.py

Utility helpers used across the project.
"""
import zipfile
from pathlib import Path
from typing import Iterable


def zip_files(files: Iterable[str], out_path: str):
    out_path = Path(out_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(out_path, 'w') as z:
        for f in files:
            z.write(f, arcname=Path(f).name)
    return str(out_path)


def ensure_dir(path: str):
    Path(path).mkdir(parents=True, exist_ok=True)
