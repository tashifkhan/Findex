"use client";

import { useState } from "react";
import { Plus, MessageSquare, Trash2, Menu, X, Bot } from "lucide-react";
import { Button } from "../ui/button";

interface ChatThread {
	id: string;
	title: string;
	lastMessage: string;
	timestamp: Date;
	messageCount: number;
}

interface ChatSidebarProps {
	threads: ChatThread[];
	activeThreadId?: string;
	onSelectThread: (threadId: string) => void;
	onNewChat: () => void;
	onDeleteThread: (threadId: string) => void;
	isMobile?: boolean;
}

function SidebarContent({
	threads,
	activeThreadId,
	onSelectThread,
	onNewChat,
	onDeleteThread,
}: Omit<ChatSidebarProps, "isMobile">) {
	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="p-6 border-b border-white/10 bg-gradient-to-r from-transparent via-white/5 to-transparent">
				<div className="flex items-center gap-3 mb-6">
					<div
						className="w-10 h-10 rounded-xl flex items-center justify-center"
						style={{ background: "var(--accent-gradient)" }}
					>
						<Bot className="w-5 h-5 text-white" />
					</div>
					<div>
						<h2 className="font-bold text-white text-lg">FindexAI</h2>
						<p className="text-sm text-white/60">Chat Assistant</p>
					</div>
				</div>
				<Button
					onClick={onNewChat}
					className="w-full text-white border-0 rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
					style={{ background: "var(--accent-ocean)" }}
				>
					<Plus className="w-4 h-4 mr-2" />
					New Chat
				</Button>
			</div>

			{/* Chat Threads */}
			<div className="flex-1 overflow-hidden p-4">
				<h3 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wide">
					Recent Chats
				</h3>
				<div className="space-y-3 overflow-y-auto max-h-full custom-scrollbar">
					{threads.length === 0 ? (
						<div className="text-center py-12">
							<div
								className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
								style={{
									background: "rgba(20, 30, 40, 0.35)",
									border: "1px solid rgba(255,255,255,0.18)",
									borderRadius: "1rem",
									backdropFilter: "blur(16px)",
									WebkitBackdropFilter: "blur(16px)",
									boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
								}}
							>
								<MessageSquare className="w-8 h-8 text-white/40" />
							</div>
							<p className="text-sm text-white/40">No chat history yet</p>
							<p className="text-xs text-white/30 mt-1">
								Start a new conversation
							</p>
						</div>
					) : (
						threads.map((thread) => (
							<div
								key={thread.id}
								className={`group p-4 cursor-pointer transition-all duration-200 rounded-xl border backdrop-blur-sm ${
									activeThreadId === thread.id ? "shadow-lg" : "hover:shadow-md"
								}`}
								style={{
									background:
										activeThreadId === thread.id
											? "rgba(56, 189, 248, 0.2)"
											: "rgba(20, 30, 40, 0.35)",
									border:
										activeThreadId === thread.id
											? "1px solid rgba(56, 189, 248, 0.3)"
											: "1px solid rgba(255,255,255,0.18)",
									backdropFilter: "blur(16px)",
									WebkitBackdropFilter: "blur(16px)",
									boxShadow:
										activeThreadId === thread.id
											? "0 4px 32px 0 rgba(56, 189, 248, 0.12)"
											: "0 4px 32px 0 rgba(0,0,0,0.12)",
								}}
								onClick={() => onSelectThread(thread.id)}
							>
								<div className="flex items-start justify-between gap-3">
									<div className="flex-1 min-w-0">
										<h4 className="text-sm font-semibold text-white truncate">
											{thread.title}
										</h4>
										<p className="text-xs text-white/60 truncate mt-1 line-clamp-2">
											{thread.lastMessage}
										</p>
										<div className="flex items-center gap-2 mt-3 text-xs text-white/40">
											<div className="flex items-center gap-1">
												<MessageSquare className="w-3 h-3" />
												<span>{thread.messageCount}</span>
											</div>
											<span>•</span>
											<span>
												{new Date(thread.timestamp).toLocaleDateString()}
											</span>
										</div>
									</div>
									<Button
										variant="ghost"
										size="sm"
										onClick={(e) => {
											e.stopPropagation();
											onDeleteThread(thread.id);
										}}
										className="opacity-0 group-hover:opacity-100 transition-all duration-200 h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg"
									>
										<Trash2 className="w-3 h-3" />
									</Button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export function ChatSidebar(props: ChatSidebarProps) {
	const [isOpen, setIsOpen] = useState(false);

	if (props.isMobile) {
		return (
			<div>
				<Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
					<Menu className="w-4 h-4" />
				</Button>
				{isOpen && (
					<div
						className="fixed inset-0 z-50 bg-black/50"
						onClick={() => setIsOpen(false)}
					>
						<div
							className="fixed left-0 top-0 h-full w-80 bg-background border-r"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex items-center justify-between p-4 border-b">
								<h2 className="font-semibold">Chat History</h2>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setIsOpen(false)}
								>
									<X className="w-4 h-4" />
								</Button>
							</div>
							<SidebarContent {...props} />
						</div>
					</div>
				)}
			</div>
		);
	}

	return (
		<div className="w-80 h-full border-r bg-background">
			<SidebarContent {...props} />
		</div>
	);
}
