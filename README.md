# Aether Agentic Browser

![Aether Preview](https://i.postimg.cc/25KJCPGV/Aether-Preview.png)

Aether is a minimalist, AI-first browser built for speed, clarity, and intelligent navigation. It combines a native Windows shell with dynamic React frontends to deliver a clean, distraction-free experience that feels fast and focused.

*Status: active development.*

## Why Aether

- **Native performance** with a C++ WinUI 3 shell for low overhead and OS-level integration.
- **Agentic UX** designed to surface intelligent actions during browsing, not as an afterthought.
- **Calm visual language** featuring a refined grid, typography, and subtle depth.
- **Modular frontends** that ship as independent React apps for rapid iteration.

## What Is Inside

The repository splits the native browser shell from the AI frontends it hosts.

- **Agentic Browser (Native Shell)**
  C++ WinUI 3/XAML application that owns the main window and performance-critical rendering.
- **Agentic AI Frontends (Git submodules)**
  - `aether-navigator`: Core navigation UI and browsing assistance.
  - `aether-search`: Start page, widgets, and multi-engine search shortcuts.
- **Backend**
  Extension management and core services that expand the browser's capabilities.

## Key Features

- **Minimalist UI** with a strong focus on clarity and flow.
- **Intelligent start page** with widgets (weather, clock, quotes) and quick actions.
- **Multi-engine search** with fast switching, including AI-driven platforms.
- **Native Windows performance** via C++ WinUI 3 for a responsive feel.
- **Agentic foundation** designed for AI-assisted browsing workflows.

## Repository Structure

```text
Aether-Agentic-Browser/
├── Agentic Browser/      # Native C++ WinUI 3/UWP core shell
├── Agentic AI/
│   ├── aether-navigator/ # React+Vite frontend submodule for navigation
│   └── aether-search/    # React+Vite frontend submodule for the start page
├── Backend/              # Core extension and backend services
├── WorkSpace/            # Utilities (e.g., CRX Extractor) and graphics
└── README.md
```

## Getting Started

### Prerequisites

- Windows 10/11 with the latest SDKs
- Visual Studio 2022 with the "Desktop development with C++" and "Universal Windows Platform development" workloads
- Node.js and npm (for building the React frontends)
- Git

### Clone the Repository

This repo uses submodules for frontend apps. Clone recursively:

```bash
git clone --recursive https://github.com/HariomJangra/Aether-Agentic-Browser.git
```

If you already cloned without `--recursive`:

```bash
git submodule update --init --recursive
```

### Build the Frontends

```bash
# aether-search
cd "Agentic AI/aether-search/frontend"
npm install
npm run build

# aether-navigator
cd "../../aether-navigator/frontend"
npm install
npm run build
```

### Build the Native Shell

Open `Agentic Browser.slnx` or `.vcxproj` in Visual Studio 2022, select your target architecture (e.g., x64), restore dependencies, and build the solution.

## Contributing

Contributions, feature requests, and issues are welcome. Please keep PRs aligned with the minimalist design philosophy and the performance goals of the native shell.

## License

This project is open source. See the license files in the respective directories for details.
