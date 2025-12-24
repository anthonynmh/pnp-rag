import subprocess
from pathlib import Path
from collections.abc import Iterator

import pytest

from ingest.clone_repo import clone_repository, create_temp_workspace


TEST_REPO_URL = "https://github.com/anthonynmh/pnp-rag.git"
EXPECTED_REPO_NAME = "pnp-rag"
REQUIRED_FILES = [
    "README.md",
    # add others if needed
]


@pytest.fixture(scope="module")
def cloned_repo_path() -> Iterator[Path]:
    with create_temp_workspace() as workspace:
        repo_path = clone_repository(TEST_REPO_URL, workspace)
        yield repo_path


def get_origin_url(repo_path: Path) -> str:
    result = subprocess.run(
        ["git", "config", "--get", "remote.origin.url"],
        cwd=repo_path,
        check=True,
        stdout=subprocess.PIPE,
        text=True,
    )
    return result.stdout.strip()


def test_clone_repository_smoke(cloned_repo_path: Path):
    """
    Verifies:
    - repo directory exists
    - .git directory exists
    - repository is non-empty
    """
    assert cloned_repo_path.exists()
    assert cloned_repo_path.is_dir()
    assert (cloned_repo_path / ".git").is_dir()
    assert any(cloned_repo_path.iterdir())


def test_clone_repository_origin_is_correct(cloned_repo_path: Path):
    """
    Verifies the remote origin URL matches the expected repo.
    """
    origin_url = get_origin_url(cloned_repo_path)
    assert EXPECTED_REPO_NAME in origin_url


@pytest.mark.parametrize("relative_path", REQUIRED_FILES)
def test_required_files_exist(cloned_repo_path: Path, relative_path: str):
    """
    Verifies required files exist and are non-empty.
    """
    file_path = cloned_repo_path / relative_path

    assert file_path.is_file(), f"Missing file: {relative_path}"
    assert file_path.stat().st_size > 0, f"Empty file: {relative_path}"
