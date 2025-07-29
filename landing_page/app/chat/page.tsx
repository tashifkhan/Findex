"use client";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Search, Menu } from "lucide-react";
import { ChatInterface } from "../../components/chat/ChatInterface";
import { ChatSidebar } from "../../components/chat/ChatSidebar";
import { SidebarContent } from "../../components/chat/ChatSidebar";
import { SettingsModal } from "../../components/chat/SettingsModal";
import { ThemeToggle } from "../../components/chat/ThemeToggle";
import { useChatStorage, Message } from "../../hooks/useChatStorage";
import { useIsMobile } from "../../hooks/use-mobile";
import { useToast } from "../../hooks/use-toast";
import { Toaster } from "../../components/ui/toaster";
import { Sonner } from "../../components/ui/sonner";
import { TooltipProvider } from "../../components/ui/tooltip";

const ChatApp = memo(function ChatApp() {
	const [isLoading, setIsLoading] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [headerVisible, setHeaderVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const isMobile = useIsMobile();
	const { toast } = useToast();

	const {
		threads,
		activeThreadId,
		settings,
		createNewThread,
		addMessage,
		deleteThread,
		setActiveThreadId,
		setSettings,
	} = useChatStorage();

	useEffect(() => {
		if (threads.length === 0) {
			createNewThread();
		}
	}, [threads.length, createNewThread]);

	// Throttle function for performance
	const throttle = useCallback(
		<T extends (...args: unknown[]) => void>(func: T, limit: number) => {
			let inThrottle = false;
			return function (this: unknown, ...args: Parameters<T>) {
				if (!inThrottle) {
					func.apply(this, args);
					inThrottle = true;
					setTimeout(() => {
						inThrottle = false;
					}, limit);
				}
			};
		},
		[]
	);

	// Mobile scroll optimization - hide header on scroll down, show on scroll up
	useEffect(() => {
		if (!isMobile) return;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY < lastScrollY || currentScrollY < 50) {
				setHeaderVisible(true);
			} else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
				setHeaderVisible(false);
			}
			setLastScrollY(currentScrollY);
		};

		const throttledHandleScroll = throttle(handleScroll, 10);
		window.addEventListener("scroll", throttledHandleScroll, { passive: true });
		return () => window.removeEventListener("scroll", throttledHandleScroll);
	}, [lastScrollY, isMobile, throttle]);

	// Close sidebar when clicking outside (mobile)
	useEffect(() => {
		if (!isMobile || !sidebarOpen) return;

		const handleClickOutside = (event: Event) => {
			const target = event.target as Element;
			if (
				!target.closest("[data-sidebar]") &&
				!target.closest("[data-sidebar-toggle]")
			) {
				setSidebarOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [sidebarOpen, isMobile]);

	// Get current messages with memoization for performance
	const activeThread = useMemo(
		() => threads.find((thread) => thread.id === activeThreadId),
		[threads, activeThreadId]
	);
	const messages = useMemo(
		() => activeThread?.messages || [],
		[activeThread?.messages]
	);

	// Optimized handlers with useCallback to prevent unnecessary re-renders
	const handleSendMessage = useCallback(
		async (content: string, agent: string, url?: string): Promise<string> => {
			let currentThreadId = activeThreadId;
			if (!currentThreadId) {
				currentThreadId = createNewThread();
			}

			// Generate unique IDs to avoid collisions
			const timestamp = Date.now();
			const userMessage: Message = {
				id: `msg-${timestamp}-${Math.random().toString(36).substr(2, 9)}-user`,
				sender: "user",
				content,
				timestamp: new Date(),
				agent,
				url,
			};

			// Add user message immediately
			addMessage(currentThreadId, userMessage);

			setIsLoading(true);

			try {
				// Make API call to your FindexAI backend
				const response = await fetch("/api/chat", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						message: content,
						agent,
						url,
						settings: {
							provider: settings.provider,
							model: settings.model,
							apiKey:
								settings.apiKeys[
									settings.provider as keyof typeof settings.apiKeys
								],
						},
					}),
				});

				if (!response.ok) {
					throw new Error("Failed to get AI response");
				}

				const data = await response.json();

				const aiMessage: Message = {
					id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-ai`,
					sender: "ai",
					content:
						data.response ||
						`I understand you're asking about "${content}". This would normally be processed by the ${agent} agent${
							url ? ` using ${url}` : ""
						} and return a comprehensive response based on the ${
							settings.provider
						} ${settings.model} model.`,
					timestamp: new Date(),
					agent,
					url,
				};

				addMessage(currentThreadId, aiMessage);
				return aiMessage.content;
			} catch {
				// Fallback for demo purposes
				const aiResponse = `I understand you're asking about "${content}". This would normally be processed by the ${agent} agent${
					url ? ` using ${url}` : ""
				} and return a comprehensive response based on the ${
					settings.provider
				} ${settings.model} model.`;

				const aiMessage: Message = {
					id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-ai`,
					sender: "ai",
					content: aiResponse,
					timestamp: new Date(),
					agent,
					url,
				};

				addMessage(currentThreadId, aiMessage);

				toast({
					title: "Demo Mode",
					description:
						"This is a demo response. Connect your API keys in settings for real AI responses.",
					variant: "default",
				});

				return aiResponse;
			} finally {
				setIsLoading(false);
			}
		},
		[activeThreadId, createNewThread, addMessage, settings, toast]
	);

	const handleNewChat = useCallback(() => {
		createNewThread();
		if (isMobile) {
			setSidebarOpen(false);
		}
	}, [createNewThread, isMobile]);

	const handleSelectThread = useCallback(
		(threadId: string) => {
			setActiveThreadId(threadId);
			if (isMobile) {
				setSidebarOpen(false);
			}
		},
		[setActiveThreadId, isMobile]
	);

	const toggleSidebar = useCallback(() => {
		setSidebarOpen((prev) => !prev);
	}, []);

	// Memoized transformed threads for performance
	const transformedThreads = useMemo(
		() =>
			threads.map((thread) => ({
				id: thread.id,
				title: thread.title,
				lastMessage: thread.lastMessage,
				timestamp: thread.timestamp,
				messageCount: thread.messageCount,
			})),
		[threads]
	);

	return (
		<TooltipProvider>
			<div
				className={`min-h-screen relative overflow-hidden text-white ${
					isMobile ? "mobile-optimized" : ""
				}`}
				style={{
					background: isMobile
						? "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
						: "radial-gradient(ellipse 80% 60% at 60% 20%, var(--accent-ocean) 0%, transparent 60%)," +
						  "radial-gradient(ellipse 60% 40% at 20% 80%, var(--accent-teal) 0%, transparent 70%)," +
						  "linear-gradient(120deg, #0a0a0a 60%, #10151a 100%)",
					...(isMobile && {
						WebkitOverflowScrolling: "touch",
						overscrollBehavior: "none",
					}),
				}}
			>
				{/* Mobile-optimized overlay */}
				<div
					className="absolute inset-0"
					style={{
						background: isMobile ? "rgba(10,10,20,0.7)" : "rgba(10,10,20,0.85)",
					}}
				></div>

				{/* Simplified background pattern for mobile */}
				{!isMobile && (
					<div
						className="absolute inset-0 opacity-20"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						}}
					></div>
				)}

				{/* Mobile Sidebar Overlay */}
				{isMobile && sidebarOpen && (
					<div
						className="fixed top-16 left-0 right-0 bottom-0 bg-black/50 z-40 backdrop-blur-sm"
						onClick={() => setSidebarOpen(false)}
					/>
				)}

				{/* Mobile Sidebar */}
				{isMobile && (
					<div
						data-sidebar
						className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-80 z-50 transform transition-transform duration-300 ease-in-out ${
							sidebarOpen ? "translate-x-0" : "-translate-x-full"
						}`}
						style={{
							background: "rgba(15, 23, 35, 0.95)",
							backdropFilter: "blur(20px)",
							WebkitBackdropFilter: "blur(20px)",
							borderRight: "1px solid rgba(255,255,255,0.1)",
						}}
					>
						<div className="h-full overflow-hidden">
							<SidebarContent
								threads={transformedThreads}
								activeThreadId={activeThreadId}
								onSelectThread={handleSelectThread}
								onNewChat={handleNewChat}
								onDeleteThread={deleteThread}
							/>
						</div>
					</div>
				)}

				{/* Chat Container */}
				<div
					className={`relative z-10 flex flex-col ${
						isMobile
							? "mobile-chat-container h-[calc(100vh-64px)] mt-16"
							: "pt-20 px-4 max-w-7xl mx-auto h-screen"
					}`}
				>
					{isMobile ? (
						// Mobile Layout
						<div className="h-full flex flex-col">
							{/* Mobile Header */}
							<header
								className={`mobile-header flex-shrink-0 transition-transform duration-300 ease-in-out ${
									headerVisible ? "translate-y-0" : "-translate-y-full"
								} ${
									headerVisible ? "relative" : "absolute top-0 left-0 right-0"
								} z-20`}
								style={{
									background: "rgba(15, 23, 35, 0.95)",
									backdropFilter: "blur(20px)",
									WebkitBackdropFilter: "blur(20px)",
									borderBottom: "1px solid rgba(255,255,255,0.1)",
								}}
							>
								<div className="px-4 py-3 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<button
											data-sidebar-toggle
											onClick={toggleSidebar}
											className="p-2 rounded-lg hover:bg-white/10 transition-colors touch-manipulation"
											style={{ WebkitTapHighlightColor: "transparent" }}
										>
											<Menu className="w-5 h-5 text-white" />
										</button>
										<div className="flex items-center gap-2">
											<div
												className="w-8 h-8 rounded-lg flex items-center justify-center"
												style={{ background: "var(--accent-gradient)" }}
											>
												<Search className="w-4 h-4 text-white" />
											</div>
											<div>
												<h1
													className="text-lg font-bold truncate max-w-[150px]"
													style={{
														background: "var(--accent-gradient)",
														WebkitBackgroundClip: "text",
														backgroundClip: "text",
														color: "transparent",
														WebkitTextFillColor: "transparent",
													}}
												>
													{activeThread?.title || "FindexAI"}
												</h1>
											</div>
										</div>
									</div>

									<div className="flex items-center gap-2">
										<SettingsModal
											settings={settings}
											onSettingsChange={setSettings}
										/>
										<ThemeToggle />
									</div>
								</div>
							</header>

							{/* Mobile Chat Interface */}
							<div className="flex-1 overflow-hidden">
								<ChatInterface
									onSendMessage={handleSendMessage}
									currentAgent={settings.agent}
									currentUrl={settings.url}
									messages={messages}
									isLoading={isLoading}
									onAgentChange={(agent) =>
										setSettings((prev) => ({ ...prev, agent }))
									}
									onUrlChange={(url) =>
										setSettings((prev) => ({ ...prev, url }))
									}
								/>
							</div>
						</div>
					) : (
						// Desktop Layout (unchanged)
						<div className="h-full flex gap-6">
							{/* Desktop Sidebar */}
							<div className="w-80 flex-shrink-0">
								<div
									className="h-full rounded-xl border shadow-2xl overflow-hidden"
									style={{
										background: "rgba(20, 30, 40, 0.35)",
										border: "1px solid rgba(255,255,255,0.18)",
										borderRadius: "1rem",
										backdropFilter: "blur(16px)",
										WebkitBackdropFilter: "blur(16px)",
										boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
									}}
								>
									<ChatSidebar
										threads={transformedThreads}
										activeThreadId={activeThreadId}
										onSelectThread={handleSelectThread}
										onNewChat={handleNewChat}
										onDeleteThread={deleteThread}
									/>
								</div>
							</div>

							{/* Desktop Main Chat Area */}
							<div className="flex-1 flex flex-col">
								<div
									className="h-full rounded-xl border shadow-2xl overflow-hidden flex flex-col"
									style={{
										background: "rgba(20, 30, 40, 0.35)",
										border: "1px solid rgba(255,255,255,0.18)",
										borderRadius: "1rem",
										backdropFilter: "blur(16px)",
										WebkitBackdropFilter: "blur(16px)",
										boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
									}}
								>
									{/* Desktop Header */}
									<header className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-transparent via-white/5 to-transparent">
										<div className="flex items-center gap-3">
											<div className="flex items-center gap-2">
												<div
													className="w-10 h-10 rounded-xl flex items-center justify-center"
													style={{ background: "var(--accent-gradient)" }}
												>
													<Search className="w-5 h-5 text-white" />
												</div>
												<div>
													<h1
														className="text-xl font-bold"
														style={{
															background: "var(--accent-gradient)",
															WebkitBackgroundClip: "text",
															backgroundClip: "text",
															color: "transparent",
															WebkitTextFillColor: "transparent",
														}}
													>
														{activeThread?.title || "FindexAI Chat"}
													</h1>
													<p className="text-sm text-white/60">
														AI-powered conversation assistant
													</p>
												</div>
											</div>
										</div>

										<div className="flex items-center gap-3">
											<SettingsModal
												settings={settings}
												onSettingsChange={setSettings}
											/>
											<ThemeToggle />
										</div>
									</header>

									{/* Desktop Chat Interface */}
									<div className="flex-1 overflow-hidden">
										<ChatInterface
											onSendMessage={handleSendMessage}
											currentAgent={settings.agent}
											currentUrl={settings.url}
											messages={messages}
											isLoading={isLoading}
											onAgentChange={(agent) =>
												setSettings((prev) => ({ ...prev, agent }))
											}
											onUrlChange={(url) =>
												setSettings((prev) => ({ ...prev, url }))
											}
										/>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				<Toaster />
				<Sonner />
			</div>
		</TooltipProvider>
	);
});

export default function ChatPage() {
	return <ChatApp />;
}
