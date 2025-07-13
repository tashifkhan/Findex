import { Search, Brain, Zap } from "lucide-react";

export default function HowItWorks() {
	const steps = [
		{
			icon: <Search className="w-8 h-8" />,
			title: "Install & Activate",
			description:
				"Add FindexAI to Chrome/Firefox, then press Ctrl+Shift+F on any webpage",
			code: "Ctrl + Shift + F",
		},
		{
			icon: <Brain className="w-8 h-8" />,
			title: "Ask Questions",
			description: "Type natural language questions instead of exact keywords",
			code: `"What is the main conclusion?"`,
		},
		{
			icon: <Zap className="w-8 h-8" />,
			title: "Get AI Answers",
			description:
				"Receive contextual, semantic answers from AI agents analyzing page content",
			code: "AI: Based on the content...",
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
						How It Works
					</h2>
					<p className="text-xl text-white opacity-65 max-w-2xl mx-auto">
						Transform your browsing experience in three simple steps
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{steps.map((step, index) => (
						<div key={index} className="relative">
							{/* Connection Line */}
							{index < steps.length - 1 && (
								<div
									className="hidden md:block absolute top-16 left-full w-full h-0.5"
									style={{ background: "var(--accent-gradient)" }}
								>
									<div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-blue-400 border-y-2 border-y-transparent"></div>
								</div>
							)}

							<div
								className="rounded-xl shadow-lg p-8 text-center relative z-10 hover:shadow-xl transition-shadow duration-300"
								style={{
									background: "rgba(20, 30, 40, 0.35)",
									border: "1px solid rgba(255,255,255,0.18)",
									borderRadius: "1rem",
									backdropFilter: "blur(16px)",
									WebkitBackdropFilter: "blur(16px)",
									boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
								}}
							>
								{/* Step Number */}
								<div
									className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
									style={{ background: "var(--accent-gradient)" }}
								>
									{index + 1}
								</div>

								{/* Icon */}
								<div
									className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 mt-4"
									style={{ background: "var(--accent-ocean)" }}
								>
									<div className="text-white opacity-65">{step.icon}</div>
								</div>

								{/* Content */}
								<h3 className="text-xl font-bold text-white mb-4">
									{step.title}
								</h3>
								<p className="text-gray-300 mb-6 leading-relaxed">
									{step.description}
								</p>

								{/* Code Example */}
								<div className="bg-gray-900 rounded-lg p-4 text-left">
									<div className="flex items-center gap-2 mb-2">
										<div className="w-3 h-3 bg-red-400 rounded-full"></div>
										<div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
										<div className="w-3 h-3 bg-green-400 rounded-full"></div>
									</div>
									<code className="text-green-400 font-mono text-sm">
										{step.code}
									</code>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Additional Info */}
				<div className="text-center mt-16">
					<div
						className="rounded-xl shadow-lg p-8 max-w-4xl mx-auto"
						style={{
							background: "rgba(20, 30, 40, 0.35)",
							border: "1px solid rgba(255,255,255,0.18)",
							borderRadius: "1rem",
							backdropFilter: "blur(16px)",
							WebkitBackdropFilter: "blur(16px)",
							boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
						}}
					>
						<h3 className="text-2xl font-bold text-white mb-4">
							Powered by Advanced AI
						</h3>
						<p className="text-gray-300 leading-relaxed">
							FindexAI uses multi-agent systems, FAISS vector search, and your
							choice of LLMs (OpenAI, Anthropic, or local models) to understand
							context and provide intelligent answers. All processing respects
							your privacy—use your own API keys and keep control of your data.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
