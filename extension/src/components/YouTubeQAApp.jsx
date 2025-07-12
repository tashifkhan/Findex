import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChatSidebar from "./ChatSidebar";
import FloatingChatButton from "./FloatingChatButton";

const SidebarController = ({ videoData, isOnYouTube }) => {
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const toggleChat = () => {
		setIsChatOpen(!isChatOpen);
	};

	const handleAskQuestion = async (question) => {
		// Placeholder logic for asking question
		setMessages((prev) => [...prev, { type: "user", content: question }]);
		setIsLoading(true);
		setTimeout(() => {
			setMessages((prev) => [...prev, { type: "ai", content: "Sample answer!" }]);
			setIsLoading(false);
		}, 1000);
	};

	return (
		<>
			{/* Sidebar Chat */}
			<AnimatePresence>
				{isChatOpen && (
					<ChatSidebar
						messages={messages}
						onAskQuestion={handleAskQuestion}
						isLoading={isLoading}
						videoData={videoData}
						isOnYouTube={isOnYouTube}
						onClose={() => setIsChatOpen(false)}
						onSearchMode={() => {
							// Optional: logic to switch to search
							setIsChatOpen(false);
						}}
					/>
				)}
			</AnimatePresence>

			{/* Floating Chat Button */}
			{!isChatOpen && (
				<FloatingChatButton
					onClick={toggleChat}
					hasVideoData={!!videoData}
					isDevelopment={false}
				/>
			)}
		</>
	);
};

export default SidebarController;
