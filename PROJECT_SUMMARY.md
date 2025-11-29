# Interactive Portfolio with AI Chat — PPT Summary

## Introduction
- Single-page portfolio with modern blue/cyan theme, glassmorphism, animations.
- Embedded chat widget (FAQ + LLM) powered by Hugging Face Llama‑3 via Node.js proxy.
- Sections: Hero, About, Skills, Projects, Timeline, Contact, Chat.

## Problem Statement
- Static portfolios lack interactivity and guided exploration.
- Browser CORS blocks direct AI API calls from the client.
- Need a conversational assistant that can answer and navigate content.

## Objectives
- Build responsive, animated portfolio with consistent theme.
- Implement hybrid chat (regex FAQ + LLM fallback).
- Solve CORS via Express proxy; secure API key usage.
- Improve UX with action chips, smooth transitions, and responsive layouts.

## Methodology & Results
- Designed hero with particles, floating SVG icons, rotating quotes.
- Built chat widget (iframe) with settings panel, message rendering, chips.
- Implemented `hf-proxy.js` (Express + CORS) calling HF Router (`/v1/chat/completions`).
- Converted entire theme from green → blue/cyan (50+ color updates).
- Results: Fast FAQ (<100ms), LLM responses in ~2–5s; smooth animations; consistent UI.

## GitHub Repository (Screens)
- `portfolio.html`: main UI and hero, sections, chat embed.
- `chat-widget.html`: UI, CSS variables, FAQ patterns, navigation postMessage.
- `hf-proxy.js`: Express proxy, `/api/chat`, `/health`, error handling.
- `ALTERNATIVE_METHODS.md`: 5 simpler approaches (serverless, Cohere, WebLLM, FAQ-only, direct HF).
- `package.json`: express, cors, dotenv.

## Conclusion & Future Work
- Conclusion: Interactive, AI-assisted portfolio overcoming CORS via proxy; modern, responsive, user-friendly.
- Future: multi-language support, chat history, voice I/O, analytics, PWA, serverless deploy, tests/CI.

## Quick Setup (for demo slide)
- `npm install` → `node hf-proxy.js` → open `portfolio.html` → set HF API key in chat settings.

Developer: Dhruv • Course: VACS302 • ABES • Nov 2025
