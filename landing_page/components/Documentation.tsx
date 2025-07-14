"use client";

import { Github, BookOpen, Download, Chrome, Code, Globe } from "lucide-react";

const Documentation = () => {
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
								2. Set Up Backend
							</h3>
							<p className="text-gray-300 mb-4">
								Clone the repository and start the backend service.
							</p>
							<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
								<div>git clone https://github.com/tashifkhan/Findex.git</div>
								<div>cd Findex && docker-compose up</div>
							</div>
						</div>
					</div>
				</section>

				{/* Overview Section */}
				<section
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
						FindexAI transforms the traditional "Ctrl+F" search into a semantic,
						multi-agent, and vector-based discovery engine. Whether you're
						searching through long articles, YouTube videos, or live web
						content, FindexAI leverages advanced language models, vector search,
						and a modular architecture to help you find information faster and
						more intelligently.
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

				{/* GitHub Repository Section */}
				<section
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
									FastAPI server
								</li>
								<li>
									• <code className="text-blue-400">/extension</code> - Browser
									extension code
								</li>
								<li>
									• <code className="text-blue-400">/docs</code> - Documentation
									and guides
								</li>
								<li>
									• <code className="text-blue-400">/docker</code> - Docker
									configuration
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
								<li>• Join our Discord community for discussions</li>
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
	);
};

export default Documentation;
