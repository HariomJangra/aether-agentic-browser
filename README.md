# Aether Agentic Browser

Aether is a next-generation, minimalist web browser designed with an "agentic" AI-first philosophy. Built on a native Windows UI foundation with dynamic React-based interfaces, Aether prioritizes speed, intelligent search, and a clean, distraction-free user experience.

*Note: This project is currently in active development.*

## System Architecture

The Aether repository is structured to separate the native execution shell from the dynamic web-based tools and interfaces it powers.

- **Agentic Browser (Native Shell)**
  A high-performance C++ WinUI 3 / XAML application that serves as the core browser window. It provides deep OS integration, seamless performance, and native rendering capabilities.

- **Agentic AI Frontends**
  Built as Git submodules, these React and Vite applications power the intelligent features of the browser:
  - `aether-navigator`: The core interface for navigation and browsing assistance.
  - `aether-search`: The customizable start page, featuring intelligent widgets (clock, weather, quotes), an interactive minimalist UI, and multi-engine search capabilities (including Perplexity).

- **Backend**
  Handles extension management and core services to extend the browser's capabilities.

## Key Features

- **Minimalist User Interface**: A distraction-free environment featuring a dynamic dot grid, clean typography, and a refined color palette.
- **Intelligent Start Page**: Includes built-in widgets (weather, clock, quotes), greeting messages, and a unified bottom navigation bar.
- **Multiple Search Engines**: Seamlessly switch between standard search engines and AI-driven platforms like Perplexity.
- **Native Windows Performance**: Powered by a C++ WinUI 3 backend, ensuring minimal overhead and native system integration.
- **Agentic AI Integration**: Designed from the ground up to support AI assistance directly within the browsing workflow.

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

### Cloning the Repository

Because this repository uses submodules for the frontend applications, ensure you clone it recursively:

```bash
git clone --recursive https://github.com/HariomJangra/Aether-Agentic-Browser.git
```

If you have already cloned the repository without the `--recursive` flag, initialize and update the submodules with:

```bash
git submodule update --init --recursive
```

### Building the Project

#### 1. Build the Frontends

Navigate to the frontend directories and install the necessary dependencies:

```bash
# For aether-search
cd "Agentic AI/aether-search/frontend"
npm install
npm run build

# For aether-navigator
cd "../../aether-navigator/frontend"
npm install
npm run build
```

#### 2. Build the Native Shell

Open the `Agentic Browser.slnx` or `.vcxproj` in Visual Studio 2022. Select your target architecture (e.g., x64), ensure all dependencies are restored, and build the solution.

## Contributing

As this project is in active development, contributions, feature requests, and issue reports are welcome. Please ensure that PRs align with the minimalist design philosophy and maintain the performance standards of the native shell.

## License

This project is open-source. Please see the complete license information in the respective directories for more information.
