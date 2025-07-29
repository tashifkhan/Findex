"use client";

import { useState, useEffect } from "react";
import {
	FileText,
	Bot,
	Globe,
	Github,
	Youtube,
	FileCode,
	X,
} from "lucide-react";
import { Button } from "../ui/button";

interface Agent {
	id: string;
	name: string;
	requiresUrl: boolean;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
	description: string;
}

interface AgentSelectorProps {
	agent: string;
	url?: string;
	onAgentChange: (agent: string) => void;
	onUrlChange: (url: string) => void;
}

const AGENTS: Agent[] = [
	{
		id: "react",
		name: "React Agent",
		requiresUrl: false,
		icon: Bot,
		color: "from-blue-500 to-cyan-500",
		description: "General purpose AI assistant",
	},
	{
		id: "youtube",
		name: "YouTube",
		requiresUrl: true,
		icon: Youtube,
		color: "from-red-500 to-pink-500",
		description: "Analyze YouTube videos and transcripts",
	},
	{
		id: "github",
		name: "GitHub",
		requiresUrl: true,
		icon: Github,
		color: "from-gray-600 to-gray-800",
		description: "Explore GitHub repositories and code",
	},
	{
		id: "websearch",
		name: "Web Search",
		requiresUrl: false,
		icon: Globe,
		color: "from-purple-500 to-violet-500",
		description: "Search the web for information",
	},
	{
		id: "web-scroller",
		name: "Web Scroller",
		requiresUrl: true,
		icon: FileCode,
		color: "from-green-500 to-emerald-500",
		description: "Crawl and analyze specific websites",
	},
	{
		id: "docs",
		name: "Docs",
		requiresUrl: false,
		icon: FileText,
		color: "from-orange-500 to-amber-500",
		description: "Process and analyze documents (Under Construction)",
	},
];

export function AgentSelector({ agent, onAgentChange }: AgentSelectorProps) {
	const [isOpen, setIsOpen] = useState(false);
	const selectedAgent = AGENTS.find((a) => a.id === agent) || AGENTS[0];
	const IconComponent = selectedAgent.icon;

	// Close modal on escape key
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		}

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}
	}, [isOpen]);

	return (
		<div className="relative">
			{/* Compact Agent Selector Button */}
			<Button
				variant="outline"
				className="h-11 w-11 p-0 rounded-lg backdrop-blur-sm transition-all duration-200 text-white border-0 flex items-center justify-center hover:scale-105"
				style={{
					background: "rgba(30, 41, 59, 0.6)",
					border: "1px solid rgba(255,255,255,0.15)",
					backdropFilter: "blur(12px)",
					WebkitBackdropFilter: "blur(12px)",
				}}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div
					className="w-6 h-6 rounded-md flex items-center justify-center"
					style={{
						background: `linear-gradient(135deg, ${
							selectedAgent.color.split(" ")[1]
						}, ${selectedAgent.color.split(" ")[3]})`,
					}}
				>
					<IconComponent className="w-3.5 h-3.5 text-white" />
				</div>
			</Button>

			{/* Modal Overlay */}
			{isOpen && (
				<div
					className="fixed bottom-4 bg-transparent z-50 flex items-center justify-center p-4"
					onClick={() => setIsOpen(false)}
				>
					<div
						className="max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-lg"
						style={{
							background: "rgba(15, 23, 35, 0.95)",
							border: "1px solid rgba(255,255,255,0.1)",
							backdropFilter: "blur(20px)",
							WebkitBackdropFilter: "blur(20px)",
						}}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div className="flex items-center justify-between p-6 border-b border-white/10">
							<div className="flex items-center gap-3">
								<div
									className="w-8 h-8 rounded-lg flex items-center justify-center"
									style={{ background: "var(--accent-gradient)" }}
								>
									<Bot className="w-4 h-4 text-white" />
								</div>
								<div>
									<h2 className="text-lg font-semibold text-white">
										AI Agent Selection
									</h2>
									<p className="text-sm text-white/60">
										Choose your AI assistant
									</p>
								</div>
							</div>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setIsOpen(false)}
								className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
							>
								<X className="w-4 h-4" />
							</Button>
						</div>

						{/* Agent Grid */}
						<div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								{AGENTS.map((agentOption) => {
									const AgentIcon = agentOption.icon;
									const isSelected = agent === agentOption.id;
									return (
										<button
											key={agentOption.id}
											onClick={() => {
												onAgentChange(agentOption.id);
												setIsOpen(false);
											}}
											className="group relative p-4 rounded-xl border transition-all duration-200 text-left hover:scale-[1.02] hover:shadow-lg"
											style={{
												background: isSelected
													? "rgba(20, 184, 166, 0.1)" // accent-teal with opacity
													: "rgba(30, 41, 59, 0.4)",
												border: isSelected
													? "1px solid rgba(20, 184, 166, 0.3)" // accent-teal with opacity
													: "1px solid rgba(255,255,255,0.1)",
												backdropFilter: "blur(10px)",
												WebkitBackdropFilter: "blur(10px)",
											}}
										>
											{/* Selection Indicator */}
											{isSelected && (
												<div
													className="absolute top-2 right-2 w-2 h-2 rounded-full"
													style={{ background: "var(--accent-teal)" }}
												></div>
											)}

											{/* Agent Icon */}
											<div className="flex items-center gap-3 mb-3">
												<div
													className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
													style={{
														background: `linear-gradient(135deg, ${
															agentOption.color.split(" ")[1]
														}, ${agentOption.color.split(" ")[3]})`,
													}}
												>
													<AgentIcon className="w-5 h-5 text-white" />
												</div>
												<div className="min-w-0 flex-1">
													<div className="text-sm font-medium text-white truncate">
														{agentOption.name}
													</div>
													{agentOption.requiresUrl && (
														<div className="flex items-center gap-1 mt-1">
															<Globe className="w-3 h-3 text-white/50" />
															<span className="text-xs text-white/50">
																Requires URL
															</span>
														</div>
													)}
												</div>
											</div>

											{/* Description */}
											<p className="text-xs text-white/70 leading-relaxed">
												{agentOption.description}
											</p>

											{/* Hover Effect */}
											<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
										</button>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
