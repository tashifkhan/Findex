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
			videoUrl:
				"https://drive.google.com/file/d/10YAkEOtMh-O0E4ovfvKkX-r-K-WAkiCk/preview",
		},
		{
			title: "YouTube Transcript Search",
			description:
				"Search through YouTube video content using natural language queries to find specific moments.",
			thumbnail: "/demo-youtube.png",
			videoUrl:
				"https://drive.google.com/file/d/1UcH4ZfAp7qoTVwo5_p6rhw5CKGklsIc7/preview",
		},
		{
			title: "Multi-Agent Web Search",
			description:
				"See how multiple AI agents work together to search the web and provide comprehensive answers.",
			thumbnail: "/demo-websearch.png",
			videoUrl:
				"https://drive.google.com/file/d/1RKlDqS_XBXd5h9u0vriPmNlgr1TgDHTZ/preview",
		},
		{
			title: "Custom LLM Integration",
			description:
				"Configure your own API keys and choose between different language models for personalized results.",
			thumbnail: "/demo-config.png",
			videoUrl: null, // No video for this demo yet
		},
	];

	const nextDemo = () => {
		setCurrentDemo((prev) => (prev + 1) % demos.length);
	};

	const prevDemo = () => {
		setCurrentDemo((prev) => (prev - 1 + demos.length) % demos.length);
	};

	return (
		<section
			id="demo-section"
			className="relative py-20 text-white overflow-hidden"
			style={{
				background:
					"radial-gradient(ellipse 80% 60% at 60% 20%, var(--accent-ocean) 0%, transparent 60%)," +
					"radial-gradient(ellipse 60% 40% at 20% 80%, var(--accent-teal) 0%, transparent 70%)," +
					"linear-gradient(120deg, #0a0a0a 60%, #10151a 100%)",
			}}
		>
			<div
				className="absolute inset-0"
				style={{ background: "rgba(10,10,20,0.85)" }}
			></div>
			<div className="container mx-auto px-6 relative z-10">
				<div className="text-center mb-16">
					<h2
						className="text-4xl md:text-5xl font-bold mb-6"
						style={{
							background: "var(--accent-gradient)",
							WebkitBackgroundClip: "text",
							backgroundClip: "text",
							color: "transparent",
							WebkitTextFillColor: "transparent",
						}}
					>
						See FindexAI in Action
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Experience the power of AI-driven search with these interactive
						demos
					</p>
				</div>

				{/* Main Demo Display */}
				<div className="max-w-5xl mx-auto">
					<div
						className="relative rounded-2xl overflow-hidden shadow-2xl"
						style={{
							background: "rgba(20, 30, 40, 0.35)",
							border: "1px solid rgba(255,255,255,0.18)",
							borderRadius: "2rem",
							backdropFilter: "blur(16px)",
							WebkitBackdropFilter: "blur(16px)",
							boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
						}}
					>
						{/* Demo Content */}
						<div className="relative aspect-video bg-gradient-to-br from-gray-700 to-gray-800">
							{demos[currentDemo].videoUrl ? (
								<iframe
									src={demos[currentDemo].videoUrl}
									className="w-full h-full"
									allow="autoplay"
									allowFullScreen
									style={{ border: "none" }}
								/>
							) : (
								<div className="flex items-center justify-center h-full">
									<div className="text-center p-8">
										<div
											className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
											style={{ background: "var(--accent-gradient)" }}
										>
											<Play className="w-12 h-12 text-white ml-1" />
										</div>
										<h3 className="text-2xl font-bold text-white mb-4">
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
							)}
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
									<h4 className="font-semibold text-lg text-white">
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
										? "shadow-lg"
										: "border-gray-600 hover:border-gray-500"
								}`}
								style={{
									background: "rgba(20, 30, 40, 0.35)",
									border:
										index === currentDemo
											? "2px solid var(--accent-ocean)"
											: "2px solid rgba(255,255,255,0.18)",
									borderRadius: "1rem",
									backdropFilter: "blur(16px)",
									WebkitBackdropFilter: "blur(16px)",
									boxShadow:
										index === currentDemo
											? "0 0 0 4px var(--accent-ocean), 0 4px 24px 0 rgba(56,189,248,0.15)"
											: "0 4px 32px 0 rgba(0,0,0,0.12)",
								}}
							>
								<div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
									<div className="text-center p-2">
										<div
											className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2"
											style={{ background: "var(--accent-gradient)" }}
										>
											<Play className="w-4 h-4 text-white ml-0.5" />
										</div>
										<div className="text-xs font-medium text-white">
											{demo.title}
										</div>
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
						<h4 className="font-semibold text-lg mb-2 text-white">
							Lightning Fast
						</h4>
						<p className="text-gray-400 text-sm">
							FAISS-powered vector search delivers results in milliseconds
						</p>
					</div>
					<div className="text-center p-6 bg-gray-800 rounded-xl">
						<div className="text-3xl mb-4">
							<Cpu className="w-6 h-6" />
						</div>
						<h4 className="font-semibold text-lg mb-2 text-white">
							Contextually Aware
						</h4>
						<p className="text-gray-400 text-sm">
							AI understands meaning, not just keywords
						</p>
					</div>
					<div className="text-center p-6 bg-gray-800 rounded-xl">
						<div className="text-3xl mb-4">
							<Shield className="w-6 h-6" />
						</div>
						<h4 className="font-semibold text-lg mb-2 text-white">
							Privacy First
						</h4>
						<p className="text-gray-400 text-sm">
							Your data stays private with BYOK approach
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
