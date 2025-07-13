# FindexAI Documentation

## Overview

FindexAI is an AI-powered browser extension and platform that transforms the traditional "Ctrl+F" search into a semantic, multi-agent, and vector-based discovery engine. Whether you're searching through long articles, YouTube videos, or live web content, FindexAI leverages advanced language models, vector search, and a modular architecture to help you find information faster and more intelligently.

- **Browser Extension:** Works in Chrome and Firefox, providing an AI chat sidebar and enhanced search capabilities.
- **Backend:** FastAPI-based, modular, and model-agnostic, supporting multiple agents (web, YouTube, HTML) and vector search (FAISS).
- **Frontend:** React-based UI with a powerful theme engine and seamless integration into your browsing workflow.

---

## Key Features

- **AI Chat Sidebar:** Instantly access an AI-powered chat by pressing a shortcut (e.g., Ctrl+Shift+F).
- **Multi-Agent Architecture:**
  - **Web Search Agent (SearchXNG):** Real-time, up-to-date answers from the web.
  - **YouTube Agent:** Pulls video transcripts and context for deep video search.
  - **HTML Page Agent:** Converts on-page content to Markdown for semantic querying.
- **Vector Similarity Search:** Uses FAISS for lightning-fast retrieval of indexed content.
- **Model-Agnostic Backend:** Plug in OpenAI, Anthropic, local LLMs, or your own API keys (BYOK).
- **Theming Engine:** Choose from MacOS Classic, Ocean Dark/Light, Windows XP, Neobrutal, and more.
- **YouTube UI Injection:** Chat icon overlays player, video ID auto-extracted for context-aware queries.
- **LocalStorage:** Store API keys, theme settings, and model choices securely in your browser.
- **Planned:** Chat history, user authentication, SQLite persistence, and more.

---

## Use Cases

FindexAI is built for everyone:

- **Students & Researchers:** Quickly find specific information in research papers, lecture videos, and academic content without endless scrolling.
- **Developers:** Navigate complex documentation, find code examples, and understand APIs faster with semantic search.
- **Knowledge Workers:** Analyze content, extract insights, and compare information across multiple sources with AI assistance.
- **Content Creators:** Gather information, verify facts, and find supporting content for articles, videos, and presentations.

---

## Architecture

```mermaid
graph TD;
  A[Browser Extension (React)] -- API Calls --> B(Backend API (FastAPI))
  B -- Agents --> C[Web Search Agent]
  B -- Agents --> D[YouTube Agent]
  B -- Agents --> E[HTML Page Agent]
  B -- Vector Search --> F[FAISS Vector DB]
  B -- (Planned) --> G[SQLite DB]
  B -- Model Agnostic --> H[OpenAI/Anthropic/Local LLMs]
```

- **Backend:** Orchestrates agentic workflows, vector DB lookups, and model-agnostic LLM calls.
- **Frontend:** Injects sidebar UI, listens for shortcuts, and manages user settings/themes.
- **Extension:** Chrome/Firefox support, YouTube integration, and sidebar chat.

---

## Backend Architecture

The backend of FindexAI is a modular, FastAPI-based service that powers the AI search, agentic workflows, and data processing for the browser extension and web clients. Here’s an overview of its structure and operation:

### 1. Core Structure

- **Entrypoint:**  
  The main FastAPI app is defined in `backend/app/main.py`. It sets up CORS, logging, and includes routers for all major API endpoints (video info, subtitles, ask, health, website, crawler).
- **Configuration:**  
  Environment variables and API keys are managed in `backend/app/core/config.py`, supporting flexible deployment and secure key management.
- **LLM Integration:**  
  The backend interfaces with large language models (LLMs) via `backend/app/core/llm.py`. It currently supports Google Gemini, with planned support for OpenAI, Anthropic, Ollama, and DeepSeek via LangChain.

### 2. API Routing and Agents

- **Routes:**  
  Each major function (e.g., `/ask`, `/video-info`, `/subs`, `/website`, `/crawller`) has its own route module in `backend/app/routes/`. These routes handle requests, validate input, and orchestrate agent workflows.
- **Agents:**  
  The backend is designed around the concept of “agents”—modular components that handle specific types of queries:
  - **Web Search Agent:** For real-time web answers.
  - **YouTube Agent:** For extracting and querying video transcripts and metadata.
  - **HTML Page Agent:** For converting web pages to Markdown and enabling deep semantic search.

