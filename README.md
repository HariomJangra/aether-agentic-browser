# Aether Browser — Multilingual Voice-First Agentic Web Browser

> **Gnani AI Hackathon Edition** | Built with **Gnani.ai** (Prisma STT, Evon 3.3 LLM, Timber 2.5 TTS) + **DeepSeek** + **WinUI 3 (C++)**

![Aether Preview](https://i.postimg.cc/25KJCPGV/Aether-Preview.png)

Aether is a next-generation, AI-first browser that pairs a high-performance native Windows C++ shell with an autonomous, **voice-first agentic assistant**. Speak in your mother tongue — Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, Gujarati, Punjabi, Malayalam, or English — and Aether executes complex, real-time browser actions autonomously and speaks the results back to you.

---

## 🎙️ The Gnani.ai Multilingual Voice Pipeline

Aether integrates **Gnani.ai's state-of-the-art Voice & Language models** to deliver a seamless end-to-end voice browsing experience:

```
 ┌────────────────┐       ┌─────────────────┐       ┌────────────────────────┐
 │   User Speaks  │ ───►  │  Gnani Prisma   │ ───►  │     Gnani Evon 3.3     │
 │ (Any Language) │       │  STT (Auto-LID) │       │ (Browser Task Planner) │
 └────────────────┘       └─────────────────┘       └────────────────────────┘
                                                                 │
                                                                 ▼
 ┌────────────────┐       ┌─────────────────┐       ┌────────────────────────┐
 │  Audio Reply   │ ◄───  │ Gnani Timber 2.5│ ◄───  │    DeepSeek + CDP      │
 │ (User's Voice) │       │ Neural Voice TTS│       │ (Streaming Browser AI) │
 └────────────────┘       └─────────────────┘       └────────────────────────┘
```

### 1. Speech-to-Text: **Gnani Prisma STT (v3.0)**
- Captures live user voice with noise suppression and echo cancellation.
- Features **Automatic Language Identification (`Auto-LID`)** supporting major Indic languages & English (Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, Gujarati, Punjabi, Malayalam, Hinglish).
- Real-time transcription into text.

### 2. Intent & Task Formulation: **Gnani Evon 3.3 LLM**
- Understands colloquial, conversational speech and preserves multi-turn conversational context.
- Converts regional language queries into clean, deterministic browser automation tasks in English for the underlying browser engine.

### 3. Real-Time Autonomous Browser Execution: **DeepSeek + CDP**
- Automates live browser tabs via Chrome DevTools Protocol (`agent-browser`).
- Performs interactive actions: taking accessibility snapshots, clicking elements (`@ref`), filling forms, scrolling, switching tabs, and navigating.
- **True Real-Time SSE Streaming**: Tool execution steps (`tool_call`, `tool_result`, and AI reasoning) stream progressively into the assistant panel as they occur.

### 4. Multilingual Response Translation: **Gnani Evon 3.3 LLM**
- Translates the agent's concise English completion summary back into the user’s original spoken language.

### 5. Text-to-Speech: **Gnani Timber 2.5 Neural TTS**
- Synthesizes expressive, high-fidelity neural speech in the user's native language.
- Automatically streams and plays back the voice in the assistant panel, accompanied by an interactive replay player.

---

## ✨ Key Features

- **🗣️ Voice-Driven Navigation** — Click the *Speak* button and instruct the browser naturally (e.g., *"YouTube pe latest tech news chalao"* or *"Flipkart par wireless earbuds dhoondho"*).
- **⚡ Native Windows Shell** — High-speed C++ WinUI 3 core with OS-level integration and embedded WebView2 engines.
- **🌊 Real-Time Action Streaming** — Live visual feedback showing every browser action (snapshot, click, fill, scroll) in real-time.
- **🎨 Minimalist Aesthetics** — Warm, distraction-free aesthetic with custom home page widgets (`aether-home`).
- **🛡️ Clean Modular Architecture** — Decoupled voice module (`Backend/gnani/`) that seamlessly hooks into the browser backend without altering core navigation capabilities.

---

## 📁 Repository Structure

```
Aether-Agentic-Browser/
├── Agentic Browser/                # Native C++ WinUI 3 shell (core application)
├── Agentic AI/
│   ├── aether-navigator/           # Browser Assistant (Sidebar panel)
│   │   ├── Backend/                # FastAPI assistant server (Port 5050)
│   │   │   ├── gnani/              # Gnani.ai Integration Module
│   │   │   │   ├── prisma_stt.py   # Gnani Prisma STT client
│   │   │   │   ├── evon_llm.py     # Gnani Evon 3.3 task formulator & translator
│   │   │   │   ├── timber_tts.py   # Gnani Timber 2.5 TTS client
│   │   │   │   └── routes.py       # Voice streaming endpoints (/gnani/voice-chat)
│   │   │   ├── agent.py            # DeepSeek / LangGraph browser automation agent
│   │   │   └── routes.py           # Core chat streaming
│   │   └── frontend/               # React + TypeScript assistant panel UI
│   │       └── src/components/gnani/ # SpeakButton, useVoiceRecorder, AudioPlayer
│   └── aether-home/                # Home page frontend & widgets (Port 8000)
├── Gnani/                          # Gnani AI integration documentation & architecture
```

---

## 🚀 Quickstart & Setup

### Prerequisites

- **Windows 10 / 11**
- **Node.js 18+** & npm
- **Python 3.10+**
- **Visual Studio 2022** (with C++ Desktop & UWP workloads)

### 1. Configure API Keys

In `Agentic AI/aether-navigator/Backend/.env`:
```dotenv
GNANI_API_KEY = "your_gnani_api_key_here"
DEEPSEEK_API_KEY = "your_deepseek_api_key_here"
```

### 2. Build the Frontends

```bash
# Build aether-home (New Tab / Home screen)
cd "Agentic AI/aether-home/frontend"
npm install
npm run build

# Build aether-navigator (Agent Assistant Panel)
cd "../../../Agentic AI/aether-navigator/frontend"
npm install
npm run build
```

### 3. Launch the Backend Server

```bash
cd "Agentic AI/aether-navigator/Backend"
pip install -r requirements.txt
python app.py
```
*(Server starts on `http://localhost:5050`)*

### 4. Run the Native Browser

1. Open `Agentic Browser/Agentic Browser.slnx` in Visual Studio 2022.
2. Select **x64** configuration.
3. Build and launch (`F5`).
4. Click the **Assistant** icon on the top-right toolbar or click the **Speak** button in the panel to test multilingual voice automation!

---

## 📄 License

This project is licensed under the terms specified in [LICENSE.txt](LICENSE.txt).
