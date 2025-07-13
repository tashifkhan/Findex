import { GraduationCap, Code2, BookOpen, TrendingUp } from "lucide-react";

export default function UseCases() {
	const useCases = [
		{
			icon: <GraduationCap className="w-8 h-8" />,
			title: "Students & Researchers",
			subtitle: "Never lose context again",
			description:
				"Quickly find specific information in research papers, lecture videos, and academic content without endless scrolling.",
			examples: [
				"Ask 'What was the methodology?' on any research paper",
				"Search YouTube lectures: 'Explain the key theorem'",
				"Find specific citations and references instantly",
			],
			color: "var(--accent-ocean)",
		},
		{
			icon: <Code2 className="w-8 h-8" />,
			title: "Developers",
			subtitle: "Code documentation made easy",
			description:
				"Navigate complex documentation, find code examples, and understand APIs faster with semantic search.",
			examples: [
				"Ask 'How do I implement authentication?' in docs",
				"Find specific code patterns: 'Show me React hooks'",
				"Search Stack Overflow answers semantically",
			],
			color: "var(--accent-teal)",
		},
		{
			icon: <BookOpen className="w-8 h-8" />,
			title: "Knowledge Workers",
			subtitle: "Information at your fingertips",
			description:
				"Research reports, analyze content, and extract insights from any webpage or document with AI assistance.",
			examples: [
				"Ask 'What are the main takeaways?' from reports",
				"Find specific data: 'Show me the revenue figures'",
				"Compare information across multiple sources",
			],
			color: "var(--accent-orange)",
		},
		{
			icon: <TrendingUp className="w-8 h-8" />,
			title: "Content Creators",
			subtitle: "Research and fact-check quickly",
			description:
				"Gather information, verify facts, and find supporting content for your articles, videos, and presentations.",
			examples: [
				"Fact-check: 'What's the latest data on this topic?'",
				"Find quotes: 'Who said this about AI?'",
				"Research trends: 'What are the current statistics?'",
			],
			color: "var(--accent-ocean)",
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
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
						Built For Everyone
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Whether you're studying, coding, researching, or creating—FindexAI
						adapts to your workflow
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
					{useCases.map((useCase, index) => (
						<div
							key={index}
							className="bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-700"
						>
							{/* Header */}
							<div className="flex items-start gap-4 mb-6">
								<div
									className="w-16 h-16 rounded-xl flex items-center justify-center text-white flex-shrink-0"
									style={{ background: useCase.color }}
								>
									{useCase.icon}
								</div>
								<div>
									<h3 className="text-2xl font-bold text-white mb-1">
										{useCase.title}
									</h3>
									<p className="text-gray-400 font-medium">
										{useCase.subtitle}
									</p>
								</div>
							</div>
							{/* Description */}
							<p className="text-gray-300 leading-relaxed mb-6">
								{useCase.description}
							</p>
							{/* Examples */}
							<div className="space-y-3">
								<h4 className="font-semibold text-white text-sm uppercase tracking-wide">
									Example Queries:
								</h4>
								{useCase.examples.map((example, exampleIndex) => (
									<div
										key={exampleIndex}
										className="flex items-start gap-3 p-3 bg-gray-900 rounded-lg"
									>
										<div
											className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
											style={{ background: "var(--accent-gradient)" }}
										></div>
										<p className="text-gray-300 text-sm italic">"{example}"</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Stats Section */}
				<div
					className="mt-20 rounded-2xl shadow-lg p-8 md:p-12"
					style={{ background: "var(--accent-gradient)" }}
				>
					<div className="text-center mb-12">
						<h3 className="text-3xl font-bold text-white mb-4">
							Stop Scrolling, Start Finding
						</h3>
						<p className="text-gray-300 text-lg">
							Join thousands of users who've transformed their browsing
							experience
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
						<div className="p-6">
							<div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
								10x
							</div>
							<div className="text-gray-300 font-medium">
								Faster Information Discovery
							</div>
						</div>
						<div className="p-6">
							<div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
								85%
							</div>
							<div className="text-gray-600 font-medium">
								Reduction in Research Time
							</div>
						</div>
						<div className="p-6">
							<div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
								100%
							</div>
							<div className="text-gray-600 font-medium">
								Free & Open Source
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
