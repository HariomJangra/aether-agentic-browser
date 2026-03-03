# Aether — Agentic Browser

A monorepo containing the Aether browser project and its supporting components.

## Structure

```
├── Agentic Browser/     # WinUI 3 desktop browser (C++/WinRT + WebView2)
├── Agentic AI/          # AI & automation layer
│   └── browser-automation/  # ReAct agent for browser automation (submodule)
├── Backend/             # Backend services and extensions
│   └── Extensions/      # Browser extensions (e.g. AdGuard)
└── frontend/            # Web frontend / home page
```

## Projects

### Agentic Browser
A Windows desktop browser built with WinUI 3, WebView2, and Windows App SDK. Features an integrated AI assistant panel, tab management, and a clean modern UI.

### Agentic AI
AI-powered browser automation using a ReAct agent loop. See [browser-automation](Agentic%20AI/browser-automation) submodule for details.

### Backend
Server-side services and bundled browser extensions.

### Frontend
Web UI components and the browser home page.

## Getting Started

### Cloning (with submodules)
```bash
git clone --recurse-submodules https://github.com/HariomJangra/Aether-Agentic-Browser.git
```

If you already cloned without submodules:
```bash
git submodule update --init --recursive
```

### Building the Browser
1. Open `Agentic Browser/Agentic Browser.slnx` in Visual Studio 2022
2. Restore NuGet packages
3. Build in `x64 | Debug` or `x64 | Release`

## License
See [LICENSE.txt](Agentic%20Browser/LICENSE.txt)
