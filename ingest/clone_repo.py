from pathlib import Path
import subprocess
import tempfile


def create_temp_workspace() -> tempfile.TemporaryDirectory:
    """
    Context manager that yields a temporary directory and guarantees cleanup.
    """
    return tempfile.TemporaryDirectory()


def clone_repository(
    repo_url: str, workspace: str, *, branch: str | None = None
) -> Path:
    """
    Clone a remote GitHub repository into the provided workspace.

    Uses the git CLI. Raises RuntimeError on failure.
    """
    repo_name = Path(repo_url.rstrip("/")).stem
    repo_path = Path(workspace) / repo_name

    if repo_path.exists():
        raise RuntimeError(f"Repository path already exists: {repo_path}")

    clone_cmd = ["git", "clone", repo_url, str(repo_path)]

    if branch:
        clone_cmd.extend(["--branch", branch])

    try:
        subprocess.run(
            clone_cmd,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
    except subprocess.CalledProcessError as exc:
        raise RuntimeError(f"Failed to clone repository: {exc.stderr}") from exc

    return repo_path
