"use client";

import {
	Play,
	ChevronLeft,
	ChevronRight,
	Zap,
	Cpu,
	Shield,
} from "lucide-react";
import { useState } from "react";

export default function Demo() {
	const [currentDemo, setCurrentDemo] = useState(0);

	const demos = [
		{
			title: "Semantic Search in Action",
			description:
				"Watch how FindexAI understands context and provides intelligent answers instead of just keyword matches.",
			thumbnail: "/demo-semantic.png",
			gifUrl: "/demo-semantic.gif",
		},
		{
			title: "YouTube Transcript Search",
			description:
				"Search through YouTube video content using natural language queries to find specific moments.",
			thumbnail: "/demo-youtube.png",
			gifUrl: "/demo-youtube.gif",
		},
		{
			title: "Multi-Agent Web Search",
			description:
				"See how multiple AI agents work together to search the web and provide comprehensive answers.",
			thumbnail: "/demo-websearch.png",
			gifUrl: "/demo-websearch.gif",
		},
		{
			title: "Custom LLM Integration",
			description:
				"Configure your own API keys and choose between different language models for personalized results.",
			thumbnail: "/demo-config.png",
			gifUrl: "/demo-config.gif",
		},
	];

	const nextDemo = () => {
		setCurrentDemo((prev) => (prev + 1) % demos.length);
	};

	const prevDemo = () => {
		setCurrentDemo((prev) => (prev - 1 + demos.length) % demos.length);
	};

	return (
		<section className="py-20 bg-gray-900 text-white">
			<div className="container mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						See FindexAI in Action
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Experience the power of AI-driven search with these interactive
						demos
					</p>
				</div>

				{/* Main Demo Display */}
				<div className="max-w-5xl mx-auto">
					<div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
						{/* Demo Content */}
						<div className="relative aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
							{/* Placeholder for actual demo video/gif */}
							<div className="text-center p-8">
								<div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
									<Play className="w-12 h-12 text-white ml-1" />
								</div>
								<h3 className="text-2xl font-bold mb-4">
									{demos[currentDemo].title}
								</h3>
								<p className="text-gray-300 max-w-md mx-auto">
									{demos[currentDemo].description}
								</p>
								<div className="mt-6 text-sm text-gray-400">
									<Play className="inline w-4 h-4 mr-1" /> Interactive demo
									coming soon!
								</div>
							</div>
						</div>

						{/* Navigation Controls */}
						<div className="absolute inset-y-0 left-4 flex items-center">
							<button
								onClick={prevDemo}
								className="w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
							>
								<ChevronLeft className="w-6 h-6" />
							</button>
						</div>
						<div className="absolute inset-y-0 right-4 flex items-center">
							<button
								onClick={nextDemo}
								className="w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
							>
								<ChevronRight className="w-6 h-6" />
							</button>
						</div>

						{/* Demo Info Overlay */}
						<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
							<div className="flex items-center justify-between">
								<div>
									<h4 className="font-semibold text-lg">
										{demos[currentDemo].title}
									</h4>
									<p className="text-gray-300 text-sm">
										{demos[currentDemo].description}
									</p>
								</div>
								<div className="text-sm text-gray-400">
									{currentDemo + 1} / {demos.length}
								</div>
							</div>
						</div>
					</div>

					{/* Demo Thumbnails */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
						{demos.map((demo, index) => (
							<button
								key={index}
								onClick={() => setCurrentDemo(index)}
								className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
									index === currentDemo
										? "border-purple-400 shadow-lg shadow-purple-400/25"
										: "border-gray-600 hover:border-gray-500"
								}`}
							>
								<div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
									<div className="text-center p-2">
										<div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
											<Play className="w-4 h-4 text-white ml-0.5" />
										</div>
										<div className="text-xs font-medium">{demo.title}</div>
									</div>
								</div>
							</button>
						))}
					</div>
				</div>

				{/* Feature Highlights */}
				<div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					<div className="text-center p-6 bg-gray-800 rounded-xl">
						<div className="text-3xl mb-4">
							<Zap className="w-6 h-6" />
						</div>
						<h4 className="font-semibold text-lg mb-2">Lightning Fast</h4>
						<p className="text-gray-400 text-sm">
							FAISS-powered vector search delivers results in milliseconds
						</p>
					</div>
					<div className="text-center p-6 bg-gray-800 rounded-xl">
						<div className="text-3xl mb-4">
							<Cpu className="w-6 h-6" />
						</div>
						<h4 className="font-semibold text-lg mb-2">Contextually Aware</h4>
						<p className="text-gray-400 text-sm">
							AI understands meaning, not just keywords
						</p>
					</div>
					<div className="text-center p-6 bg-gray-800 rounded-xl">
						<div className="text-3xl mb-4">
							<Shield className="w-6 h-6" />
						</div>
						<h4 className="font-semibold text-lg mb-2">Privacy First</h4>
						<p className="text-gray-400 text-sm">
							Your data stays private with BYOK approach
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
