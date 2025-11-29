# MiniProject: Portfolio + Chatbot (Blue/Cyan Tech)

A modern personal portfolio with an embedded AI chatbot. The chatbot uses a lightweight Node.js proxy to call Hugging Face Router (OpenAI-compatible API) and falls back to simple FAQ matching when possible. The site features an animated hero section (particles, floating SVG icons, rotating quotes) and a cohesive Blue/Cyan Tech theme.

## Features
- **Chatbot:** Hybrid FAQ + LLM via Hugging Face Router (`/v1/chat/completions`).
- **Proxy Server:** Express-based CORS-safe relay (`hf-proxy.js`).
- **UI/UX:** Glassmorphism accents, clean typography, responsive layout.
- **Hero Section:** Particles, floating tech icons, rotating motivational quotes.
- **Theme:** Blue/Cyan palette (primary `#00d9ff`, deep blue `#1e40af`).

## Structure
- `portfolio.html` — Main portfolio page embedding the chat widget.
- `chat-widget.html` — Standalone chatbot UI (iframe-ready).
- `hf-proxy.js` — Node.js Express proxy to Hugging Face Router.
- `PROJECT_SUMMARY.md` — Condensed, slide-ready project summary.

## Prerequisites
- **Node.js** 18+ and **npm**.
- A **Hugging Face access token** with Inference access.

## Quick Start
1. Install dependencies (proxy):
```powershell
# From the miniProject folder
npm init -y
npm install express cors node-fetch@3
```

2. Configure your Hugging Face token:
- Open `chat-widget.html` and set the token in the widget settings UI (stored via `localStorage`).
- Alternatively, set an environment variable before starting the proxy:
```powershell
$Env:HF_TOKEN = "hf_xxx_your_token_here"
```

3. Run the proxy server:
```powershell
node hf-proxy.js
```
- Default port: `http://localhost:3000`
- Health check: `http://localhost:3000/health`

4. Open the portfolio:
- Double-click `portfolio.html` or serve it with a simple local server.

## Usage
- Use the chat toggle button on `portfolio.html` to open the widget.
- Ask questions; the widget tries FAQ first, then calls the proxy to reach Hugging Face Router using model `meta-llama/Meta-Llama-3-8B-Instruct`.
- If you change ports or endpoints, update the proxy URL in `chat-widget.html`.

## Configuration
- **Model:** `meta-llama/Meta-Llama-3-8B-Instruct` via `https://router.huggingface.co/v1/chat/completions`.
- **Proxy Route:** `POST /api/chat` returning `{ generated_text }`.
- **Iframe Size:** `362×517` for consistent layout.

## Theme
- **Palette:** `#00d9ff` (cyan), `#0891b2`, `#1e40af`, text `#e0f2fe/#7dd3fc`, backgrounds `#0a1520/#1a2f3d/#0d1a24`.
- **Style:** Glassmorphism, subtle gradients, responsive components.

## Troubleshooting
- **CORS errors:** Ensure you are calling the proxy (`/api/chat`) and that it’s running.
- **No responses:** Verify `HF_TOKEN` and internet connectivity; check terminal logs.
- **Styling mismatches:** Confirm you are using the Blue/Cyan theme files (`portfolio.html`, `chat-widget.html`).

## Optional: Generate Presentation
If you want a slide deck, see `PROJECT_SUMMARY.md` and use `python-pptx` with your template master.

## License
Personal/academic use. Do not redistribute proprietary assets without permission.
# Portfolio
# Portfolio
