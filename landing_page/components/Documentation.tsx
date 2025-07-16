"use client";

import {
	Github,
	Download,
	Chrome,
	Code,
	Globe,
	CheckCircle,
	Settings,
	Menu,
	X,
} from "lucide-react";
import { useState } from "react";

const Documentation = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const sections = [
		{ id: "overview", title: "Overview" },
		{ id: "quick-start", title: "Quick Start" },
		{ id: "features", title: "Key Features" },
		{ id: "docker", title: "Docker Self-Hosting" },
		{ id: "architecture", title: "Architecture" },
		{ id: "api", title: "API Reference" },
		{ id: "use-cases", title: "Use Cases" },
		{ id: "installation", title: "Installation Guide" },
		{ id: "roadmap", title: "Roadmap" },
		{ id: "github", title: "GitHub Repository" },
	];

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
		setSidebarOpen(false);
	};
	return (
		<div
			className="min-h-screen text-white overflow-hidden py-16"
			style={{
				background:
					"radial-gradient(ellipse 80% 60% at 60% 20%, var(--accent-ocean) 0%, transparent 60%)," +
					"radial-gradient(ellipse 60% 40% at 20% 80%, var(--accent-teal) 0%, transparent 70%)," +
					"linear-gradient(120deg, #0a0a0a 60%, #10151a 100%)",
			}}
		>
			{/* Overlay for extra darkness and softness */}
			<div
				className="absolute inset-0"
				style={{ background: "rgba(10,10,20,0.85)" }}
			></div>
			{/* Background Pattern */}
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
				}}
			></div>

			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Mobile sidebar toggle */}
				<button
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className="fixed top-4 left-4 z-50 lg:hidden bg-gray-800 text-white p-2 rounded-lg shadow-lg"
				>
					{sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>

				{/* Sidebar */}
				<div
					className={`fixed top-0 left-0 h-full w-64 bg-gray-900/95 backdrop-blur-sm z-40 transition-transform duration-300 ${
						sidebarOpen ? "translate-x-0" : "-translate-x-full"
					} lg:translate-x-0 lg:sticky lg:top-4 lg:h-fit lg:max-h-screen lg:overflow-y-auto lg:bg-gray-800/30 lg:rounded-xl lg:p-4`}
				>
					<div className="p-4 lg:p-0">
						<h3 className="text-white font-semibold mb-4 lg:text-lg">
							Documentation
						</h3>
						<nav className="space-y-2">
							{sections.map((section) => (
								<button
									key={section.id}
									onClick={() => scrollToSection(section.id)}
									className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors text-sm"
								>
									{section.title}
								</button>
							))}
						</nav>
					</div>
				</div>

				{/* Overlay for mobile */}
				{sidebarOpen && (
					<div
						className="fixed inset-0 bg-black/50 z-30 lg:hidden"
						onClick={() => setSidebarOpen(false)}
					/>
				)}

				{/* Main content */}
				<div className="lg:ml-72">
				{/* Header */}
				<div className="text-center mb-16">
					<h1
						className="text-4xl font-bold mb-4"
						style={{
							background: "var(--accent-gradient)",
							WebkitBackgroundClip: "text",
							backgroundClip: "text",
							color: "transparent",
							WebkitTextFillColor: "transparent",
						}}
					>
						FindexAI Documentation
					</h1>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Complete guide to installing, configuring, and using FindexAI - the
						AI-powered browser extension for intelligent search and discovery.
					</p>
				</div>

				{/* Quick Start Section */}
				<section
					id="quick-start"
					className="rounded-xl p-8 mb-12"
					style={{
						background: "rgba(20, 30, 40, 0.35)",
						border: "1px solid rgba(255,255,255,0.18)",
						borderRadius: "1rem",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
					}}
				>
					<h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								1. Install Extension
							</h3>
							<p className="text-gray-300 mb-4">
								Choose your browser and follow the installation guide.
							</p>
							<div className="flex gap-3">
								<a
									href="/chrome"
									className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-white"
									style={{ background: "var(--accent-ocean)" }}
								>
									<Chrome className="w-4 h-4" />
									Chrome
								</a>
								<a
									href="/firefox"
									className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-white"
									style={{ background: "var(--accent-orange)" }}
								>
									<Download className="w-4 h-4" />
									Firefox
								</a>
							</div>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								2. Self-Host Backend
							</h3>
							<p className="text-gray-300 mb-4">
								Clone the repository and start the backend service with Docker.
							</p>
							<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
								<div>git clone https://github.com/tashifkhan/Findex.git</div>
								<div>cd Findex/backend && cp .env.example .env</div>
								<div>docker-compose up -d</div>
							</div>
						</div>
					</div>
				</section>

				{/* Overview Section */}
				<section
					id="overview"
					className="rounded-xl p-8 mb-12"
					style={{
						background: "rgba(20, 30, 40, 0.35)",
						border: "1px solid rgba(255,255,255,0.18)",
						borderRadius: "1rem",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
					}}
				>
					<h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
					<p className="text-gray-300 mb-6">
						FindexAI transforms the traditional &quot;Ctrl+F&quot; search into a
						semantic, multi-agent, and vector-based discovery engine. Whether
						you&apos;re searching through long articles, YouTube videos, or live
						web content, FindexAI leverages advanced language models, vector
						search, and a modular architecture to help you find information
						faster and more intelligently.
					</p>

					<div className="grid md:grid-cols-3 gap-6 mt-8">
						<div className="text-center">
							<div
								className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
								style={{ background: "var(--accent-ocean)" }}
							>
								<Globe className="w-8 h-8 text-white" />
							</div>
							<h3 className="font-semibold text-white mb-2">
								AI-Powered Search
							</h3>
							<p className="text-gray-300">
								Semantic search across web pages, YouTube videos, and documents
							</p>
						</div>
						<div className="text-center">
							<div
								className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
								style={{ background: "var(--accent-teal)" }}
							>
								<Chrome className="w-8 h-8 text-white" />
							</div>
							<h3 className="font-semibold text-white mb-2">
								Browser Extension
							</h3>
							<p className="text-gray-300">
								Works in Chrome and Firefox with AI chat sidebar
							</p>
						</div>
						<div className="text-center">
							<div
								className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
								style={{ background: "var(--accent-orange)" }}
							>
								<Code className="w-8 h-8 text-white" />
							</div>
							<h3 className="font-semibold text-white mb-2">
								Multi-Agent Architecture
							</h3>
							<p className="text-gray-300">
								Web search, YouTube, and HTML page agents
							</p>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section
					id="features"
					className="rounded-xl p-8 mb-12"
					style={{
						background: "rgba(20, 30, 40, 0.35)",
						border: "1px solid rgba(255,255,255,0.18)",
						borderRadius: "1rem",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
					}}
				>
					<h2 className="text-3xl font-bold text-white mb-6">Key Features</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								AI Chat Sidebar
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>
									• Instantly access AI-powered chat with keyboard shortcuts
								</li>
								<li>• Ask questions about current page content</li>
								<li>• YouTube video transcript analysis</li>
								<li>• Real-time web search integration</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								Multi-Agent Architecture
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>• Web Search Agent (SearchXNG) for real-time answers</li>
								<li>• YouTube Agent for video transcript analysis</li>
								<li>• HTML Page Agent for on-page content conversion</li>
								<li>• Vector similarity search with FAISS</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								Browser Integration
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>• Chrome and Firefox support</li>
								<li>• YouTube UI injection with chat overlays</li>
								<li>• Enhanced find-in-page functionality</li>
								<li>• Multiple theme support</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								Model Agnostic
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>• Support for OpenAI, Anthropic, local LLMs</li>
								<li>• Bring Your Own Keys (BYOK)</li>
								<li>• Configurable model selection</li>
								<li>• Secure API key management</li>
							</ul>
						</div>
					</div>
				</section>

				{/* Docker Self-Hosting Section */}
				<section
					id="docker"
					className="rounded-xl p-8 mb-12"
					style={{
						background: "rgba(20, 30, 40, 0.35)",
						border: "1px solid rgba(255,255,255,0.18)",
						borderRadius: "1rem",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
					}}
				>
					<h2 className="text-3xl font-bold text-white mb-6">
						Self-Hosting with Docker
					</h2>

					<div className="grid md:grid-cols-2 gap-8 mb-8">
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								Prerequisites
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>• Docker Engine installed on your system</li>
								<li>• Docker Compose installed on your system</li>
								<li>
									• A <code className="text-blue-400">.env</code> file with
									required environment variables
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								Quick Setup
							</h3>
							<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
								<div>cp backend/.env.example backend/.env</div>
								<div>nano backend/.env # Add your API keys</div>
								<div>docker-compose up -d</div>
							</div>
						</div>
					</div>

					<div className="mb-8">
						<h3 className="text-xl font-semibold text-white mb-4">
							Docker Commands
						</h3>
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h4 className="text-lg font-medium text-white mb-3">
									Basic Operations
								</h4>
								<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-2">
									<div># Start services</div>
									<div>docker-compose up -d</div>
									<div></div>
									<div># View logs</div>
									<div>docker-compose logs -f findex-backend</div>
									<div></div>
									<div># Stop services</div>
									<div>docker-compose down</div>
								</div>
							</div>
							<div>
								<h4 className="text-lg font-medium text-white mb-3">
									Development
								</h4>
								<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-2">
									<div># Rebuild image</div>
									<div>docker-compose build findex-backend</div>
									<div></div>
									<div># Run with rebuild</div>
									<div>docker-compose up --build -d</div>
									<div></div>
									<div># No cache rebuild</div>
									<div>docker-compose build --no-cache</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mb-8">
						<h3 className="text-xl font-semibold text-white mb-4">
							API Endpoints
						</h3>
						<p className="text-gray-300 mb-4">
							Once the backend is running, you can access the API at{" "}
							<code className="text-blue-400">http://localhost:5454</code>
						</p>
						<div className="grid md:grid-cols-3 gap-4">
							<div className="bg-gray-900 p-4 rounded-lg">
								<h4 className="text-white font-medium mb-2">Health Check</h4>
								<code className="text-green-400 text-sm">GET /health</code>
							</div>
							<div className="bg-gray-900 p-4 rounded-lg">
								<h4 className="text-white font-medium mb-2">Video Info</h4>
								<code className="text-green-400 text-sm">POST /video-info</code>
							</div>
							<div className="bg-gray-900 p-4 rounded-lg">
								<h4 className="text-white font-medium mb-2">Ask Question</h4>
								<code className="text-green-400 text-sm">POST /ask</code>
							</div>
						</div>
					</div>

					<div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
						<h4 className="text-yellow-400 font-semibold mb-2">
							Environment Variables
						</h4>
						<p className="text-gray-300">
							Make sure to set{" "}
							<code className="text-blue-400">GOOGLE_API_KEY</code> and other
							required environment variables in your{" "}
							<code className="text-blue-400">.env</code> file. The{" "}
							<code className="text-blue-400">.env</code> file contains
							sensitive information and should not be committed to version
							control.
						</p>
					</div>
				</section>

				{/* Architecture Section */}
				<section
					id="architecture"
					className="rounded-xl p-8 mb-12"
					style={{
						background: "rgba(20, 30, 40, 0.35)",
						border: "1px solid rgba(255,255,255,0.18)",
						borderRadius: "1rem",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
					}}
				>
					<h2 className="text-3xl font-bold text-white mb-6">Architecture</h2>

					<div className="mb-8">
						<div className="bg-gray-900 p-6 rounded-lg font-mono text-sm">
							<div className="text-blue-400 mb-4">
								System Architecture Flow:
							</div>
							<div className="space-y-2 text-gray-300">
								<div>
									Browser Extension (React) → API Calls → Backend API (FastAPI)
								</div>
								<div>
									Backend → Agents → [Web Search Agent | YouTube Agent | HTML
									Page Agent]
								</div>
								<div>Backend → Vector Search → FAISS Vector DB</div>
								<div>
									Backend → Model Agnostic → OpenAI/Anthropic/Local LLMs
								</div>
								<div>Backend → (Planned) → SQLite DB</div>
							</div>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								Backend Components
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>
									• <strong>FastAPI:</strong> Orchestrates agentic workflows and
									vector DB lookups
								</li>
								<li>
									• <strong>Modular Agents:</strong> Web search, YouTube, and
									HTML page processing
								</li>
								<li>
									• <strong>LLM Integration:</strong> Google Gemini, OpenAI,
									Anthropic via LangChain
								</li>
								<li>
									• <strong>Vector Search:</strong> FAISS for lightning-fast
									retrieval
								</li>
								<li>
									• <strong>Configuration:</strong> Environment variables and
									API key management
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								Frontend Components
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>
									• <strong>Extension:</strong> Chrome/Firefox support with
									manifest V3
								</li>
								<li>
									• <strong>Content Scripts:</strong> Inject sidebar UI and
									search tools
								</li>
								<li>
									• <strong>Background Script:</strong> Manages shortcuts and
									extension events
								</li>
								<li>
									• <strong>Side Panel:</strong> AI chat and Q&A interface
								</li>
								<li>
									• <strong>Theme Engine:</strong> Multiple UI themes and
									customization
								</li>
							</ul>
						</div>
					</div>
				</section>

				{/* API Documentation Section */}
				<section
					id="api"
					className="rounded-xl p-8 mb-12"
					style={{
						background: "rgba(20, 30, 40, 0.35)",
						border: "1px solid rgba(255,255,255,0.18)",
						borderRadius: "1rem",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
					}}
				>
					<h2 className="text-3xl font-bold text-white mb-6">API Reference</h2>

					<div className="mb-8">
						<p className="text-gray-300 mb-4">
							Base URL:{" "}
							<code className="text-blue-400">http://localhost:5454</code>
						</p>
						<p className="text-gray-300 mb-4">
							All API endpoints accept JSON payloads and return JSON responses.
							The API uses standard HTTP status codes for responses.
						</p>
						<div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
							<p className="text-blue-300 text-sm">
								<strong>Note:</strong> Interactive API documentation is
								available at{" "}
								<code className="text-blue-400">
									http://localhost:5454/docs
								</code>{" "}
								when the backend is running.
							</p>
						</div>
					</div>

					{/* Health Check Endpoint */}
					<div className="mb-8">
						<h3 className="text-2xl font-semibold text-white mb-4">
							Health Check
						</h3>
						<div className="bg-gray-900 rounded-lg p-4 mb-4">
							<div className="flex items-center gap-3 mb-2">
								<span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">
									GET
								</span>
								<code className="text-blue-400 text-lg">/health</code>
							</div>
							<p className="text-gray-300 text-sm">
								Returns the health status of the backend service.
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<h4 className="text-lg font-medium text-white mb-2">Request</h4>
								<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
									<div className="text-blue-400 mb-1">GET /health</div>
									<div className="text-gray-400">No body required</div>
								</div>
							</div>
							<div>
								<h4 className="text-lg font-medium text-white mb-2">
									Response
								</h4>
								<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
									<div>{`{`}</div>
									<div>
										&nbsp;&nbsp;&quot;status&quot;: &quot;healthy&quot;,
									</div>
									<div>
										&nbsp;&nbsp;&quot;message&quot;: &quot;FindexAI backend is
										running&quot;
									</div>
									<div>{`}`}</div>
								</div>
							</div>
						</div>
					</div>

					{/* Video Info Endpoint */}
					<div className="mb-8">
						<h3 className="text-2xl font-semibold text-white mb-4">
							Video Information
						</h3>
						<div className="bg-gray-900 rounded-lg p-4 mb-4">
							<div className="flex items-center gap-3 mb-2">
								<span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold">
									POST
								</span>
								<code className="text-blue-400 text-lg">/video-info</code>
							</div>
							<p className="text-gray-300 text-sm">
								Retrieves metadata and information for a YouTube video.
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<h4 className="text-lg font-medium text-white mb-2">Request</h4>
								<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
									<div className="text-blue-400 mb-1">POST /video-info</div>
									<div>{`{`}</div>
									<div>
										&nbsp;&nbsp;&quot;url&quot;:
										&quot;https://youtube.com/watch?v=dQw4w9WgXcQ&quot;
									</div>
									<div>{`}`}</div>
								</div>
							</div>
							<div>
								<h4 className="text-lg font-medium text-white mb-2">
									Response
								</h4>
								<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
									<div>{`{`}</div>
									<div>
										&nbsp;&nbsp;&quot;title&quot;: &quot;Video Title&quot;,
									</div>
									<div>
										&nbsp;&nbsp;&quot;description&quot;: &quot;Video
										description...&quot;,
									</div>
									<div>
										&nbsp;&nbsp;&quot;uploader&quot;: &quot;Channel Name&quot;,
									</div>
									<div>&nbsp;&nbsp;&quot;duration&quot;: 180,</div>
									<div>&nbsp;&nbsp;&quot;view_count&quot;: 1000000,</div>
									<div>
										&nbsp;&nbsp;&quot;tags&quot;: [&quot;tag1&quot;,
										&quot;tag2&quot;]
									</div>
									<div>{`}`}</div>
								</div>
							</div>
						</div>
					</div>

					{/* Subtitles Endpoint */}
					<div className="mb-8">
						<h3 className="text-2xl font-semibold text-white mb-4">
							Video Subtitles
						</h3>
						<div className="bg-gray-900 rounded-lg p-4 mb-4">
							<div className="flex items-center gap-3 mb-2">
								<span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold">
									POST
								</span>
								<code className="text-blue-400 text-lg">/subs</code>
							</div>
							<p className="text-gray-300 text-sm">
								Retrieves and cleans subtitles for a YouTube video.
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<h4 className="text-lg font-medium text-white mb-2">Request</h4>
								<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
									<div className="text-blue-400 mb-1">POST /subs</div>
									<div>{`{`}</div>
									<div>
										&nbsp;&nbsp;&quot;url&quot;:
										&quot;https://youtube.com/watch?v=dQw4w9WgXcQ&quot;,
									</div>
									<div>&nbsp;&nbsp;&quot;lang&quot;: &quot;en&quot;</div>
									<div>{`}`}</div>
								</div>
							</div>
							<div>
								<h4 className="text-lg font-medium text-white mb-2">
									Response
								</h4>
								<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
									<div>{`{`}</div>
									<div>
										&nbsp;&nbsp;&quot;subtitles&quot;: &quot;Complete subtitle
										text...&quot;
									</div>
									<div>{`}`}</div>
								</div>
							</div>
						</div>
					</div>

					{/* Ask Endpoint */}
					<div className="mb-8">
						<h3 className="text-2xl font-semibold text-white mb-4">
							Ask Question (YouTube)
						</h3>
						<div className="bg-gray-900 rounded-lg p-4 mb-4">
							<div className="flex items-center gap-3 mb-2">
								<span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold">
									POST
								</span>
								<code className="text-blue-400 text-lg">/ask</code>
							</div>
							<p className="text-gray-300 text-sm">
								Ask a question about a YouTube video using AI analysis of the
								video content and transcript.
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<h4 className="text-lg font-medium text-white mb-2">Request</h4>
								<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
									<div className="text-blue-400 mb-1">POST /ask</div>
									<div>{`{`}</div>
									<div>
										&nbsp;&nbsp;&quot;url&quot;:
										&quot;https://youtube.com/watch?v=dQw4w9WgXcQ&quot;,
									</div>
									<div>
										&nbsp;&nbsp;&quot;question&quot;: &quot;What is the main
										topic discussed?&quot;
									</div>
									<div>{`}`}</div>
								</div>
							</div>
							<div>
								<h4 className="text-lg font-medium text-white mb-2">
									Response
								</h4>
								<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
									<div>{`{`}</div>
									<div>
										&nbsp;&nbsp;&quot;answer&quot;: &quot;The main topic
										is...&quot;,
									</div>
									<div>
										&nbsp;&nbsp;&quot;video_title&quot;: &quot;Sample Video
										Title&quot;,
									</div>
									<div>
										&nbsp;&nbsp;&quot;video_channel&quot;: &quot;Channel
										Name&quot;,
									</div>
									<div>&nbsp;&nbsp;&quot;video_duration&quot;: 180</div>
									<div>{`}`}</div>
								</div>
							</div>
						</div>
					</div>

					{/* Website Endpoint */}
					<div className="mb-8">
						<h3 className="text-2xl font-semibold text-white mb-4">
							Website Analysis
						</h3>
						<div className="bg-gray-900 rounded-lg p-4 mb-4">
							<div className="flex items-center gap-3 mb-2">
								<span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold">
									POST
								</span>
								<code className="text-blue-400 text-lg">/website</code>
							</div>
							<p className="text-gray-300 text-sm">
								Ask a question about the content of a web page. The backend
								fetches, converts to Markdown, and analyzes the page.
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<h4 className="text-lg font-medium text-white mb-2">Request</h4>
								<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
									<div className="text-blue-400 mb-1">POST /website</div>
									<div>{`{`}</div>
									<div>
										&nbsp;&nbsp;&quot;url&quot;:
										&quot;https://example.com/article&quot;,
									</div>
									<div>
										&nbsp;&nbsp;&quot;question&quot;: &quot;What are the key
										points mentioned?&quot;
									</div>
									<div>{`}`}</div>
								</div>
							</div>
							<div>
								<h4 className="text-lg font-medium text-white mb-2">
									Response
								</h4>
								<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
									<div>{`{`}</div>
									<div>
										&nbsp;&nbsp;&quot;answer&quot;: &quot;The key points
										are...&quot;,
									</div>
									<div>
										&nbsp;&nbsp;&quot;page_title&quot;: &quot;Article
										Title&quot;,
									</div>
									<div>
										&nbsp;&nbsp;&quot;page_url&quot;:
										&quot;https://example.com/article&quot;
									</div>
									<div>{`}`}</div>
								</div>
							</div>
						</div>
					</div>

					{/* Crawler Endpoint */}
					<div className="mb-8">
						<h3 className="text-2xl font-semibold text-white mb-4">
							Web Search Agent
						</h3>
						<div className="bg-gray-900 rounded-lg p-4 mb-4">
							<div className="flex items-center gap-3 mb-2">
								<span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold">
									POST
								</span>
								<code className="text-blue-400 text-lg">/crawller</code>
							</div>
							<p className="text-gray-300 text-sm">
								Ask a question using the web search agent to get real-time
								information from the internet.
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<h4 className="text-lg font-medium text-white mb-2">Request</h4>
								<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
									<div className="text-blue-400 mb-1">POST /crawller</div>
									<div>{`{`}</div>
									<div>
										&nbsp;&nbsp;&quot;question&quot;: &quot;What are the latest
										AI developments?&quot;
									</div>
									<div>{`}`}</div>
								</div>
							</div>
							<div>
								<h4 className="text-lg font-medium text-white mb-2">
									Response
								</h4>
								<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
									<div>{`{`}</div>
									<div>
										&nbsp;&nbsp;&quot;answer&quot;: &quot;Based on recent
										sources...&quot;,
									</div>
									<div>&nbsp;&nbsp;&quot;sources&quot;: [</div>
									<div>
										&nbsp;&nbsp;&nbsp;&nbsp;&quot;https://example.com/news1&quot;,
									</div>
									<div>
										&nbsp;&nbsp;&nbsp;&nbsp;&quot;https://example.com/news2&quot;
									</div>
									<div>&nbsp;&nbsp;]</div>
									<div>{`}`}</div>
								</div>
							</div>
						</div>
					</div>

					{/* Error Responses */}
					<div className="mb-8">
						<h3 className="text-2xl font-semibold text-white mb-4">
							Error Responses
						</h3>
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<h4 className="text-lg font-medium text-white mb-2">
									400 Bad Request
								</h4>
								<div className="bg-gray-900 text-red-400 p-3 rounded-lg font-mono text-sm">
									<div>{`{`}</div>
									<div>
										&nbsp;&nbsp;&quot;detail&quot;: &quot;Invalid URL
										format&quot;
									</div>
									<div>{`}`}</div>
								</div>
							</div>
							<div>
								<h4 className="text-lg font-medium text-white mb-2">
									500 Internal Server Error
								</h4>
								<div className="bg-gray-900 text-red-400 p-3 rounded-lg font-mono text-sm">
									<div>{`{`}</div>
									<div>
										&nbsp;&nbsp;&quot;detail&quot;: &quot;Internal server error
										occurred&quot;
									</div>
									<div>{`}`}</div>
								</div>
							</div>
						</div>
					</div>

					{/* API Testing */}
					<div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
						<h4 className="text-green-400 font-semibold mb-3">
							Testing the API
						</h4>
						<div className="space-y-2 text-gray-300 text-sm">
							<p>
								• Use the interactive documentation at{" "}
								<code className="text-blue-400">
									http://localhost:5454/docs
								</code>
							</p>
							<p>
								• Test endpoints with curl, Postman, or your preferred HTTP
								client
							</p>
							<p>• All endpoints require a running backend service</p>
							<p>
								• Make sure to set proper Content-Type headers:{" "}
								<code className="text-blue-400">application/json</code>
							</p>
						</div>
					</div>
				</section>

				{/* Use Cases Section */}
				<section
					id="use-cases"
					className="rounded-xl p-8 mb-12"
					style={{
						background: "rgba(20, 30, 40, 0.35)",
						border: "1px solid rgba(255,255,255,0.18)",
						borderRadius: "1rem",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
					}}
				>
					<h2 className="text-3xl font-bold text-white mb-6">Use Cases</h2>

					<div className="grid md:grid-cols-2 gap-8">
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								For Students & Researchers
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>• Quickly find specific information in research papers</li>
								<li>• Search through lecture videos and academic content</li>
								<li>• Extract key insights from long-form content</li>
								<li>• Cross-reference information across multiple sources</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								For Developers
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>• Navigate complex documentation faster</li>
								<li>• Find code examples and API references</li>
								<li>• Understand frameworks and libraries semantically</li>
								<li>• Search through tutorial videos and guides</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								For Knowledge Workers
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>• Analyze content and extract insights</li>
								<li>• Compare information across multiple sources</li>
								<li>• Get AI assistance for content understanding</li>
								<li>• Streamline research and information gathering</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								For Content Creators
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>• Gather information for articles and videos</li>
								<li>• Verify facts and find supporting content</li>
								<li>• Research topics efficiently</li>
								<li>• Find inspiration from existing content</li>
							</ul>
						</div>
					</div>
				</section>

				{/* Installation Guide Section */}
				<section
					id="installation"
					className="rounded-xl p-8 mb-12"
					style={{
						background: "rgba(20, 30, 40, 0.35)",
						border: "1px solid rgba(255,255,255,0.18)",
						borderRadius: "1rem",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
					}}
				>
					<h2 className="text-3xl font-bold text-white mb-6">
						Installation Guide
					</h2>

					<div className="grid md:grid-cols-2 gap-8">
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								Backend Setup
							</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-lg font-medium text-white mb-2">
										1. Install Dependencies
									</h4>
									<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
										<div>cd backend</div>
										<div>pip install -r requirements.txt</div>
									</div>
								</div>
								<div>
									<h4 className="text-lg font-medium text-white mb-2">
										2. Run Backend Server
									</h4>
									<div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
										<div>uvicorn app.main:app --reload</div>
									</div>
								</div>
								<div>
									<h4 className="text-lg font-medium text-white mb-2">
										3. Configure API Keys
									</h4>
									<p className="text-gray-300 text-sm">
										Set your LLM API keys in the backend configuration as
										required.
									</p>
								</div>
							</div>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								Extension Setup
							</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-lg font-medium text-white mb-2">
										1. Chrome Installation
									</h4>
									<ul className="text-gray-300 text-sm space-y-1">
										<li>• Go to chrome://extensions/</li>
										<li>• Enable &quot;Developer mode&quot;</li>
										<li>• Click &quot;Load unpacked&quot;</li>
										<li>• Select the extension folder</li>
									</ul>
								</div>
								<div>
									<h4 className="text-lg font-medium text-white mb-2">
										2. Firefox Installation
									</h4>
									<ul className="text-gray-300 text-sm space-y-1">
										<li>• Go to about:debugging#/runtime/this-firefox</li>
										<li>• Click &quot;Load Temporary Add-on&quot;</li>
										<li>• Select manifest.json from extension folder</li>
									</ul>
								</div>
								<div>
									<h4 className="text-lg font-medium text-white mb-2">
										3. Usage
									</h4>
									<ul className="text-gray-300 text-sm space-y-1">
										<li>• Press Ctrl+Shift+F to open sidebar</li>
										<li>• Configure themes and settings</li>
										<li>• Start asking questions about web content</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Roadmap Section */}
				<section
					id="roadmap"
					className="rounded-xl p-8 mb-12"
					style={{
						background: "rgba(20, 30, 40, 0.35)",
						border: "1px solid rgba(255,255,255,0.18)",
						borderRadius: "1rem",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
					}}
				>
					<h2 className="text-3xl font-bold text-white mb-6">Roadmap</h2>

					<div className="grid md:grid-cols-2 gap-8">
						<div>
							<h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
								<CheckCircle className="w-5 h-5 text-green-400" />
								Completed
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>• LangChain setup with SearchXNG integration</li>
								<li>• YouTube & HTML page agents</li>
								<li>• Modular FastAPI backend architecture</li>
								<li>• React-based extension UI</li>
								<li>• Multi-theme support</li>
								<li>• Chrome and Firefox compatibility</li>
								<li>• Chrome vector DB integration</li>
								<li>• Sophisticated Theming Engine</li>
								<li>• Chat history</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
								<Settings className="w-5 h-5 text-blue-400 animate-spin" />
								In Progress
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>• ReAct agent support</li>
								<li>{"• BYOKs (Bring your own keys)"}</li>
								<li>• Model selector & configuration UI</li>
								<li>• Extension build & distribution scripts</li>
							</ul>
						</div>
					</div>
				</section>

				{/* GitHub Repository Section */}
				<section
					id="github"
					className="rounded-xl p-8 mb-12"
					style={{
						background: "rgba(20, 30, 40, 0.35)",
						border: "1px solid rgba(255,255,255,0.18)",
						borderRadius: "1rem",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
					}}
				>
					<h2 className="text-3xl font-bold text-white mb-6">
						GitHub Repository
					</h2>

					<div
						className="rounded-lg p-6 text-white mb-8"
						style={{ background: "var(--accent-gradient)" }}
					>
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-xl font-bold mb-2 flex items-center gap-2">
									<Github className="w-6 h-6" />
									tashifkhan/Findex
								</h3>
								<p className="text-blue-100">
									AI-powered browser extension for semantic search and discovery
								</p>
							</div>
							<div className="text-right">
								<a
									href="https://github.com/tashifkhan/Findex"
									target="_blank"
									rel="noopener noreferrer"
									className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
								>
									<Github className="w-4 h-4" />
									View Repository
								</a>
							</div>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								Repository Structure
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>
									• <code className="text-blue-400">/backend</code> - Python
									FastAPI server with agents
								</li>
								<li>
									• <code className="text-blue-400">/extension</code> - Browser
									extension for Chrome/Firefox
								</li>
								<li>
									• <code className="text-blue-400">/landing_page</code> -
									Next.js landing page and documentation
								</li>
								<li>
									• <code className="text-blue-400">docker-compose.yml</code> -
									Docker configuration for self-hosting
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-white mb-4">
								Contributing
							</h3>
							<ul className="space-y-2 text-gray-300">
								<li>• Fork the repository and create a feature branch</li>
								<li>• Submit pull requests with clear descriptions</li>
								<li>• Follow the coding standards and guidelines</li>
								<li>• Report issues and suggest improvements</li>
							</ul>
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section
					className="rounded-xl p-8 text-center"
					style={{ background: "var(--accent-gradient)" }}
				>
					<h2 className="text-3xl font-bold mb-4 text-white">
						Ready to Get Started?
					</h2>
					<p className="text-xl mb-6 text-blue-100">
						Transform your browsing experience with AI-powered search and
						discovery
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="https://github.com/tashifkhan/Findex"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
						>
							<Github className="w-4 h-4" />
							View on GitHub
						</a>
						<a
							href="/chrome"
							className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center gap-2"
						>
							<Chrome className="w-4 h-4" />
							Install Extension
						</a>
					</div>
				</section>
				</div>
			</div>
		</div>
	);
};

export default Documentation;
