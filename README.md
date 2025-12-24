# Plug-and-Play RAG (pnp-rag)

Plug-and-Play RAG is a developer-focused tool for standing up a Retrieval-Augmented
Generation (RAG) pipeline directly from a GitHub repository.

The goal is to make it trivial to:
- clone a repo,
- ingest and chunk its contents,
- generate embeddings,
- and wire it into downstream RAG workflows.

This project is intentionally modular and pipeline-oriented.

---

## Architecture

> **Status:** Work in progress

High-level pipeline stages:

1. **Workspace setup**
   - Create an isolated temporary workspace
   - Clone a target GitHub repository

2. **Repository ingestion**
   - Validate repository structure
   - Filter allowed file types
   - Prepare files for chunking

3. **Chunking & embeddings** *(future)*
   - Chunk source files
   - Generate embeddings
   - Store in a vector index

4. **Retrieval & RAG** *(future)*
   - Query embeddings
   - Feed context into an LLM

The `run_pipeline` function orchestrates these stages declaratively.

---

## Repository Layout

``` bash
.
├── .github/ # GitHub Actions workflows
├── ingest/ # Repository ingestion logic
│   ├── pipeline.py # Pipeline entrypoint and orchestration
│   ├── constants.py # Configuration and constants
│   └── tests/ # Pytest test suite
├── pyproject.toml # Project metadata and dependencies
└── README.md
```

---

## Development Setup

### Requirements
- Python **3.11+** (3.13 recommended)
- `git`

---

### Create a virtual environment

```bash
python3 -m venv .venv/pnp-rag
source .venv/pnp-rag/bin/activate
```

### Install the project (editable, with test deps)

``` bash
python -m pip install --upgrade pip
python -m pip install -e '.[test]'
```

This installs:
- the project in editable mode
- pytest and test dependencies

## Running the Pipeline

Example:

``` bash
python pipeline.py --repo_url https://github.com/org/repo.git --branch_name main
```

(Currently focuses on repository cloning and validation. More stages will follow.)

## Running Tests

``` bash
pytest
```

Tests live under the tests/ directory and are run via pytest.
Tooling Notes
- Dependency management follows PEP 621 via pyproject.toml
- No Poetry; uses pip + venv
- Editable installs are the standard workflow
- CI runs pip install -e .[test] and pytest
