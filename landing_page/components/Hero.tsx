"use client";

import { Chrome, Github, Download } from "lucide-react";
import { useState } from "react";

export default function Hero() {
	const [email, setEmail] = useState("");

	const handleBetaSignup = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement beta signup logic
		console.log("Beta signup:", email);
		setEmail("");
	};

	return (
		<section
			className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
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

			<div className="container mx-auto px-6 py-20 text-center relative z-10">
				<div className="max-w-4xl mx-auto">
					{/* Logo/Brand */}
					<div className="mb-8">
						<h1
							className="text-6xl md:text-7xl font-black bg-clip-text text-transparent leading-tight bg-[--accent-gradient]"
							style={{ background: "var(--accent-gradient)" }}
						>
							FindexAI
						</h1>
						<div
							className="w-24 h-1 mx-auto mt-4 rounded-full"
							style={{ background: "var(--accent-gradient)" }}
						></div>
					</div>
					{/* Hero Headline */}
					<h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-200">
						AI-powered search, multi-agent context, and real-time web results
					</h2>
					{/* Subheadline */}
					<p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-3xl mx-auto">
						Your browser’s sidebar for instant, semantic answers. No more
						endless scrolling—just ask and find.
					</p>
					{/* Key Benefits */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
						{/* Semantic Search */}
						<div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
							<div
								className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
								style={{ background: "var(--accent-ocean)" }}
							>
								<Chrome className="w-6 h-6" />
							</div>
							<h3 className="font-semibold text-lg mb-2">Semantic Search</h3>
							<p className="text-gray-300 text-sm">
								Ask, don’t just find text—search any page with AI understanding
							</p>
						</div>
						{/* YouTube Integration */}
						<div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
							<div
								className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
								style={{ background: "var(--accent-orange)" }}
							>
								<Github className="w-6 h-6" />
							</div>
							<h3 className="font-semibold text-lg mb-2">
								YouTube Integration
							</h3>
							<p className="text-gray-300 text-sm">
								Search YouTube transcripts & live web results seamlessly
							</p>
						</div>
						{/* Bring Your Own */}
						<div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
							<div
								className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
								style={{ background: "var(--accent-teal)" }}
							>
								<Download className="w-6 h-6" />
							</div>
							<h3 className="font-semibold text-lg mb-2">Bring Your Own</h3>
							<p className="text-gray-300 text-sm">
								Use your own API keys & LLMs—fully customizable and private
							</p>
						</div>
					</div>
					{/* Primary CTAs */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
						<a
							href="/chrome"
							className="group flex items-center gap-3 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
							style={{ background: "var(--accent-ocean)" }}
						>
							<Chrome className="w-6 h-6" />
							Install for Chrome
							<Download className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
						</a>
						<a
							href="/firefox"
							className="group flex items-center gap-3 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
							style={{ background: "var(--accent-orange)" }}
						>
							<Chrome className="w-6 h-6" />
							Install for Firefox
							<Download className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
						</a>
					</div>
					{/* Secondary CTA */}
					<div className="flex flex-col items-center gap-4">
						<form
							onSubmit={handleBetaSignup}
							className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
						>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email for beta updates"
								className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
								required
							/>
							<button
								type="submit"
								className="px-6 py-3 bg-gray-700 hover:bg-gray-600 border border-gray-700 rounded-lg font-medium transition-colors"
							>
								Join Beta
							</button>
						</form>
						<div className="flex items-center gap-4 text-sm text-gray-400">
							<a
								href="https://github.com/yourusername/findexai"
								className="flex items-center gap-2 hover:text-white transition-colors"
							>
								<Github className="w-4 h-4" />
								View on GitHub
							</a>
							<span>•</span>
							<span>Free & Open Source</span>
						</div>
					</div>
					{/* Hero Demo Placeholder */}
					<div className="mt-16 max-w-4xl mx-auto">
						<div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 p-8 text-center">
							<div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg p-6 mb-4">
								<p className="text-gray-300 mb-4">
									<Github className="w-6 h-6" /> Demo video coming soon!
								</p>
								<p className="text-sm text-gray-400">
									See FindexAI in action: Ctrl+Shift+F → Ask questions → Get
									instant AI-powered answers
								</p>
							</div>
							<p className="text-sm text-gray-400">
								Extension sidebar preview with semantic search in action
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
