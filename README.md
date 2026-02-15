# Holy Grail

<!-- markdownlint-disable MD033 MD013 -->
<p align="center">
<img src="public/images/holy-grail-hero.jpg" alt="Knights of the Holy Grail" width="480">
</p>

<p align="center">
<em>"We seek the Holy Grail of dev setups — one that doesn't break after a macOS update."</em>
</p>

<!-- Badges: Build & Quality -->
<p align="center">
<a href="https://github.com/lgtm-hq/holy-grail/actions/workflows/quality-ci.yml?query=branch%3Amain"><img src="https://img.shields.io/github/actions/workflow/status/lgtm-hq/holy-grail/quality-ci.yml?label=ci&branch=main&logo=githubactions&logoColor=white" alt="CI"></a>
<a href="https://github.com/lgtm-hq/holy-grail/actions/workflows/quality-e2e.yml?query=branch%3Amain"><img src="https://img.shields.io/github/actions/workflow/status/lgtm-hq/holy-grail/quality-e2e.yml?label=e2e&branch=main&logo=githubactions&logoColor=white" alt="E2E"></a>
<a href="https://github.com/lgtm-hq/holy-grail/actions/workflows/deploy-pages.yml?query=branch%3Amain"><img src="https://img.shields.io/github/actions/workflow/status/lgtm-hq/holy-grail/deploy-pages.yml?label=deploy&branch=main&logo=githubactions&logoColor=white" alt="Deploy"></a>
</p>

<!-- Badges: Security & License -->
<p align="center">
<a href="https://github.com/lgtm-hq/holy-grail/actions/workflows/codeql.yml?query=branch%3Amain"><img src="https://github.com/lgtm-hq/holy-grail/actions/workflows/codeql.yml/badge.svg?branch=main" alt="CodeQL"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="License"></a>
</p>

<!-- Badges: Tech Stack -->
<p align="center">
<a href="https://astro.build/"><img src="https://img.shields.io/badge/Astro-5-ff5d01?logo=astro&logoColor=white" alt="Astro"></a>
<a href="https://bun.sh/"><img src="https://img.shields.io/badge/bun-1.3+-black?logo=bun" alt="Bun"></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" alt="TypeScript"></a>
</p>
<!-- markdownlint-enable MD033 MD013 -->

## 🚀 Quick Start

```bash
# Using Bun (recommended)
bun install              # Install dependencies
bun run dev              # Start dev server
bun run build            # Build for production
bun run preview          # Preview production build

# Using npm
npm install
npm run dev
```

## ✨ Features

- **📖 25+ Guides** - Comprehensive step-by-step developer setup guides
- **🔍 Full-Text Search** - Instant search powered by Pagefind
- **🎨 Themed** - Dark and light themes via turbo-themes
- **⚡ Static & Fast** - Astro-powered static site generation
- **📱 Responsive** - Mobile-friendly, accessible layout

## 📚 Guides

| Category                  | Guides                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------- |
| 🐍 **Python**             | Python, Black, Pipenv, Pydantic, Marshmallow, Schema Validation                         |
| ☕ **Java & Build Tools** | Java, SDKMAN, Maven, Gradle                                                             |
| 📱 **Android**            | Android Studio, Android Emulator, ADB                                                   |
| 🍎 **iOS & Apple**        | Xcode, Carthage, ios-deploy, ideviceinstaller, libimobiledevice, ios-webkit-debug-proxy |
| 🧪 **Mobile Testing**     | Appium, Appium Inspector, Appium Doctor                                                 |
| 🌐 **Web & System**       | Node.js, Homebrew, Zsh                                                                  |

## 🛠️ Built With

| Tool                                                    | Purpose                                              |
| ------------------------------------------------------- | ---------------------------------------------------- |
| [Astro](https://astro.build/)                           | Static site framework                                |
| [MDX](https://mdxjs.com/)                               | Markdown with JSX components                         |
| [turbo-themes](https://github.com/lgtm-hq/turbo-themes) | Theme system (Catppuccin, Dracula, GitHub, and more) |
| [Pagefind](https://pagefind.app/)                       | Static full-text search                              |

## 🔨 Development

### Prerequisites

- **Bun** 1.3+ - [Install Bun](https://bun.sh/docs/installation)
- **Node.js** 22+ (alternative to Bun)
- **Python** 3.11+ with uv (for lintro)

### Setup

```bash
git clone https://github.com/lgtm-hq/holy-grail.git
cd holy-grail

# Using Bun (recommended)
bun install
bun run dev              # Development server
bun run build            # Production build (includes astro check)
bun run preview          # Preview production build

# Using npm
npm install
npm run dev
```

### Linting

```bash
uv run lintro chk        # Check for issues
uv run lintro fmt        # Auto-fix formatting
```

## 🤝 Community

- 🐛 [Bug Reports](https://github.com/lgtm-hq/holy-grail/issues/new)
- 💡 [Feature Requests](https://github.com/lgtm-hq/holy-grail/issues/new)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