### 3. Data Models

- **Request/Response Models:**  
  All API endpoints use Pydantic models for request validation and response formatting, found in `backend/app/models/requests/` and `backend/app/models/response/`.
- **YouTube Info Model:**  
  Specialized models (e.g., `YTVideoInfo`) are used for handling video metadata and transcripts.

### 4. Example Workflow: The `/ask` Endpoint

When a user asks a question about a YouTube video:

1. The frontend sends a POST request to `/ask` with the video URL and question.
2. The backend:
   - Validates the request.
   - Extracts the video ID and fetches video info (title, description, transcript, etc.).
   - Passes this context, along with the user’s question, to the YouTube agent and LLM.
   - Returns a generated answer, along with video metadata, to the frontend.

### 5. Extensibility

- **Model-Agnostic:**  
  The backend is designed to support multiple LLM providers. You can configure which model to use via environment variables.
- **Modular Agents:**  
  New agents can be added for other data sources or workflows.
- **Planned Features:**
  - Vector search (FAISS) for fast retrieval.
  - SQLite for chat history and user data.
  - Authentication and BYOK (Bring Your Own Keys).

---

## API Routes

Below are the main API endpoints exposed by the FindexAI backend:

| Endpoint    | Method | Description                                     |
| ----------- | ------ | ----------------------------------------------- |
| /video-info | POST   | Get YouTube video metadata and info             |
| /subs       | POST   | Retrieve and clean YouTube video subtitles      |
| /ask        | POST   | Ask a question about a YouTube video            |
| /website    | POST   | Ask a question about a web page                 |
| /crawller   | POST   | (Planned) Ask a question using web search agent |
| /health     | GET    | Health check for the backend                    |

### /video-info (POST)

- **Description:** Returns metadata for a given YouTube video URL.
- **Request:** `{ "url": "<YouTube URL>" }`
- **Response:** Video metadata (title, description, uploader, tags, etc.)
- **Example:**
  ```json
  POST /video-info
  { "url": "https://www.youtube.com/watch?v=abc123" }
  ```

### /subs (POST)

- **Description:** Retrieves and cleans subtitles for a YouTube video.
- **Request:** `{ "url": "<YouTube URL>", "lang": "en" }`
- **Response:** `{ "subtitles": "..." }`
- **Example:**
  ```json
  POST /subs
  { "url": "https://www.youtube.com/watch?v=abc123", "lang": "en" }
  ```

### /ask (POST)

- **Description:** Ask a question about a YouTube video. Returns an AI-generated answer using video context.
- **Request:** `{ "url": "<YouTube URL>", "question": "<Your question>" }`
- **Response:** `{ "answer": "...", "video_title": "...", "video_channel": "..." }`
- **Example:**
  ```json
  POST /ask
  { "url": "https://www.youtube.com/watch?v=abc123", "question": "What is the main topic?" }
  ```

### /website (POST)

- **Description:** Ask a question about the content of a web page. The backend fetches, converts, and queries the page.
- **Request:** `{ "url": "<Webpage URL>", "question": "<Your question>" }`
- **Response:** `{ "answer": "..." }`
- **Example:**
  ```json
  POST /website
  { "url": "https://example.com/article", "question": "What are the key points?" }
  ```

### /crawller (POST)

- **Description:** (Planned) Ask a question using the web search agent. Returns an answer based on live web data.
- **Request:** `{ "question": "<Your question>" }`
- **Response:** `{ "answer": "..." }`

### /health (GET)

- **Description:** Health check endpoint. Returns backend status.
- **Response:** `{ "status": "healthy", "message": "..." }`

---

## Extension Documentation

The Findex Sidebar Extension brings AI-powered search and Q&A to your browser. Here’s an overview of its features and setup:

### Features

- **Sidebar UI:** AI chat and search interface accessible from any page
- **Fixed Find Tool:** Powerful DOM search (Ctrl+Shift+F)
- **Page Search Tool:** Enhanced in-page search (Ctrl+F)
- **Comprehensive Search:** Search through text and HTML attributes
- **Navigation:** Keyboard and button navigation between matches
- **Themes:** Multiple UI themes (XP, macOS, Neobrutal, Nintendo, etc.)
- **Responsive:** Works on desktop and mobile

