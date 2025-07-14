import React from "react";

const Documentation = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						FindexAI Documentation
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Complete guide to installing, configuring, and using FindexAI - the
						AI-powered browser extension for intelligent search and discovery.
					</p>
				</div>

				{/* Table of Contents */}
				<div className="bg-white rounded-lg shadow-lg p-8 mb-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">
						Table of Contents
					</h2>
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<h3 className="font-semibold text-gray-800 mb-2">
								Getting Started
							</h3>
							<ul className="space-y-1 text-gray-600">
								<li>
									•{" "}
									<a href="#overview" className="hover:text-blue-600">
										Overview
									</a>
								</li>
								<li>
									•{" "}
									<a href="#features" className="hover:text-blue-600">
										Key Features
									</a>
								</li>
								<li>
									•{" "}
									<a href="#architecture" className="hover:text-blue-600">
										Architecture
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold text-gray-800 mb-2">Installation</h3>
							<ul className="space-y-1 text-gray-600">
								<li>
									•{" "}
									<a href="#backend-setup" className="hover:text-blue-600">
										Backend Setup
									</a>
								</li>
								<li>
									•{" "}
									<a href="#extension-setup" className="hover:text-blue-600">
										Extension Setup
									</a>
								</li>
								<li>
									•{" "}
									<a href="#docker-setup" className="hover:text-blue-600">
										Docker Setup
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Overview Section */}
				<section
					id="overview"
					className="bg-white rounded-lg shadow-lg p-8 mb-12"
				>
					<h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
					<p className="text-gray-700 mb-6">
						FindexAI transforms the traditional "Ctrl+F" search into a semantic,
						multi-agent, and vector-based discovery engine. Whether you're
						searching through long articles, YouTube videos, or live web
						content, FindexAI leverages advanced language models, vector search,
						and a modular architecture to help you find information faster and
						more intelligently.
					</p>

					<div className="grid md:grid-cols-3 gap-6 mt-8">
						<div className="text-center">
							<div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">
								AI-Powered Search
							</h3>
							<p className="text-gray-600">
								Semantic search across web pages, YouTube videos, and documents
							</p>
						</div>
						<div className="text-center">
							<div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-green-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">
								Browser Extension
							</h3>
							<p className="text-gray-600">
								Works in Chrome and Firefox with AI chat sidebar
							</p>
						</div>
						<div className="text-center">
							<div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-purple-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
									/>
								</svg>
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">
								Multi-Agent Architecture
							</h3>
							<p className="text-gray-600">
								Web search, YouTube, and HTML page agents
							</p>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section
					id="features"
					className="bg-white rounded-lg shadow-lg p-8 mb-12"
				>
					<h2 className="text-3xl font-bold text-gray-900 mb-6">
						Key Features
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								AI Chat Sidebar
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>
									• Instantly access AI-powered chat with keyboard shortcuts
								</li>
								<li>• Ask questions about current page content</li>
								<li>• YouTube video transcript analysis</li>
								<li>• Real-time web search integration</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Multi-Agent Architecture
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>• Web Search Agent (SearchXNG) for real-time answers</li>
								<li>• YouTube Agent for video transcript analysis</li>
								<li>• HTML Page Agent for on-page content conversion</li>
								<li>• Vector similarity search with FAISS</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Browser Integration
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>• Chrome and Firefox support</li>
								<li>• YouTube UI injection with chat overlays</li>
								<li>• Enhanced find-in-page functionality</li>
								<li>• Multiple theme support</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Model Agnostic
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>• Support for OpenAI, Anthropic, local LLMs</li>
								<li>• Bring Your Own Keys (BYOK)</li>
								<li>• Configurable model selection</li>
								<li>• Secure API key management</li>
							</ul>
						</div>
					</div>
				</section>

				{/* Architecture Section */}
				<section
					id="architecture"
					className="bg-white rounded-lg shadow-lg p-8 mb-12"
				>
					<h2 className="text-3xl font-bold text-gray-900 mb-6">
						Architecture
					</h2>
					<div className="bg-gray-50 rounded-lg p-6 mb-6">
						<h3 className="text-xl font-semibold text-gray-900 mb-4">
							System Overview
						</h3>
						<div className="grid md:grid-cols-3 gap-6">
							<div className="bg-white p-4 rounded-lg">
								<h4 className="font-semibold text-gray-900 mb-2">Frontend</h4>
								<ul className="text-sm text-gray-700 space-y-1">
									<li>• React-based browser extension</li>
									<li>• AI chat sidebar interface</li>
									<li>• Theme engine with multiple options</li>
									<li>• YouTube integration</li>
								</ul>
							</div>
							<div className="bg-white p-4 rounded-lg">
								<h4 className="font-semibold text-gray-900 mb-2">Backend</h4>
								<ul className="text-sm text-gray-700 space-y-1">
									<li>• FastAPI-based REST API</li>
									<li>• Modular agent architecture</li>
									<li>• Vector search with FAISS</li>
									<li>• Model-agnostic LLM integration</li>
								</ul>
							</div>
							<div className="bg-white p-4 rounded-lg">
								<h4 className="font-semibold text-gray-900 mb-2">Agents</h4>
								<ul className="text-sm text-gray-700 space-y-1">
									<li>• Web Search Agent</li>
									<li>• YouTube Transcript Agent</li>
									<li>• HTML Page Agent</li>
									<li>• Vector Search Agent</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Backend Setup Section */}
				<section
					id="backend-setup"
					className="bg-white rounded-lg shadow-lg p-8 mb-12"
				>
					<h2 className="text-3xl font-bold text-gray-900 mb-6">
						Backend Setup
					</h2>

					<div className="space-y-8">
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Prerequisites
							</h3>
							<ul className="list-disc list-inside space-y-2 text-gray-700">
								<li>Python 3.8+</li>
								<li>pip or uv package manager</li>
								<li>Google API key (for AI services)</li>
								<li>Optional: Docker and Docker Compose</li>
							</ul>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Local Installation
							</h3>
							<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
								<div className="mb-2"># Clone the repository</div>
								<div className="mb-2">
									git clone https://github.com/tashifkhan/Findex.git
								</div>
								<div className="mb-2">cd Findex</div>
								<div className="mb-2"></div>
								<div className="mb-2"># Install dependencies</div>
								<div className="mb-2">cd backend</div>
								<div className="mb-2">pip install -r requirements.txt</div>
								<div className="mb-2"></div>
								<div className="mb-2"># Set up environment variables</div>
								<div className="mb-2">cp .env.example .env</div>
								<div className="mb-2"># Edit .env with your API keys</div>
								<div className="mb-2"></div>
								<div className="mb-2"># Run the backend server</div>
								<div>uvicorn app.main:app --reload</div>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Environment Variables
							</h3>
							<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
								<div>GOOGLE_API_KEY=your_google_api_key_here</div>
								<div># Add other required environment variables</div>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								API Endpoints
							</h3>
							<div className="grid md:grid-cols-2 gap-4">
								<div className="bg-gray-50 p-4 rounded-lg">
									<h4 className="font-semibold text-gray-900 mb-2">
										Core Endpoints
									</h4>
									<ul className="text-sm text-gray-700 space-y-1">
										<li>
											•{" "}
											<code className="bg-gray-200 px-1 rounded">/health</code>{" "}
											- Health check
										</li>
										<li>
											•{" "}
											<code className="bg-gray-200 px-1 rounded">
												/video-info
											</code>{" "}
											- YouTube video metadata
										</li>
										<li>
											• <code className="bg-gray-200 px-1 rounded">/subs</code>{" "}
											- Video subtitles
										</li>
										<li>
											• <code className="bg-gray-200 px-1 rounded">/ask</code> -
											Q&A about videos
										</li>
									</ul>
								</div>
								<div className="bg-gray-50 p-4 rounded-lg">
									<h4 className="font-semibold text-gray-900 mb-2">
										Web Endpoints
									</h4>
									<ul className="text-sm text-gray-700 space-y-1">
										<li>
											•{" "}
											<code className="bg-gray-200 px-1 rounded">/website</code>{" "}
											- Web page analysis
										</li>
										<li>
											•{" "}
											<code className="bg-gray-200 px-1 rounded">
												/crawller
											</code>{" "}
											- Web search agent
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Extension Setup Section */}
				<section
					id="extension-setup"
					className="bg-white rounded-lg shadow-lg p-8 mb-12"
				>
					<h2 className="text-3xl font-bold text-gray-900 mb-6">
						Extension Setup
					</h2>

					<div className="space-y-8">
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Prerequisites
							</h3>
							<ul className="list-disc list-inside space-y-2 text-gray-700">
								<li>Chrome or Firefox browser</li>
								<li>Node.js 16+ (for development)</li>
								<li>Backend server running (see Backend Setup)</li>
							</ul>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Development Setup
							</h3>
							<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
								<div className="mb-2"># Navigate to extension directory</div>
								<div className="mb-2">cd extension</div>
								<div className="mb-2"></div>
								<div className="mb-2"># Install dependencies</div>
								<div className="mb-2">npm install</div>
								<div className="mb-2"># or bun install</div>
								<div className="mb-2"></div>
								<div className="mb-2"># Build the extension</div>
								<div className="mb-2">npm run build</div>
								<div className="mb-2"></div>
								<div className="mb-2"># For development with hot reload</div>
								<div>npm run dev</div>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Installation in Browser
							</h3>
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<h4 className="font-semibold text-gray-900 mb-3">Chrome</h4>
									<ol className="list-decimal list-inside space-y-2 text-gray-700">
										<li>
											Open Chrome and go to{" "}
											<code className="bg-gray-200 px-1 rounded">
												chrome://extensions/
											</code>
										</li>
										<li>Enable "Developer mode" (toggle in top right)</li>
										<li>Click "Load unpacked"</li>
										<li>
											Select the{" "}
											<code className="bg-gray-200 px-1 rounded">
												extension/dist
											</code>{" "}
											folder
										</li>
										<li>The extension will appear in your extensions list</li>
									</ol>
								</div>
								<div>
									<h4 className="font-semibold text-gray-900 mb-3">Firefox</h4>
									<ol className="list-decimal list-inside space-y-2 text-gray-700">
										<li>
											Open Firefox and go to{" "}
											<code className="bg-gray-200 px-1 rounded">
												about:debugging
											</code>
										</li>
										<li>Click "This Firefox" tab</li>
										<li>Click "Load Temporary Add-on"</li>
										<li>
											Select the{" "}
											<code className="bg-gray-200 px-1 rounded">
												manifest.json
											</code>{" "}
											file
										</li>
										<li>The extension will be loaded temporarily</li>
									</ol>
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Usage
							</h3>
							<div className="grid md:grid-cols-2 gap-6">
								<div className="bg-blue-50 p-4 rounded-lg">
									<h4 className="font-semibold text-blue-900 mb-2">
										Keyboard Shortcuts
									</h4>
									<ul className="text-sm text-blue-800 space-y-1">
										<li>
											•{" "}
											<kbd className="bg-blue-200 px-2 py-1 rounded">
												Ctrl+Shift+F
											</kbd>{" "}
											- Open AI sidebar
										</li>
										<li>
											•{" "}
											<kbd className="bg-blue-200 px-2 py-1 rounded">
												Ctrl+F
											</kbd>{" "}
											- Enhanced page search
										</li>
										<li>
											• <kbd className="bg-blue-200 px-2 py-1 rounded">Esc</kbd>{" "}
											- Close search tools
										</li>
									</ul>
								</div>
								<div className="bg-green-50 p-4 rounded-lg">
									<h4 className="font-semibold text-green-900 mb-2">
										Features
									</h4>
									<ul className="text-sm text-green-800 space-y-1">
										<li>• AI chat sidebar on any webpage</li>
										<li>• YouTube video analysis</li>
										<li>• Enhanced find-in-page search</li>
										<li>• Multiple theme options</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Docker Setup Section */}
				<section
					id="docker-setup"
					className="bg-white rounded-lg shadow-lg p-8 mb-12"
				>
					<h2 className="text-3xl font-bold text-gray-900 mb-6">
						Docker Setup
					</h2>

					<div className="space-y-8">
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Prerequisites
							</h3>
							<ul className="list-disc list-inside space-y-2 text-gray-700">
								<li>Docker Engine installed</li>
								<li>Docker Compose installed</li>
								<li>Git repository cloned</li>
							</ul>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Environment Setup
							</h3>
							<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
								<div className="mb-2"># Copy environment file</div>
								<div className="mb-2">cp backend/.env.example backend/.env</div>
								<div className="mb-2"></div>
								<div className="mb-2"># Edit with your API keys</div>
								<div className="mb-2">nano backend/.env</div>
								<div className="mb-2"></div>
								<div className="mb-2"># Set required variables:</div>
								<div>GOOGLE_API_KEY=your_google_api_key_here</div>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Running with Docker Compose
							</h3>
							<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
								<div className="mb-2"># Start services</div>
								<div className="mb-2">docker-compose up -d</div>
								<div className="mb-2"></div>
								<div className="mb-2"># View logs</div>
								<div className="mb-2">
									docker-compose logs -f findex-backend
								</div>
								<div className="mb-2"></div>
								<div className="mb-2"># Stop services</div>
								<div className="mb-2">docker-compose down</div>
								<div className="mb-2"></div>
								<div className="mb-2"># Rebuild and restart</div>
								<div>docker-compose up --build -d</div>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Manual Docker Build
							</h3>
							<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
								<div className="mb-2"># Build the image</div>
								<div className="mb-2">cd backend</div>
								<div className="mb-2">docker build -t findex-backend .</div>
								<div className="mb-2"></div>
								<div className="mb-2"># Run the container</div>
								<div className="mb-2">docker run -d \</div>
								<div className="mb-2"> --name findex-backend \</div>
								<div className="mb-2"> -p 5454:5454 \</div>
								<div className="mb-2"> --env-file .env \</div>
								<div> findex-backend</div>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								API Access
							</h3>
							<div className="bg-gray-50 p-4 rounded-lg">
								<p className="text-gray-700 mb-2">
									Once running, access the API at:
								</p>
								<ul className="text-sm text-gray-700 space-y-1">
									<li>
										• Base URL:{" "}
										<code className="bg-gray-200 px-1 rounded">
											http://localhost:5454
										</code>
									</li>
									<li>
										• Health check:{" "}
										<code className="bg-gray-200 px-1 rounded">
											http://localhost:5454/health
										</code>
									</li>
									<li>
										• API docs:{" "}
										<code className="bg-gray-200 px-1 rounded">
											http://localhost:5454/docs
										</code>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* GitHub Repository Section */}
				<section className="bg-white rounded-lg shadow-lg p-8 mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-6">
						GitHub Repository
					</h2>

					<div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-2xl font-bold mb-2">FindexAI</h3>
								<p className="text-blue-100 mb-4">
									AI-powered browser extension for intelligent search and
									discovery
								</p>
								<a
									href="https://github.com/tashifkhan/Findex"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
								>
									<svg
										className="w-5 h-5 mr-2"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
									</svg>
									View on GitHub
								</a>
							</div>
							<div className="text-right">
								<div className="text-2xl font-bold">⭐</div>
								<div className="text-sm text-blue-100">Star the repo</div>
							</div>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-6 mt-8">
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Repository Structure
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>
									• <code className="bg-gray-200 px-1 rounded">backend/</code> -
									FastAPI backend server
								</li>
								<li>
									• <code className="bg-gray-200 px-1 rounded">extension/</code>{" "}
									- Browser extension
								</li>
								<li>
									•{" "}
									<code className="bg-gray-200 px-1 rounded">
										landing_page/
									</code>{" "}
									- Documentation website
								</li>
								<li>
									• <code className="bg-gray-200 px-1 rounded">docs.md</code> -
									Comprehensive documentation
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Contributing
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>• Fork the repository</li>
								<li>• Create a feature branch</li>
								<li>• Make your changes</li>
								<li>• Submit a pull request</li>
							</ul>
						</div>
					</div>
				</section>

				{/* Troubleshooting Section */}
				<section className="bg-white rounded-lg shadow-lg p-8 mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-6">
						Troubleshooting
					</h2>

					<div className="space-y-6">
						<div className="border-l-4 border-yellow-400 pl-4">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Common Issues
							</h3>
							<div className="space-y-4">
								<div>
									<h4 className="font-semibold text-gray-800 mb-1">
										Backend won't start
									</h4>
									<p className="text-gray-700 text-sm">
										Check that all environment variables are set correctly in
										the .env file
									</p>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800 mb-1">
										Extension not loading
									</h4>
									<p className="text-gray-700 text-sm">
										Ensure the backend is running and accessible at the
										configured URL
									</p>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800 mb-1">
										API key errors
									</h4>
									<p className="text-gray-700 text-sm">
										Verify your Google API key has the necessary permissions
										enabled
									</p>
								</div>
							</div>
						</div>

						<div className="border-l-4 border-blue-400 pl-4">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Getting Help
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>
									• Check the{" "}
									<a
										href="https://github.com/tashifkhan/Findex/issues"
										className="text-blue-600 hover:underline"
									>
										GitHub Issues
									</a>{" "}
									page
								</li>
								<li>
									• Review the{" "}
									<a
										href="https://github.com/tashifkhan/Findex/blob/main/docs.md"
										className="text-blue-600 hover:underline"
									>
										documentation
									</a>
								</li>
								<li>• Create a new issue with detailed error information</li>
							</ul>
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
					<h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
					<p className="text-xl mb-6 text-blue-100">
						Transform your browsing experience with AI-powered search and
						discovery
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="https://github.com/tashifkhan/Findex"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
						>
							View on GitHub
						</a>
						<a
							href="#backend-setup"
							className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
						>
							Start Installation
						</a>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Documentation;
