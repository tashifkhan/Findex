# Findex

Ctrl + F Extetended (on steriods)

## Basic Plan

<img width="1050" height="1009" alt="image" src="https://github.com/user-attachments/assets/ceda4f37-7c0d-4a90-b79a-2b41e2e25844" />

- [ ] umm explore langhain.js (maybe works on client side)

## Todos

### Backend

- [x] Langchain setup
- [x] Agentic workflow
- [ ] model-agnostic architecture
- [x] ReAct agent support
- [x] FAISS - Vector DB
- [x] SearchXNG (websearch agent)
- [x] YouTube (YT) Agent
- [x] HTML page queries (agent) - html to md
- [x] chat history storage
- [ ] ~~Auth add (maybe don't need if its keys)~~
- [ ] ~~SQLite DB~~
- [ ] BYOKs (Bring Your Own Keys)
- [x] Modular Backend (app repo)
- [x] Flask -> FastAPI

### Frontend

- [x] React to dist script
- [x] Firefox and Chrome manifest generator script
- [x] shortcut (`Ctrl+F` overwrite or maybe `Ctrl + Shift + F`)
- [x] Create relative UI for initial answer

  - just below the ui

- [x] browser sidebar api use for chat interface
- [ ] Add model selector and configuration UI

  - at launch

- [ ] localStorage to store API keys/configs
- [x] inject chat icon YouTube UI
- [x] YouTube video ID extraction and send to backend

## Themes

- [ ] Liquid Glass
- [x] MacOS Classoc
- [x] Neobruatal
- [x] Ocean Dark
- [x] Ocean Light
- [ ] Material UI
- [ ] Cream
- [ ] Nentendo
- [x] Windows XP
- [ ] Orange Dark
- [ ] Orange Light
- [ ] Google 1995

---

# Readme GPT Edition

## FindexAI — Your “Ctrl + F” on steroids

FindexAI transforms the humble browser-search shortcut into a full-blown, AI-powered discovery engine. Whether you’re scouring a long article, diving into YouTube transcripts, or hunting down a fact on the live web, FindexAI brings the power of LangChain agents, vector search, and a seamless browser extension right to your fingertips.

## Core Capabilities

• Instant AI chat sidebar triggered by your favorite shortcut (e.g. Ctrl + Shift + F)  
• Multi-agent architecture:  
 – Web-search agent (SearchXNG) for real-time, up-to-date answers  
 – YouTube agent that pulls video transcripts and context  
 – HTML-page agent that converts on-page content into Markdown for deep querying  
• Vector-based similarity search (FAISS) for lightning-fast retrieval of previously indexed content  
• Model-agnostic backend: plug in OpenAI, Anthropic, local LLMs, or your own API keys  
• Chat history, user authentication, and SQLite-powered persistence (coming soon)  
• Fully modular FastAPI backend and React-based browser extension (Chrome & Firefox)

## Why FindexAI?

• Beyond simple text-matching: semantic search means you can ask “What did the author say about supply chains?” even if the exact phrase never appears  
• Multi-source intelligence: combine web search, video transcripts, and in-page context in a single conversation  
• Privacy- and key-friendly: bring your own API key (BYOK), store it locally, or swap models on the fly  
• Developer-friendly: open-architecture lets you extend agents, swap vector stores, or even run entirely client-side with LangChain.js

## Technical Architecture

1. Backend (FastAPI + LangChain)  
   • Agentic workflow orchestrating ReAct, search, vector DB lookups, YouTube and HTML agents  
   • FAISS vector store for embeddings  
   • SQLite for user data, chat history & config  
   • Modular, model-agnostic design for easy integration of new LLMs
2. Frontend (React + WebExtension APIs)  
   • Shortcut listener to hijack or augment Ctrl + F  
   • Sidebar UI injected into any page for live chat and answer insertion  
   • YouTube UI injection: chat icon overlays player, video ID auto-extracted  
   • LocalStorage for API keys, theme settings, and model choices  
   • Theme engine (MacOS Classic, Ocean Dark/Light, Windows XP, Neobrutal, …)

## Current Status & Roadmap

Backend  
• LangChain setup, SearchXNG, YT & HTML agents: complete  
• FAISS vector DB, ReAct support, chat history, BYOK & SQLite persistence: in progress  
• Auth layer & extended model-agnostic hooks: upcoming

Frontend  
• React build & dist script, YouTube injection, sidebar UI: complete  
• Firefox/Chrome manifest generator, keyboard shortcut config, initial inline-answer UI: pending  
• Model selector, localStorage config UI: on deck

### Themes & Customization

Pick your vibe—whether it’s glassy, brutalist, classic MacOS, or even Nintendo ’95—FindexAI’s theme engine lets you search in style.
