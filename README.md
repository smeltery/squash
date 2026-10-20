# Squash

[![CI](https://github.com/smeltery/squash/actions/workflows/ci.yml/badge.svg)](https://github.com/smeltery/squash/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/smeltery/squash)](https://github.com/smeltery/squash/releases)
[![License](https://img.shields.io/badge/license-PolyForm_Shield-blue)](LICENSE)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![WebAssembly](https://img.shields.io/badge/WebAssembly-654ff0?logo=webassembly&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000?logo=bun)
[![Flox](https://img.shields.io/badge/dev_environment-Flox-purple)](.flox/env/manifest.toml)

Compress and convert images in your browser with React and WebAssembly codecs
from [jSquash](https://github.com/jamsinclair/jSquash). Choose AVIF, JPEG, JPEG XL,
PNG, or WebP; process a batch, compare sizes, and download individual results or
a ZIP. Image processing runs locally in the browser.

![Squash interface](public/meta.png)

## Run locally

Install [Flox](https://flox.dev/docs/install-flox/), then:

```sh
git clone https://github.com/smeltery/squash.git
cd squash
flox activate
bun install --frozen-lockfile
bun run dev
```

Open the local URL printed by Vite. Choose settings before adding images.

## Documentation

Start with the [documentation index](docs/README.md), or jump to:

- [Using Squash](docs/usage.md): workflow, downloads, and privacy.
- [Formats and troubleshooting](docs/formats.md): quality controls and limitations.
- [Development](docs/development.md): Flox, checks, hooks, and LOC budgets.
- [Architecture](docs/architecture.md): image processing and source layout.
- [Releases and hosting](docs/releases.md): CI, automatic releases, and static hosting.

Licensed under [PolyForm Shield 1.0.0](LICENSE).
