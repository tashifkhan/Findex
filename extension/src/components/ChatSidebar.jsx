import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
	X,
	Send,
	Search,
	Video,
	Clock,
	Eye,
	ThumbsUp,
	User,
	Palette,
	ChevronDown,
	AppWindow,
} from "lucide-react";

const THEMES = {
	default: { name: "Default", colors: "bg-white text-gray-900" },
	xp: { name: "Windows XP", colors: "bg-gradient-to-b from-blue-100 to-blue-200 text-gray-900" },
	macos: { name: "macOS Classic", colors: "bg-gray-100 text-gray-900" },
	neobrutal: { name: "Neobrutal", colors: "bg-yellow-300 text-black" },
	nintendo: { name: "Nintendo", colors: "bg-red-500 text-white" },
	orange: { name: "Orange Bright", colors: "bg-orange-500 text-white" },
	orangeDark: { name: "Orange Dark", colors: "bg-orange-900 text-orange-100" },
	blueLight: { name: "Cute Blue Light", colors: "bg-blue-100 text-blue-900" },
	blueDark: { name: "Cute Blue Dark", colors: "bg-blue-900 text-blue-100" },
};

const ChatSidebar = ({
	messages,
	onAskQuestion,
	isLoading,
	videoData,
	isOnYouTube,
	onClose,
	onSearchMode,
}) => {
	const [inputValue, setInputValue] = useState("");
	const [isMinimized, setIsMinimized] = useState(false);
	const [currentTheme, setCurrentTheme] = useState('default');
	const [showThemeDropdown, setShowThemeDropdown] = useState(false);
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);
	const themeDropdownRef = useRef(null);

	// Check if we're in development mode
	const isDevelopment =
		window.location.hostname === "localhost" ||
		window.location.hostname === "127.0.0.1" ||
		window.location.href.includes("youtube.com/watch") ||
		window.location.href.includes("youtube.com/live");
	const canInteract = isOnYouTube || isDevelopment;

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(scrollToBottom, [messages]);

	useEffect(() => {
		if (!isMinimized && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isMinimized]);

	// Close theme dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
				setShowThemeDropdown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Don't apply theme to document body to avoid interfering with main page

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValue.trim() && !isLoading) {
			onAskQuestion(inputValue.trim());
			setInputValue("");
		}
	};

	const formatDuration = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const formatViews = (count) => {
		if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
		if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
		return count?.toLocaleString() || "0";
	};

	const getThemeClasses = (theme) => {
		const baseClasses = "fixed right-0 top-0 h-full z-40 flex flex-col transition-all duration-300";

		switch (theme) {
			case 'xp':
				return `${baseClasses} bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black text-black shadow-2xl`;
			case 'macos':
				// Classic Mac: light gray, square corners, 3D beveled border, VT323 font
				return `${baseClasses} bg-[#c3c3c3] border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] text-black font-['VT323',monospace] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]`;
			case 'neobrutal':
				return `${baseClasses} bg-yellow-300 border-4 border-black text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`;
			case 'nintendo':
				return `${baseClasses} bg-red-500 border-red-700 text-white pixel-font`;
			case 'orange':
				return `${baseClasses} bg-orange-500 border-orange-600 text-white`;
			case 'orangeDark':
				return `${baseClasses} bg-orange-900 border-orange-800 text-orange-100`;
			case 'blueLight':
				return `${baseClasses} bg-blue-100 border-blue-200 text-blue-900`;
			case 'blueDark':
				return `${baseClasses} bg-blue-900 border-blue-800 text-blue-100`;
			default:
				return `${baseClasses} bg-white border-gray-200 text-gray-900 shadow-2xl`;
		}
	};

	// Remove the getThemeBodyClass function since we're not using it anymore

	const getHeaderClasses = (theme) => {
		switch (theme) {
			case 'xp':
				return 'flex items-center justify-between p-1 border-b-2 border-black bg-blue-800 text-white';
			case 'macos':
				// Classic Mac: gray bar, square, subtle border, VT323 font
				return "flex items-center justify-between px-3 py-1 border-b-2 border-b-[#6e6e6e] bg-[#e0e0e0] text-black font-['VT323',monospace] shadow-none";
			case 'neobrutal':
				return 'flex items-center justify-between p-4 border-b-4 border-black bg-yellow-400';
			case 'nintendo':
				return 'flex items-center justify-between p-4 border-b border-red-700 bg-red-600 pixel-font';
			case 'orange':
				return 'flex items-center justify-between p-4 border-b border-orange-600 bg-orange-600';
			case 'orangeDark':
				return 'flex items-center justify-between p-4 border-b border-orange-800 bg-orange-800';
			case 'blueLight':
				return 'flex items-center justify-between p-4 border-b border-blue-200 bg-blue-200';
			case 'blueDark':
				return 'flex items-center justify-between p-4 border-b border-blue-800 bg-blue-800';
			default:
				return 'flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50';
		}
	};

	const getButtonClasses = (theme, variant = 'default') => {
		const baseClasses = 'p-2 rounded-lg transition-all duration-150';

		switch (theme) {
			case 'xp':
				return `p-1 rounded-none bg-black border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black hover:bg-gray-400 active:border-t-black active:border-l-black active:border-r-gray-100 active:border-b-gray-100`;
			case 'macos':
				return "px-2 py-1 rounded-none border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] bg-[#e0e0e0] text-black font-['VT323',monospace] shadow-none hover:bg-[#d0d0d0] active:border-t-[#6e6e6e] active:border-l-[#6e6e6e] active:border-b-white active:border-r-white";
			case 'neobrutal':
				return `${baseClasses} hover:bg-yellow-200 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]`;
			case 'nintendo':
				return `${baseClasses} hover:bg-red-400 border border-red-300 pixel-font text-xs`;
			case 'orange':
				return `${baseClasses} hover:bg-orange-400 border border-orange-300`;
			case 'orangeDark':
				return `${baseClasses} hover:bg-orange-800 border border-orange-700`;
			case 'blueLight':
				return `${baseClasses} hover:bg-blue-200 border border-blue-300`;
			case 'blueDark':
				return `${baseClasses} hover:bg-blue-800 border border-blue-700`;
			default:
				return `${baseClasses} hover:bg-blue-100`;
		}
	};

	const getChatBubbleClasses = (theme, isUser = false) => {
		const baseClasses = 'max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm';

		if (isUser) {
			switch (theme) {
				case 'xp':
					return `${baseClasses} bg-white text-black border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black`;
				case 'macos':
					return "max-w-xs lg:max-w-md px-4 py-2 rounded-none bg-white text-black border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] font-['VT323',monospace] shadow-none";
				case 'neobrutal':
					return `${baseClasses} bg-black text-yellow-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`;
				case 'nintendo':
					return `${baseClasses} bg-white text-red-600 border border-red-300`;
				case 'orange':
					return `${baseClasses} bg-white text-orange-600 border border-orange-300`;
				case 'orangeDark':
					return `${baseClasses} bg-orange-600 text-white border border-orange-500`;
				case 'blueLight':
					return `${baseClasses} bg-blue-500 text-white border border-blue-600`;
				case 'blueDark':
					return `${baseClasses} bg-blue-600 text-white border border-blue-500`;
				default:
					return `${baseClasses} bg-blue-500 text-white`;
			}
		} else {
			switch (theme) {
				case 'xp':
					return `${baseClasses} bg-white text-black border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black`;
				case 'macos':
					// Classic Mac: white, square, 3D border, Segoe UI font
					return "max-w-xs lg:max-w-md px-4 py-2 rounded-none bg-white text-black border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] font-['Segoe_UI',system-ui,sans-serif] shadow-none";
				case 'neobrutal':
					return `${baseClasses} bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`;
				case 'nintendo':
					return `${baseClasses} bg-red-100 text-red-900 border border-red-200`;
				case 'orange':
					return `${baseClasses} bg-orange-100 text-orange-900 border border-orange-200`;
				case 'orangeDark':
					return `${baseClasses} bg-orange-800 text-orange-100 border border-orange-700`;
				case 'blueLight':
					return `${baseClasses} bg-white text-blue-900 border border-blue-200`;
				case 'blueDark':
					return `${baseClasses} bg-blue-800 text-blue-100 border border-blue-700`;
				default:
					return `${baseClasses} bg-gray-100 text-gray-900`;
			}
		}
	};

	return (
		<motion.div
			className={`${getThemeClasses(currentTheme)} ${isMinimized ? "w-16" : "w-96"
				}`}
			initial={{ x: "100%" }}
			animate={{ x: 0 }}
			exit={{ x: "100%" }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
			style={{
				fontFamily: currentTheme === 'nintendo' ? 'monospace' : currentTheme === 'xp' ? 'Tahoma, "MS Sans Serif", sans-serif' : 'inherit',
				imageRendering: currentTheme === 'nintendo' ? 'pixelated' : 'auto',
			}}
		>
			{/* Header */}
			<div className={getHeaderClasses(currentTheme)}>
				{!isMinimized && (
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
							<Video size={16} className="text-white" />
						</div>
						<div>
							<h3 className="font-semibold">YouTube Q&A</h3>
							<p className="text-xs opacity-75">
								{isOnYouTube
									? "Ready to help"
									: isDevelopment
										? "Demo mode"
										: "Navigate to YouTube"}
							</p>
						</div>
					</div>
				)}

				<div className="flex items-center space-x-1">
					{!isMinimized && (
						<>
							{/* Theme Dropdown */}
							<div className="relative" ref={themeDropdownRef}>
								<button
									onClick={() => setShowThemeDropdown(!showThemeDropdown)}
									className={getButtonClasses(currentTheme)}
									title="Change theme"
								>
									<Palette size={16} />
								</button>

								{showThemeDropdown && (
									<motion.div
										className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border z-50 ${currentTheme === 'neobrutal'
											? 'bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
											: currentTheme === 'nintendo'
												? 'bg-red-100 border-red-300'
												: currentTheme === 'orange'
													? 'bg-orange-100 border-orange-300'
													: currentTheme === 'orangeDark'
														? 'bg-orange-800 border-orange-700'
														: currentTheme === 'blueLight'
															? 'bg-blue-50 border-blue-200'
															: currentTheme === 'blueDark'
																? 'bg-blue-800 border-blue-700'
																: 'bg-white border-gray-200'
											}`}
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
									>
										<div className="p-2">
											{Object.entries(THEMES).map(([key, theme]) => (
												<button
													key={key}
													onClick={() => {
														setCurrentTheme(key);
														setShowThemeDropdown(false);
													}}
													className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${currentTheme === key
														? 'bg-blue-500 text-white'
														: currentTheme === 'neobrutal'
															? 'hover:bg-yellow-200 text-black'
															: currentTheme === 'nintendo'
																? 'hover:bg-red-200 text-red-900'
																: currentTheme === 'orange'
																	? 'hover:bg-orange-200 text-orange-900'
																	: currentTheme === 'orangeDark'
																		? 'hover:bg-orange-700 text-orange-100'
																		: currentTheme === 'blueLight'
																			? 'hover:bg-blue-100 text-blue-900'
																			: currentTheme === 'blueDark'
																				? 'hover:bg-blue-700 text-blue-100'
																				: 'hover:bg-gray-100 text-gray-900'
														}`}
												>
													{theme.name}
												</button>
											))}
										</div>
									</motion.div>
								)}
							</div>

							{/* <button
								onClick={() => setCurrentTheme('xp')}
								className={getButtonClasses(currentTheme)}
								title="Windows XP Theme"
							>
								<AppWindow size={16} />
							</button> */}
							<button
								onClick={onSearchMode}
								className={getButtonClasses(currentTheme)}
								title="Search in transcript (Ctrl+F)"
							>
								<Search size={16} />
							</button>
						</>
					)}

					<button
						onClick={() => setIsMinimized(!isMinimized)}
						className={getButtonClasses(currentTheme)}
					>
						<div
							className={`w-4 h-4 border-2 rounded transition-transform ${isMinimized ? "rotate-45" : ""
								} ${currentTheme === 'neobrutal' ? 'border-black' : 'border-current'}`}
						/>
					</button>

					<button
						onClick={onClose}
						className={getButtonClasses(currentTheme)}
					>
						<X size={16} />
					</button>
				</div>
			</div>

			{!isMinimized && (
				<>
					{/* Video Info */}
					{videoData && (
						<motion.div
							className={`p-4 border-b ${currentTheme === 'xp'
								? 'bg-blue-50 border-blue-300'
								: currentTheme === 'macos'
									? 'bg-gray-50 border-gray-300'
									: currentTheme === 'neobrutal'
										? 'bg-yellow-200 border-b-4 border-black'
										: currentTheme === 'nintendo'
											? 'bg-red-100 border-red-300'
											: currentTheme === 'orange'
												? 'bg-orange-100 border-orange-300'
												: currentTheme === 'orangeDark'
													? 'bg-orange-800 border-orange-700'
													: currentTheme === 'blueLight'
														? 'bg-blue-50 border-blue-200'
														: currentTheme === 'blueDark'
															? 'bg-blue-800 border-blue-700'
															: 'bg-gray-50 border-gray-200'
								}`}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
						>
							<h4 className="font-medium text-sm mb-2 line-clamp-2">
								{videoData.title}
							</h4>
							<div className="flex items-center space-x-4 text-xs opacity-75">
								<div className="flex items-center space-x-1">
									<User size={12} />
									<span>{videoData.uploader}</span>
								</div>
								{videoData.duration > 0 && (
									<div className="flex items-center space-x-1">
										<Clock size={12} />
										<span>{formatDuration(videoData.duration)}</span>
									</div>
								)}
								{videoData.view_count > 0 && (
									<div className="flex items-center space-x-1">
										<Eye size={12} />
										<span>{formatViews(videoData.view_count)}</span>
									</div>
								)}
							</div>
							{videoData.transcript && (
								<div className={`mt-2 text-xs px-2 py-1 rounded ${currentTheme === 'neobrutal'
									? 'text-black bg-green-300 border border-black'
									: 'text-green-600 bg-green-50'
									}`}>
									✓ Transcript available ({videoData.transcript.length} chars)
								</div>
							)}
						</motion.div>
					)}

					{/* Messages */}
					<div className="flex-1 overflow-y-auto p-4 space-y-4">
						{messages.length === 0 && (
							<div className="text-center mt-8 opacity-75">
								<Video size={48} className="mx-auto mb-4 opacity-50" />
								<h3 className="font-medium mb-2">
									{isDevelopment && !isOnYouTube
										? "Demo Mode"
										: "Ask about this video"}
								</h3>
								<p className="text-sm">
									{isDevelopment && !isOnYouTube
										? "This is a demo of the YouTube Q&A assistant. Try asking questions to see how it works!"
										: "I can help you understand the content, find specific topics, or answer questions about what's discussed."}
								</p>
								<div className={`mt-4 space-y-2 text-xs text-left p-3 rounded-lg ${currentTheme === 'neobrutal'
									? 'bg-yellow-200 border-2 border-black'
									: currentTheme === 'nintendo'
										? 'bg-red-300 text-black font-bold font-sans'
										: currentTheme === 'orange'
											? 'bg-black font-bold'
											: currentTheme === 'orangeDark'
												? 'bg-gray-800 text-orange-100 font-bold'
												: currentTheme === 'blueLight'
													? 'bg-blue-50'
													: currentTheme === 'blueDark'
														? 'bg-blue-800'
														: 'bg-blue-50'
									}`}>
									<p className="font-medium">Try asking:</p>
									<ul className="space-y-1">
										{isDevelopment && !isOnYouTube ? (
											<>
												<li>• "How does this extension work?"</li>
												<li>• "What features are available?"</li>
												<li>• "Tell me about the search functionality"</li>
											</>
										) : (
											<>
												<li>• "What is this video about?"</li>
												<li>• "Summarize the main points"</li>
												<li>• "What does the speaker say about..."</li>
											</>
										)}
									</ul>
								</div>
							</div>
						)}

						{messages.map((message, index) => (
							<motion.div
								key={index}
								className={`flex ${message.type === "user" ? "justify-end" : "justify-start"
									}`}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<div className={getChatBubbleClasses(currentTheme, message.type === "user")}>
									<p className="whitespace-pre-wrap">{message.content}</p>
								</div>
							</motion.div>
						))}

						{isLoading && (
							<motion.div
								className="flex justify-start"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
							>
								<div className={getChatBubbleClasses(currentTheme, false)}>
									<div className="flex items-center space-x-2">
										<div className="flex space-x-1">
											<div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-50" />
											<div
												className="w-2 h-2 bg-current rounded-full animate-bounce opacity-50"
												style={{ animationDelay: "0.1s" }}
											/>
											<div
												className="w-2 h-2 bg-current rounded-full animate-bounce opacity-50"
												style={{ animationDelay: "0.2s" }}
											/>
										</div>
										<span className="opacity-75 text-xs">Thinking...</span>
									</div>
								</div>
							</motion.div>
						)}
						<div ref={messagesEndRef} />
					</div>

					{/* Input */}
					<div className={`p-4 border-t ${currentTheme === 'xp'
						? 'border-blue-300 bg-blue-50'
						: currentTheme === 'macos'
							? 'border-gray-300 bg-gray-50'
							: currentTheme === 'neobrutal'
								? 'border-t-4 border-black bg-yellow-200'
								: currentTheme === 'nintendo'
									? 'border-red-300 bg-red-100'
									: currentTheme === 'orange'
										? 'border-orange-300 bg-orange-100'
										: currentTheme === 'orangeDark'
											? 'border-orange-700 bg-orange-800'
											: currentTheme === 'blueLight'
												? 'border-blue-200 bg-blue-50'
												: currentTheme === 'blueDark'
													? 'border-blue-700 bg-blue-800'
													: 'border-gray-200 bg-white'
						}`}>
						<form onSubmit={handleSubmit} className="flex space-x-2">
							<input
								ref={inputRef}
								type="text"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								placeholder={
									canInteract
										? isDevelopment && !isOnYouTube
											? "Ask about the extension..."
											: "Ask about this video..."
										: "Navigate to a YouTube video first"
								}
								disabled={!canInteract || isLoading}
								className={`flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed text-sm ${currentTheme === 'xp'
									? 'bg-white border-2 border-t-black border-l-black border-r-white border-b-white text-black placeholder-gray-500 rounded-none'
									: currentTheme === 'neobrutal'
										? 'bg-white border-2 border-black text-black placeholder-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
										: currentTheme === 'nintendo'
											? 'bg-white border border-red-300 text-red-900 placeholder-red-500'
											: currentTheme === 'orange'
												? 'bg-white border border-orange-300 text-orange-900 placeholder-orange-500'
												: currentTheme === 'orangeDark'
													? 'bg-orange-700 border border-orange-600 text-orange-100 placeholder-orange-300'
													: currentTheme === 'blueLight'
														? 'bg-white border border-blue-300 text-blue-900 placeholder-blue-500'
														: currentTheme === 'blueDark'
															? 'bg-blue-700 border border-blue-600 text-blue-100 placeholder-blue-300'
															: 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 disabled:bg-gray-100'
									}`}
							/>
							<button
								type="submit"
								disabled={!inputValue.trim() || !canInteract || isLoading}
								className={`px-1 py-2  rounded-lg disabled:cursor-not-allowed flex items-center space-x-2 ${currentTheme === 'xp'
									? 'p-1 rounded-none bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black hover:bg-gray-400 active:border-t-black active:border-l-black active:border-r-gray-100 active:border-b-gray-100 disabled:opacity-50'
									: currentTheme === 'neobrutal'
										? 'bg-black text-yellow-300 hover:bg-gray-800 disabled:bg-gray-400 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150'
										: currentTheme === 'nintendo'
											? 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 border border-red-700 pixel-font text-xs transition-all duration-150'
											: currentTheme === 'orange'
												? 'bg-orange-600 text-white hover:bg-orange-700 disabled:bg-orange-300 border border-orange-700 transition-all duration-150'
												: currentTheme === 'orangeDark'
													? 'bg-orange-600 text-white hover:bg-orange-500 disabled:bg-orange-800 border border-orange-500 transition-all duration-150'
													: currentTheme === 'blueLight'
														? 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 border border-blue-600 transition-all duration-150'
														: currentTheme === 'blueDark'
															? 'bg-blue-600 text-white hover:bg-blue-500 disabled:bg-blue-800 border border-blue-500 transition-all duration-150'
															: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 transition-all duration-150'
									}`}
							>
								<Send size={16} />
							</button>
						</form>
					</div>
				</>
			)}
		</motion.div>
	);
};

export default ChatSidebar;
