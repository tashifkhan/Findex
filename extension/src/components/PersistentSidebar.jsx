import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
	Link,
	ChevronLeft,
	ChevronRight,
	Copy,
} from "lucide-react";

const THEMES = {
	default: { name: "Default", colors: "bg-white text-gray-900" },
	xp: {
		name: "Windows XP",
		colors: "bg-gradient-to-b from-blue-100 to-blue-200 text-gray-900",
	},
	macos: { name: "macOS Classic", colors: "bg-gray-100 text-gray-900" },
	neobrutal: { name: "Neobrutal", colors: "bg-yellow-300 text-black" },
	nintendo: { name: "Nintendo", colors: "bg-red-500 text-white" },
	orange: { name: "Orange Bright", colors: "bg-orange-500 text-white" },
	orangeDark: { name: "Orange Dark", colors: "bg-orange-900 text-orange-100" },
	blueLight: { name: "Cute Blue Light", colors: "bg-blue-100 text-blue-900" },
	blueDark: { name: "Cute Blue Dark", colors: "bg-blue-900 text-blue-100" },
};

const PersistentSidebar = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [currentTheme, setCurrentTheme] = useState("default");
	const [showThemeDropdown, setShowThemeDropdown] = useState(false);
	const [currentUrl, setCurrentUrl] = useState("");
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const themeDropdownRef = useRef(null);
	const inputRef = useRef(null);

	// Update URL when page changes
	useEffect(() => {
		setCurrentUrl(window.location.href);

		// Listen for URL changes (for SPAs)
		const handleUrlChange = () => {
			setCurrentUrl(window.location.href);
		};

		// Use MutationObserver to detect URL changes in SPAs
		const observer = new MutationObserver(() => {
			if (window.location.href !== currentUrl) {
				setCurrentUrl(window.location.href);
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		return () => observer.disconnect();
	}, [currentUrl]);

	// Close theme dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				themeDropdownRef.current &&
				!themeDropdownRef.current.contains(event.target)
			) {
				setShowThemeDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValue.trim() && !isLoading) {
			setMessages((prev) => [
				...prev,
				{ type: "user", content: inputValue.trim() },
			]);
			setInputValue("");
			setIsLoading(true);

			// Simulate AI response for demo
			setTimeout(() => {
				setMessages((prev) => [
					...prev,
					{
						type: "ai",
						content: `This is a demo response to: "${inputValue.trim()}". In a real implementation, this would connect to your AI backend.`,
					},
				]);
				setIsLoading(false);
			}, 1000);
		}
	};

	const copyUrl = async () => {
		try {
			await navigator.clipboard.writeText(currentUrl);
			// You could add a toast notification here
		} catch (err) {
			console.error("Failed to copy URL:", err);
		}
	};

	const getThemeClasses = (theme) => {
		const baseClasses =
			"fixed right-0 top-0 h-full z-[2147483647] flex flex-col transition-all duration-300";

		switch (theme) {
			case "xp":
				return `${baseClasses} bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black text-black shadow-2xl`;
			case "macos":
				return `${baseClasses} bg-[#c3c3c3] border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] text-black font-['VT323',monospace] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]`;
			case "neobrutal":
				return `${baseClasses} bg-yellow-300 border-4 border-black text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`;
			case "nintendo":
				return `${baseClasses} bg-red-500 border-red-700 text-white pixel-font`;
			case "orange":
				return `${baseClasses} bg-orange-500 border-orange-600 text-white`;
			case "orangeDark":
				return `${baseClasses} bg-orange-900 border-orange-800 text-orange-100`;
			case "blueLight":
				return `${baseClasses} bg-blue-100 border-blue-200 text-blue-900`;
			case "blueDark":
				return `${baseClasses} bg-blue-900 border-blue-800 text-blue-100`;
			default:
				return `${baseClasses} bg-white border-gray-200 text-gray-900 shadow-2xl`;
		}
	};

	const getHeaderClasses = (theme) => {
		switch (theme) {
			case "xp":
				return "flex items-center justify-between p-1 border-b-2 border-black bg-blue-800 text-white";
			case "macos":
				return "flex items-center justify-between px-3 py-1 border-b-2 border-b-[#6e6e6e] bg-[#e0e0e0] text-black font-['VT323',monospace] shadow-none";
			case "neobrutal":
				return "flex items-center justify-between p-4 border-b-4 border-black bg-yellow-400";
			case "nintendo":
				return "flex items-center justify-between p-4 border-b border-red-700 bg-red-600 pixel-font";
			case "orange":
				return "flex items-center justify-between p-4 border-b border-orange-600 bg-orange-600";
			case "orangeDark":
				return "flex items-center justify-between p-4 border-b border-orange-800 bg-orange-800";
			case "blueLight":
				return "flex items-center justify-between p-4 border-b border-blue-200 bg-blue-200";
			case "blueDark":
				return "flex items-center justify-between p-4 border-b border-blue-800 bg-blue-800";
			default:
				return "flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50";
		}
	};

	const getButtonClasses = (theme) => {
		const baseClasses = "p-2 rounded-lg transition-all duration-150";

		switch (theme) {
			case "xp":
				return `p-1 rounded-none bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black hover:bg-gray-400 active:border-t-black active:border-l-black active:border-r-gray-100 active:border-b-gray-100`;
			case "macos":
				return "px-2 py-1 rounded-none border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] bg-[#e0e0e0] text-black font-['VT323',monospace] shadow-none hover:bg-[#d0d0d0] active:border-t-[#6e6e6e] active:border-l-[#6e6e6e] active:border-b-white active:border-r-white";
			case "neobrutal":
				return `${baseClasses} hover:bg-yellow-200 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]`;
			case "nintendo":
				return `${baseClasses} hover:bg-red-400 border border-red-300 pixel-font text-xs`;
			case "orange":
				return `${baseClasses} hover:bg-orange-400 border border-orange-300`;
			case "orangeDark":
				return `${baseClasses} hover:bg-orange-800 border border-orange-700`;
			case "blueLight":
				return `${baseClasses} hover:bg-blue-200 border border-blue-300`;
			case "blueDark":
				return `${baseClasses} hover:bg-blue-800 border border-blue-700`;
			default:
				return `${baseClasses} hover:bg-blue-100`;
		}
	};

	const getChatBubbleClasses = (theme, isUser = false) => {
		const baseClasses = "max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm";

		if (isUser) {
			switch (theme) {
				case "xp":
					return `${baseClasses} bg-white text-black border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black`;
				case "macos":
					return "max-w-xs lg:max-w-md px-4 py-2 rounded-none bg-white text-black border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] font-['VT323',monospace] shadow-none";
				case "neobrutal":
					return `${baseClasses} bg-black text-yellow-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`;
				case "nintendo":
					return `${baseClasses} bg-white text-red-600 border border-red-300`;
				case "orange":
					return `${baseClasses} bg-white text-orange-600 border border-orange-300`;
				case "orangeDark":
					return `${baseClasses} bg-orange-600 text-white border border-orange-500`;
				case "blueLight":
					return `${baseClasses} bg-blue-500 text-white border border-blue-600`;
				case "blueDark":
					return `${baseClasses} bg-blue-600 text-white border border-blue-500`;
				default:
					return `${baseClasses} bg-blue-500 text-white`;
			}
		} else {
			switch (theme) {
				case "xp":
					return `${baseClasses} bg-white text-black border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black`;
				case "macos":
					return "max-w-xs lg:max-w-md px-4 py-2 rounded-none bg-white text-black border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] font-['VT323',monospace] shadow-none";
				case "neobrutal":
					return `${baseClasses} bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`;
				case "nintendo":
					return `${baseClasses} bg-red-100 text-red-900 border border-red-200`;
				case "orange":
					return `${baseClasses} bg-orange-100 text-orange-900 border border-orange-200`;
				case "orangeDark":
					return `${baseClasses} bg-orange-800 text-orange-100 border border-orange-700`;
				case "blueLight":
					return `${baseClasses} bg-white text-blue-900 border border-blue-200`;
				case "blueDark":
					return `${baseClasses} bg-blue-800 text-blue-100 border border-blue-700`;
				default:
					return `${baseClasses} bg-gray-100 text-gray-900`;
			}
		}
	};

	const getInputClasses = (theme) => {
		const baseClasses =
			"flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed text-sm";

		switch (theme) {
			case "xp":
				return `${baseClasses} bg-white border-2 border-t-black border-l-black border-r-white border-b-white text-black placeholder-gray-500 rounded-none`;
			case "neobrutal":
				return `${baseClasses} bg-white border-2 border-black text-black placeholder-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`;
			case "nintendo":
				return `${baseClasses} bg-white border border-red-300 text-red-900 placeholder-red-500`;
			case "orange":
				return `${baseClasses} bg-white border border-orange-300 text-orange-900 placeholder-orange-500`;
			case "orangeDark":
				return `${baseClasses} bg-orange-700 border border-orange-600 text-orange-100 placeholder-orange-300`;
			case "blueLight":
				return `${baseClasses} bg-white border border-blue-300 text-blue-900 placeholder-blue-500`;
			case "blueDark":
				return `${baseClasses} bg-blue-700 border border-blue-600 text-blue-100 placeholder-blue-300`;
			case "macos":
				return "flex-1 px-3 py-2 rounded-none border-2 border-t-[#6e6e6e] border-l-[#6e6e6e] border-r-white border-b-white text-black placeholder-gray-500 font-['VT323',monospace] shadow-none";
			default:
				return `${baseClasses} bg-white border border-gray-300 text-gray-900 placeholder-gray-500 disabled:bg-gray-100`;
		}
	};

	return (
		<>
			{/* Collapse/Expand Button */}
			<motion.button
				onClick={() => setIsCollapsed(!isCollapsed)}
				className={`fixed right-0 top-20 z-[2147483648] w-8 h-8 bg-blue-500 text-white border-2 border-blue-600 rounded-l-lg cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-blue-600 ${
					isCollapsed ? "right-0" : "right-[350px]"
				}`}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
			>
				{isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
			</motion.button>

			{/* Main Sidebar */}
			<AnimatePresence>
				{!isCollapsed && (
					<motion.div
						className={getThemeClasses(currentTheme)}
						style={{ width: "350px" }}
						initial={{ x: 350 }}
						animate={{ x: 0 }}
						exit={{ x: 350 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					>
						{/* Header */}
						<div className={getHeaderClasses(currentTheme)}>
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
									<AppWindow className="text-white text-xl" />
								</div>
								<div>
									<h3 className="font-semibold">Findex Sidebar</h3>
									<p className="text-xs opacity-75">Current Page</p>
								</div>
							</div>
							<div className="flex items-center space-x-1">
								{/* Theme Dropdown */}
								<div className="relative" ref={themeDropdownRef}>
									<button
										onClick={() => setShowThemeDropdown(!showThemeDropdown)}
										className={`${getButtonClasses(
											currentTheme
										)} flex items-center justify-center`}
										title="Change theme"
									>
										<Palette className="text-xl" />
									</button>
									<AnimatePresence>
										{showThemeDropdown && (
											<motion.div
												className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border z-50 bg-white"
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
											>
												<div className="p-2 space-y-1">
													{Object.entries(THEMES).map(([key, theme]) => (
														<button
															key={key}
															onClick={() => {
																setCurrentTheme(key);
																setShowThemeDropdown(false);
															}}
															className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
																currentTheme === key
																	? "bg-blue-500 text-white"
																	: "hover:bg-gray-100"
															}`}
														>
															{theme.name}
														</button>
													))}
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>

								{/* Close Button */}
								<button
									onClick={() => setIsCollapsed(true)}
									className={`${getButtonClasses(
										currentTheme
									)} flex items-center justify-center`}
									title="Collapse sidebar"
								>
									<X className="text-xl" />
								</button>
							</div>
						</div>

						{/* URL Display */}
						<div className="px-4 py-2 border-b border-gray-100 bg-blue-50 text-xs flex items-center space-x-2">
							<Link className="text-base opacity-60" />
							<div className="flex-1 min-w-0">
								<div className="truncate" title={currentUrl}>
									{currentUrl}
								</div>
							</div>
							<button
								onClick={copyUrl}
								className="p-1 rounded hover:bg-blue-200 transition-colors"
								title="Copy URL"
							>
								<Copy size={12} />
							</button>
						</div>

						{/* Messages */}
						<div className="flex-1 overflow-y-auto p-4 space-y-4">
							{messages.length === 0 ? (
								<div className="text-center mt-8 opacity-75">
									<AppWindow className="mx-auto mb-4 opacity-50" size={48} />
									<h3 className="font-medium mb-2">Findex Sidebar</h3>
									<p className="text-sm">
										This is a persistent sidebar that shows the current page URL
										and allows you to chat.
									</p>
									<div className="mt-4 space-y-2 text-xs text-left p-3 rounded-lg bg-blue-50">
										<p className="font-medium">Features:</p>
										<ul className="space-y-1">
											<li>• Shows current page URL</li>
											<li>• Collapsible sidebar</li>
											<li>• Multiple themes</li>
											<li>• Chat functionality</li>
										</ul>
									</div>
								</div>
							) : (
								<div className="space-y-4">
									{messages.map((message, index) => (
										<div
											key={index}
											className={`flex ${
												message.type === "user"
													? "justify-end"
													: "justify-start"
											}`}
										>
											<div
												className={getChatBubbleClasses(
													currentTheme,
													message.type === "user"
												)}
											>
												{message.content}
											</div>
										</div>
									))}
									{isLoading && (
										<div className="flex justify-start">
											<div
												className={getChatBubbleClasses(currentTheme, false)}
											>
												<div className="flex items-center space-x-2">
													<div className="flex space-x-1">
														<div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
														<div
															className="w-2 h-2 bg-current rounded-full animate-bounce"
															style={{ animationDelay: "0.1s" }}
														></div>
														<div
															className="w-2 h-2 bg-current rounded-full animate-bounce"
															style={{ animationDelay: "0.2s" }}
														></div>
													</div>
													<span className="opacity-75 text-xs">
														Thinking...
													</span>
												</div>
											</div>
										</div>
									)}
								</div>
							)}
						</div>

						{/* Input */}
						<div className="p-4 border-t border-gray-200 bg-white">
							<form onSubmit={handleSubmit} className="flex space-x-2">
								<input
									ref={inputRef}
									type="text"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									className={getInputClasses(currentTheme)}
									placeholder="Type a message..."
									disabled={isLoading}
								/>
								<button
									type="submit"
									disabled={!inputValue.trim() || isLoading}
									className={`${getButtonClasses(
										currentTheme
									)} flex items-center justify-center`}
								>
									<Send className="text-xl" />
								</button>
							</form>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default PersistentSidebar;
