# Development

## Reproducible tools

[Flox](https://flox.dev/docs/tutorials/ci-cd) supplies Bun, Node.js, pre-commit,
and actionlint from the committed `.flox/env/manifest.lock`. The environment
supports Linux and macOS on ARM64 and x86-64. No FloxHub login is required.

```sh
flox activate
bun install --frozen-lockfile
pre-commit install
bun run dev
```

Bun installs dependencies and runs scripts. Jest uses Node for compatibility
with the existing suite; use `bun run test`, not Bun's native `bun test` runner.
The committed `bun.lock` is the single JavaScript dependency lockfile.

Alternatively, after installing dependencies, use Flox's managed dev service:

```sh
flox activate --start-services
flox services status
flox services stop dev
```

## Checks and hooks

```sh
flox activate -- bun run check
flox activate -- pre-commit run --all-files
```

Both execute the same complete checks: ESLint, TypeScript, Markdown style,
Mermaid parsing, relative documentation paths, actionlint, LOC budgets, Jest,
and a production build. The pre-commit hook runs this full suite on every commit.
Install dependencies before running it. CI uses a frozen install and the same
hook configuration; missing tools or failed checks stop the run.

Run individual checks with `bun run lint`, `bun run typecheck`,
`bun run lint:docs`, `bun run lint:workflows`, or `bun run check:loc`.
Use `bun run test --watch` while changing behavior.

## Keep changes small

`scripts/check-loc.mjs` caps nonblank JS/TS lines at 1,700 under `src/` (including
tests and mocks) and 100 under `scripts/`. Generated assets, dependency locks,
and documentation are excluded. These are ceilings, not targets. Prefer
existing tools over custom infrastructure; review any budget increase explicitly.

Update packages with Bun and commit `package.json` with `bun.lock`. Update
system tools with `flox upgrade`, and commit the resulting Flox lockfile.
Use conventional commit messages such as `fix: handle empty images`.
