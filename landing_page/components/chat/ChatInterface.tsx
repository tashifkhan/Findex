"use client";

import { useState, useRef, useEffect } from "react";
import {
	Send,
	Bot,
	User,
	Copy,
	Loader2,
	Link,
	FileText,
	Upload,
} from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useToast } from "../../hooks/use-toast";
import { AgentSelector } from "./AgentSelector";

interface Message {
	id: string;
	sender: "user" | "ai";
	content: string;
	timestamp: Date;
	agent?: string;
	url?: string;
}

interface ChatInterfaceProps {
	onSendMessage: (
		content: string,
		agent: string,
		url?: string
	) => Promise<string>;
	currentAgent: string;
	currentUrl?: string;
	messages: Message[];
	isLoading: boolean;
	onAgentChange: (agent: string) => void;
	onUrlChange: (url: string) => void;
}

export function ChatInterface({
	onSendMessage,
	currentAgent,
	currentUrl,
	messages,
	isLoading,
	onAgentChange,
	onUrlChange,
}: ChatInterfaceProps) {
	const [inputValue, setInputValue] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { toast } = useToast();

	// Find agent details
	const AGENTS = [
		{ id: "react", name: "React Agent", requiresUrl: false },
		{ id: "youtube", name: "YouTube", requiresUrl: true },
		{ id: "github", name: "GitHub", requiresUrl: true },
		{ id: "website", name: "Website", requiresUrl: true },
		{ id: "web-scroller", name: "Web Scroller", requiresUrl: true },
		{ id: "docs", name: "Docs", requiresUrl: false },
	];

	const selectedAgent = AGENTS.find((a) => a.id === currentAgent) || AGENTS[0];

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Auto-resize textarea
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [inputValue]);

	const handleSend = async () => {
		if (!inputValue.trim() || isLoading) return;

		const message = inputValue.trim();
		setInputValue("");

		try {
			await onSendMessage(message, currentAgent, currentUrl);
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to send message. Please try again.",
				variant: "destructive",
			});
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			toast({
				title: "Copied",
				description: "Message copied to clipboard",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to copy message",
				variant: "destructive",
			});
		}
	};

	const formatMessage = (content: string) => {
		// Basic formatting
		return content.split("\n").map((line, index) => (
			<div key={index} className="leading-relaxed">
				{line || <br />}
			</div>
		));
	};

	return (
		<div className="flex flex-col h-full bg-transparent">
			{/* Messages Area */}
			<div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
				{messages.length === 0 ? (
					<div className="text-center py-20">
						<div
							className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center"
							style={{ background: "var(--accent-gradient)" }}
						>
							<Bot className="w-10 h-10 text-white" />
						</div>
						<h3 className="text-2xl font-bold text-white mb-2">
							Welcome to FindexAI
						</h3>
						<p className="text-white/60 text-lg">
							Your intelligent assistant is ready to help
						</p>
						<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
							<div
								className="p-4 rounded-xl"
								style={{
									background: "rgba(20, 30, 40, 0.35)",
									border: "1px solid rgba(255,255,255,0.18)",
									borderRadius: "1rem",
									backdropFilter: "blur(16px)",
									WebkitBackdropFilter: "blur(16px)",
									boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
								}}
							>
								<p className="text-sm text-white/80 font-medium">
									💡 Ask anything
								</p>
								<p className="text-xs text-white/60 mt-1">
									Get answers with AI-powered search
								</p>
							</div>
							<div
								className="p-4 rounded-xl"
								style={{
									background: "rgba(20, 30, 40, 0.35)",
									border: "1px solid rgba(255,255,255,0.18)",
									borderRadius: "1rem",
									backdropFilter: "blur(16px)",
									WebkitBackdropFilter: "blur(16px)",
									boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
								}}
							>
								<p className="text-sm text-white/80 font-medium">
									🔍 Web search
								</p>
								<p className="text-xs text-white/60 mt-1">
									Search the web in real-time
								</p>
							</div>
						</div>
					</div>
				) : (
					messages.map((message) => (
						<div
							key={message.id}
							className={`flex gap-4 ${
								message.sender === "user" ? "flex-row-reverse" : "flex-row"
							} chat-bubble-enter`}
						>
							{/* Avatar */}
							<div className="flex-shrink-0">
								<div
									className="w-10 h-10 rounded-xl flex items-center justify-center"
									style={{
										background:
											message.sender === "user"
												? "var(--accent-ocean)"
												: "var(--accent-teal)",
									}}
								>
									{message.sender === "user" ? (
										<User className="w-5 h-5 text-white" />
									) : (
										<Bot className="w-5 h-5 text-white" />
									)}
								</div>
							</div>

							{/* Message Content */}
							<div
								className={`flex-1 max-w-[80%] ${
									message.sender === "user" ? "text-right" : "text-left"
								}`}
							>
								<div
									className="inline-block p-4 rounded-2xl backdrop-blur-sm border shadow-lg"
									style={{
										background:
											message.sender === "user"
												? "var(--accent-ocean)"
												: "rgba(20, 30, 40, 0.35)",
										border:
											message.sender === "user"
												? "1px solid rgba(56, 189, 248, 0.3)"
												: "1px solid rgba(255,255,255,0.18)",
										backdropFilter: "blur(16px)",
										WebkitBackdropFilter: "blur(16px)",
									}}
								>
									<div className="text-sm font-medium mb-2 flex items-center gap-2 text-white">
										{message.sender === "user" ? "You" : "FindexAI"}
										{message.agent && message.sender === "ai" && (
											<span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white/80">
												{message.agent}
											</span>
										)}
									</div>
									<div className="text-sm leading-relaxed text-white">
										{formatMessage(message.content)}
									</div>
									<div className="flex items-center justify-between mt-3">
										<time className="text-xs opacity-60">
											{message.timestamp.toLocaleTimeString()}
										</time>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => copyToClipboard(message.content)}
											className="h-8 w-8 p-0 opacity-60 hover:opacity-100 rounded-lg hover:bg-white/20"
										>
											<Copy className="w-4 h-4" />
										</Button>
									</div>
								</div>
							</div>
						</div>
					))
				)}

				{/* Loading indicator */}
				{isLoading && (
					<div className="flex gap-4">
						<div className="flex-shrink-0">
							<div
								className="w-10 h-10 rounded-xl flex items-center justify-center"
								style={{ background: "var(--accent-teal)" }}
							>
								<Bot className="w-5 h-5 text-white" />
							</div>
						</div>
						<div className="flex-1 max-w-[80%]">
							<div
								className="inline-block p-4 rounded-2xl backdrop-blur-sm"
								style={{
									background: "rgba(20, 30, 40, 0.35)",
									border: "1px solid rgba(255,255,255,0.18)",
									backdropFilter: "blur(16px)",
									WebkitBackdropFilter: "blur(16px)",
								}}
							>
								<div className="text-sm font-medium text-white mb-2">
									FindexAI
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
									<div
										className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
										style={{ animationDelay: "0.2s" }}
									></div>
									<div
										className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
										style={{ animationDelay: "0.4s" }}
									></div>
									<span className="text-sm text-white/60 ml-2">
										Thinking...
									</span>
								</div>
							</div>
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			{/* Agent Selector and Input Area */}
			<div
				className="p-4 border-t border-white/10 space-y-3"
				style={{ background: "rgba(255,255,255,0.03)" }}
			>
				{/* URL Input (conditional) */}
				{selectedAgent.requiresUrl && (
					<div className="space-y-1">
						<Input
							value={currentUrl || ""}
							onChange={(e) => onUrlChange(e.target.value)}
							placeholder={`${selectedAgent.name} URL...`}
							className="text-white placeholder:text-white/50 rounded-lg text-sm h-10"
							style={{
								background: "rgba(20, 30, 40, 0.3)",
								border: "1px solid rgba(255,255,255,0.15)",
								backdropFilter: "blur(12px)",
								WebkitBackdropFilter: "blur(12px)",
							}}
						/>
					</div>
				)}

				{/* Document Upload (for Docs agent) */}
				{currentAgent === "docs" && (
					<div
						className="p-4 text-center border border-dashed rounded-lg transition-all duration-200 cursor-pointer"
						style={{
							background: "rgba(20, 30, 40, 0.25)",
							border: "1px dashed rgba(255,255,255,0.15)",
							backdropFilter: "blur(12px)",
							WebkitBackdropFilter: "blur(12px)",
						}}
					>
						<div className="flex items-center justify-center gap-2">
							<Upload className="w-4 h-4 text-white/60" />
							<span className="text-sm text-white/80">
								Drop files or click to browse
							</span>
						</div>
					</div>
				)}

				{/* Message Input */}
				<div
					className="flex gap-2 items-end p-2 rounded-xl"
					style={{
						background: "rgba(20, 30, 40, 0.4)",
						border: "1px solid rgba(255,255,255,0.18)",
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
					}}
				>
					<div className="flex-shrink-0">
						<AgentSelector
							agent={currentAgent}
							url={currentUrl}
							onAgentChange={onAgentChange}
							onUrlChange={onUrlChange}
						/>
					</div>
					<div className="flex-1 min-w-0">
						<Textarea
							ref={textareaRef}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Ask FindexAI anything..."
							className="max-h-28 resize-none text-white placeholder:text-white/50 rounded-lg border-0 bg-transparent focus:ring-0 focus:outline-none p-2"
							rows={1}
						/>
					</div>
					<Button
						onClick={handleSend}
						disabled={!inputValue.trim() || isLoading}
						className="text-white border-0 rounded-lg p-2 h-11 w-11 hover:scale-105 transition-all duration-200"
						style={{
							background: "var(--accent-ocean)",
						}}
					>
						{isLoading ? (
							<Loader2 className="w-4 h-4 animate-spin" />
						) : (
							<Send className="w-4 h-4" />
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
