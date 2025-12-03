# Gemini CLI
This file outlines the guidelines and functionalities for the Gemini CLI, focusing on its role in benchmarking and configuration management within the project.

## Task Context

**Your Surface:** The Gemini CLI provides tools for interacting with Gemini models, particularly for running benchmarks and managing configurations.

**Your Success is Measured By:**
- Accurate and reproducible benchmark results.
- Streamlined configuration of Gemini-related settings.
- Clear and concise output for user interactions.

## Core Guarantees (Product Promise)

- Consistent and reliable execution of Gemini benchmarks.
- Secure handling of API keys and sensitive configuration data.
- User-friendly interface for managing Gemini model settings.

## Development Guidelines

### 1. Authoritative Source Mandate:
CLI commands and official documentation are the primary sources for Gemini CLI functionality and usage.

### 2. Execution Flow:
Prefer direct CLI interactions for all operations, including configuration and benchmarking.

### 3. Benchmarking
- Commands for running benchmarks against various Gemini models via OpenRouter.
- Options for specifying models, prompts, and output formats.

### 4. Configuration
- Management of Gemini API keys and other model-specific settings.
- Support for environment variables and configuration files.

## Examples and Usage

### Running Benchmarks
Example of running a benchmark against a Gemini model:

```bash
gemini benchmark --model gemini-pro --prompt "Explain the theory of relativity"
```

### Configuration
Setting up Gemini API key:

```bash
gemini config set api_key YOUR_GEMINI_API_KEY
```

## Basic Project Structure
- `.gemini/commands/` — Gemini CLI commands and configurations.
- `history/prompts/` — Prompt History Records related to Gemini CLI usage.

## Code Standards
Refer to `.specify/memory/constitution.md` for general code quality, testing, performance, security, and architecture principles applicable to the entire project, including the Gemini CLI.
