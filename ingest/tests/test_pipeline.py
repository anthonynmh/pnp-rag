import pytest
import subprocess
from pathlib import Path

from ingest.clone_repo import clone_repository, create_temp_workspace


TEST_REPO_URL = "https://github.com/anthonynmh/pnp-rag.git"
EXPECTED_REPO_NAME = "pnp-rag"
REQUIRED_FILES = [
    "README.md",
    # add others if needed
]


def get_origin_url(repo_path: Path) -> str:
    result = subprocess.run(
        ["git", "config", "--get", "remote.origin.url"],
        cwd=repo_path,
        check=True,
        stdout=subprocess.PIPE,
        text=True,
    )
    return result.stdout.strip()


def test_clone_repository_smoke():
    """
    Verifies:
    - repo is cloned
    - .git directory exists
    - repository is non-empty
    """
    with create_temp_workspace() as workspace:
        repo_path = clone_repository(TEST_REPO_URL, workspace)

        assert repo_path.exists()
        assert repo_path.is_dir()
        assert (repo_path / ".git").exists()
        assert any(repo_path.iterdir())


def test_clone_repository_origin_is_correct():
    """
    Verifies the remote origin URL matches the expected repo.
    """
    with create_temp_workspace() as workspace:
        repo_path = clone_repository(TEST_REPO_URL, workspace)

        origin_url = get_origin_url(repo_path)

        assert EXPECTED_REPO_NAME in origin_url


@pytest.mark.parametrize("relative_path", REQUIRED_FILES)
def test_required_files_exist(relative_path: str):
    """
    Verifies required files exist and are non-empty.
    """
    with create_temp_workspace() as workspace:
        repo_path = clone_repository(TEST_REPO_URL, workspace)

        file_path = repo_path / relative_path

        assert file_path.is_file(), f"Missing file: {relative_path}"
        assert file_path.stat().st_size > 0, f"Empty file: {relative_path}"
