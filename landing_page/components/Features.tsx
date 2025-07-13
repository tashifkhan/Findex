import { Code, Users, Shield, Zap, Globe, Cpu, Search } from "lucide-react";

export default function Features() {
	const features = [
		{
			icon: <Code className="w-6 h-6" />,
			title: "Multi-Agent System",
			description:
				"Intelligent agents work together to understand context, search the web, and provide comprehensive answers to your queries.",
			color: "var(--accent-ocean)",
		},
		{
			icon: <Zap className="w-6 h-6" />,
			title: "FAISS Vector Search",
			description:
				"Lightning-fast semantic search using Facebook's FAISS library for instant, contextually relevant results.",
			color: "var(--accent-teal)",
		},
		{
			icon: <Shield className="w-6 h-6" />,
			title: "Bring Your Own Keys",
			description:
				"Use your own API keys for OpenAI, Anthropic, or any LLM provider. Your data stays private and under your control.",
			color: "var(--accent-orange)",
		},
		{
			icon: <Globe className="w-6 h-6" />,
			title: "Live Web Search",
			description:
				"Real-time web search integration provides up-to-date information alongside page content analysis.",
			color: "var(--accent-ocean)",
		},
		{
			icon: <Users className="w-6 h-6" />,
			title: "Custom Themes",
			description:
				"Personalize your search experience with multiple themes and UI customization options.",
			color: "var(--accent-teal)",
		},
		{
			icon: <Cpu className="w-6 h-6" />,
			title: "Local LLM Support",
			description:
				"Run models locally for complete privacy, or use cloud providers—your choice, your data.",
			color: "var(--accent-orange)",
		},
	];

	return (
		<section
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
						Deep Dive Features
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Built for power users who need more than basic search. Every feature
						designed with privacy, performance, and productivity in mind.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
					{features.map((feature, index) => (
						<div
							key={index}
							className="group bg-gray-800 rounded-xl border border-gray-700 p-8 hover:shadow-xl transition-all duration-300 hover:border-gray-500 hover:-translate-y-1"
						>
							<div
								className="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300"
								style={{ background: feature.color }}
							>
								{feature.icon}
							</div>

							<h3 className="text-xl font-bold text-white mb-4">
								{feature.title}
							</h3>

							<p className="text-gray-300 leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>

				{/* Tech Stack Info */}
				<div
					className="mt-20 rounded-2xl p-8 md:p-12 text-white"
					style={{ background: "var(--accent-gradient)" }}
				>
					<div className="text-center mb-8">
						<h3 className="text-3xl font-bold mb-4">Built with Modern Tech</h3>
						<p className="text-gray-300 text-lg">
							Open source, extensible, and built on battle-tested technologies
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
						<div className="bg-gray-900 rounded-lg p-4">
							<Cpu className="w-6 h-6 mb-2" />
							<div className="font-semibold text-white">LangChain</div>
							<div className="text-sm text-gray-400">AI Framework</div>
						</div>
						<div className="bg-gray-900 rounded-lg p-4">
							<Zap className="w-6 h-6 mb-2" />
							<div className="font-semibold text-white">FastAPI</div>
							<div className="text-sm text-gray-400">Backend</div>
						</div>
						<div className="bg-gray-900 rounded-lg p-4">
							<Search className="w-6 h-6 mb-2" />
							<div className="font-semibold text-white">FAISS</div>
							<div className="text-sm text-gray-400">Vector Search</div>
						</div>
						<div className="bg-gray-900 rounded-lg p-4">
							<Globe className="w-6 h-6 mb-2" />
							<div className="font-semibold text-white">WebExtension</div>
							<div className="text-sm text-gray-400">Cross-browser</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
