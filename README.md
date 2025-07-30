# FindexAI — Your "Ctrl + F" on steroids

FindexAI transforms the humble browser-search shortcut into a full-blown, AI-powered discovery engine. Whether you're scouring a long article, diving into YouTube transcripts, or hunting down a fact on the live web, FindexAI brings the power of LangChain agents, vector search, and a seamless browser extension right to your fingertips.

## Core Capabilities

• **Instant AI Chat Sidebar** - Triggered by your favorite shortcut (e.g. Ctrl + Shift + F)  
• **Multi-Agent Architecture:**

- Web-search agent (SearchXNG) for real-time, up-to-date answers
- YouTube agent that pulls video transcripts and context
- HTML-page agent that converts on-page content into Markdown for deep querying  
   • **Vector-based Similarity Search** (FAISS) for lightning-fast retrieval of previously indexed content  
   • **Model-agnostic Backend** - Plug in OpenAI, Anthropic, local LLMs, or your own API keys  
   • **Chat History & User Authentication** - SQLite-powered persistence (coming soon)  
   • **Fully Modular Architecture** - FastAPI backend and React-based browser extension (Chrome & Firefox)
- **Live Demo** - Try our reactive agent at [findex.tashif.codes/chat](https://findex.tashif.codes/chat)

## Why FindexAI?

• **Beyond Simple Text-Matching** - Semantic search means you can ask "What did the author say about supply chains?" even if the exact phrase never appears  
• **Multi-Source Intelligence** - Combine web search, video transcripts, and in-page context in a single conversation  
• **Privacy & Key-Friendly** - Bring your own API key (BYOK), store it locally, or swap models on the fly  
• **Developer-Friendly** - Open architecture lets you extend agents, swap vector stores, or even run entirely client-side with LangChain.js
• **Live Demo Available** - Try our reactive agent at [findex.tashif.codes/chat](https://findex.tashif.codes/chat) and explore our [landing page](https://findex.tashif.codes)

## Technical Architecture

### Backend (FastAPI + LangChain)

- **Agentic Workflow** - Orchestrating ReAct, search, vector DB lookups, YouTube and HTML agents
- **FAISS Vector Store** - For embeddings and similarity search
- **ChromaDB Integration** - Advanced vector database for semantic search
- **LangChain & LangGraph** - Powerful agent orchestration and workflow management
- **SQLite Database** - For user data, chat history & config (planned)
- **Modular Design** - Model-agnostic architecture for easy integration of new LLMs
- **API Endpoints** - `/ask`, `/video-info`, `/subs`, `/website`, `/crawller`, `/health`

### Frontend (React + WebExtension APIs)

- **Shortcut Listener** - Hijack or augment Ctrl + F
- **Sidebar UI** - Injected into any page for live chat and answer insertion
- **YouTube UI Injection** - Chat icon overlays player, video ID auto-extracted
- **LocalStorage** - For API keys, theme settings, and model choices
- **Theme Engine** - MacOS Classic, Ocean Dark/Light, Windows XP, Neobrutal, and more
- **React Framework Rearchitecture** - Modern React-based extension with improved performance and maintainability

### Extension Features

- **Fixed Find Tool** - Powerful DOM search (Ctrl+Shift+F)
- **Page Search Tool** - Enhanced in-page search (Ctrl+F)
- **Sidebar Chat** - AI-powered Q&A interface
- **Theme Support** - Multiple UI themes (XP, macOS, Neobrutal, Nintendo, etc.)

## Documentation

- **[Live Documentation](https://findex.tashif.codes/docs)** - Complete API reference, architecture details, and usage guides
- **[Self-Hosting Guide](DOCKER_README.md)** - Docker setup and deployment instructions

## Installation & Setup

### Backend (FastAPI)

1. **Install dependencies:**

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run the backend server:**

   ```bash
   uvicorn app.main:app --reload
   ```

3. **Configure API keys:**
   - Set up your LLM API keys in environment variables
   - See `backend/app/core/config.py` for configuration details

### Frontend (Landing Page)

1. **Install dependencies:**

   ```bash
   cd landing_page
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser**

### Extension (Chrome/Firefox)

1. **Build the extension:**

   ```bash
   cd extension
   npm install
   npm run build
   ```

2. **Install in browser:**
   - Go to `chrome://extensions/` (or Firefox Add-ons)
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `extension/dist` folder

## Themes & Customization

Pick your vibe—whether it's glassy, brutalist, classic MacOS, or even Nintendo '95—FindexAI's theme engine lets you search in style.

**Available Themes:**

- ✅ MacOS Classic
- ✅ Neobrutal
- ✅ Ocean Dark
- ✅ Ocean Light
- ✅ Material UI
- ✅ Cream
- ✅ Nintendo
- ✅ Windows XP
- ✅ Orange Dark
- ✅ Orange Light
- ✅ Google 1995
- ⏳ Liquid Glass (coming soon)

## Project Status

### Backend

- [x] LangChain setup
- [x] Agentic workflow
- [x] ReAct agent support
- [x] FAISS - Vector DB
- [x] SearchXNG (websearch agent)
- [x] YouTube (YT) Agent
- [x] HTML page queries (agent) - html to md
- [x] Github Agent
- [ ] Docs Agent - Document processing and querying
- [ ] Documentations Craller (like the tailwind docs and all)
- [ ] Document upload (pdf, docx, txt, md) file RAG and agent
- [x] Chat history storage
- [x] Modular Backend (app repo)
- [x] Flask → FastAPI migration
- [x] ChromaDB integration
- [x] LangGraph workflow orchestration
- [x] Model-agnostic architecture
- [ ] BYOKs (Bring Your Own Keys) (in progress)
- [ ] SQLite DB (planned)

### Frontend

- [x] React to dist script
- [x] Firefox and Chrome manifest generator script
- [x] Shortcut (`Ctrl+F` overwrite or `Ctrl + Shift + F`)
- [x] Create relative UI for initial answer
- [x] Browser sidebar API use for chat interface
- [x] Inject chat icon YouTube UI
- [x] YouTube video ID extraction and send to backend
- [x] React framework rearchitecture
- [ ] Add model selector and configuration UI (planned)
- [ ] localStorage to store API keys/configs (planned)

### Extension

- [x] Fixed Find Tool implementation
- [x] Page Search Tool
- [x] Sidebar UI with themes
- [x] YouTube integration
- [x] Keyboard shortcuts
- [x] Options page
- [x] Responsive design

## Contributors

**Tashif Ahmad Khan** - Backend Developer, Designer and Frontend Website  
**Harleen Kaur** - GenAI
**Shaurya** - Web Extension
**Saarthak** - Web Extension

## Contributing

We welcome contributions! To get started:

1. Fork the repository and clone it locally
2. Set up the backend and frontend as described above
3. Create a new branch for your feature or bugfix
4. Submit a pull request with a clear description of your changes

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Roadmap

### Upcoming Features

- [ ] BYOK (Bring Your Own Keys) support
- [ ] More theme options
- [ ] Mobile extension support
- [ ] Advanced chat history features
- [ ] Documentations Craller (like the tailwind docs and all)
- [ ] Document upload (pdf, docx, txt, md) file RAG and agent

---

**FindexAI** - Making search smarter, faster, and more contextual.