### Architecture

- **Manifest V3:** Modern browser extension architecture
- **Content Scripts:** Inject search tools and sidebar into every page
- **Background Script:** Manages keyboard shortcuts and extension events
- **Side Panel:** Sidebar UI for chat and Q&A (sidebar/sidebar.html)
- **Options UI:** Configurable settings (options/options.html)

### Installation

1. Go to `chrome://extensions/` (or Firefox Add-ons)
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension` folder
5. The extension will be available on all webpages

### Usage

- **Open Sidebar:** Click the extension icon or use the side panel
- **Fixed Find Tool:** Press `Ctrl+Shift+F` or click the floating 🔍 button
- **Page Search Tool:** Press `Ctrl+F` to activate enhanced in-page search
- **Search:** Type your query, navigate matches, and use options for case/whole word/HTML search
- **AI Q&A:** Use the sidebar to ask questions about the current page or YouTube video

### Manifest & Permissions

- **Permissions:** `sidePanel`, `storage`, `activeTab`
- **Content Scripts:** Injects `page-search.js` and `fixed-find-injector.js` on all pages
- **Web Accessible Resources:** `fixed-find-tool.js` for DOM search
- **Background:** `background.js` as service worker
- **Commands:**
  - `Ctrl+Shift+F` (toggle fixed find tool)
  - `Ctrl+F` (toggle page search tool)

### Sidebar UI

- **sidebar/sidebar.html:** The main chat and Q&A interface, styled with multiple themes
- **Features:**
  - Chat bubbles for user/assistant
  - Theme switching (XP, macOS, Neobrutal, etc.)
  - Responsive and accessible design

### Customization

- **CSS:** Modify `fixed-find-tool.js` or sidebar styles for custom look
- **Shortcuts:** Change in `manifest.json`
- **Options:** Configure via the options page

### Troubleshooting

- If the tool does not appear, refresh the page or check extension status
- For keyboard shortcut issues, check for conflicts in browser settings
- Some sites may block script injection (limitations apply)

---

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
   - Place your LLM or API keys as required (see backend/app/core/config.py for details).

### Frontend (Landing Page)

1. **Install dependencies:**
   ```bash
   cd landing_page
   npm install
   # or yarn install, pnpm install, or bun install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   # or yarn dev, pnpm dev, or bun dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

### Extension (Chrome/Firefox)

> **Note:** The extension directory is currently a placeholder. Extension build and installation instructions will be provided in a future release.

---

## Usage Guide

- **Trigger the AI Sidebar:** Press your configured shortcut (default: Ctrl+Shift+F) to open the sidebar on any page.
- **Ask Questions:**
  - On web pages: Ask about the content, request summaries, or search for facts semantically.
  - On YouTube: Click the chat icon overlay to query video transcripts and context.
  - Use example queries from the UI for inspiration.
- **Configure Models & Keys:** Use the sidebar settings to select your preferred LLM and enter API keys (BYOK supported).
- **Switch Themes:** Choose your favorite theme for a personalized experience.

---

## Customization & Theming

FindexAI supports a variety of themes, including:

- MacOS Classic
- Ocean Dark/Light
- Windows XP
- Neobrutal
- (and more)

You can select your preferred theme from the sidebar settings. Additional themes and customization options are planned.

---

## Contribution Guidelines

We welcome contributions! To get started:

1. Fork the repository and clone it locally.
2. Set up the backend and frontend as described above.
3. Create a new branch for your feature or bugfix.
4. Submit a pull request with a clear description of your changes.

Please see the [CONTRIBUTING.md](CONTRIBUTING.md) (to be added) for more details.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Credits

- Built with FastAPI, React, LangChain, FAISS, and more.
- Inspired by the need for smarter, faster, and more contextual search in the browser.

---

## Roadmap

- [x] LangChain setup, SearchXNG, YT & HTML agents
- [x] Modular FastAPI backend
- [x] React-based extension UI
- [ ] FAISS vector DB integration
- [ ] ReAct agent support
- [ ] Chat history & SQLite persistence
- [ ] Model selector & configuration UI
- [ ] Extension build & distribution scripts
- [ ] More themes & customization

Stay tuned for updates and new features!
